const namepokemon = document.querySelector('.name');
const numberpokemon = document.querySelector('.number');
const imgpokemon = document.querySelector('.pokeimg');
const form = document.querySelector('.form');
const input = document.querySelector('.input');
const simb = document.querySelector('.simbolo');
const na = document.querySelector('.na');
const altura = document.querySelector('.altura')
const peso = document.querySelector('.peso');
const tipo = document.querySelector('.tipo')
const mov1= document.querySelector('.mov1');
const mov2= document.querySelector('.mov2');
const mov3= document.querySelector('.mov3');
const mov4= document.querySelector('.mov4');
const mov5= document.querySelector('.mov5');
const desc= document.querySelector('.desc');


const searchpokemon = async (pokemon) => {
    const APIloading = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
   if (APIloading.status === 200) {
    const data = await APIloading.json();
    return data;
    }
}

const renderpokemon = async (pokemon) => {
    namepokemon.innerHTML = 'Carregando...';
    numberpokemon.innerHTML = '';
    simb.innerHTML = '';
    const data = await searchpokemon(pokemon);
    if (data) {
    simb.innerHTML = '-';
    namepokemon.innerHTML = data.name;
    numberpokemon.innerHTML = data.id;
    tipo.innerHTML = data['types']['0']['type']['name'];
    peso.innerHTML = data.weight/10;
    altura.innerHTML = data.height/10;
    imgpokemon.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    mov1.innerHTML = data['moves']['0']['move']['name'];
    mov2.innerHTML = data['moves']['1']['move']['name'];
    mov3.innerHTML = data['moves']['2']['move']['name'];
    mov4.innerHTML = data['moves']['3']['move']['name'];
    mov5.innerHTML = data['moves']['4']['move']['name'];

   
    const trad = await fetch(data['moves']['0']['move']['url']);
    console.log(trad);
    const  data1 = await trad.json();
    const ling = await data1['effect_entries']['0']['language']['name'];
    if (ling == 'en'){
        desc.innerHTML = data1['effect_entries']['0']['effect']
    } else {
        desc.innerHTML = data1['effect_entries']['1']['effect']
    }
    input.value='';
    } else {
        na.innerHTML = 'Pokemon não existe';
        numberpokemon.innerHTML = '';
        simb.innerHTML = '';
        namepokemon.innerHTML=''
    }
}


form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderpokemon(input.value.toLowerCase());
    
})


renderpokemon('1');



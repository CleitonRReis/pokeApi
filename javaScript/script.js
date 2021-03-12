
const API_URL = id => `https://pokeapi.co/api/v2/pokemon/${id}`;

function getPokemon() {

    for (let i = 1; i <= 3; i++) {

        const pokemonItem = document.querySelector(' .container .models ').cloneNode( true );

        const URL_IMG = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i}.svg`;

        pokemonItem.querySelector(' .pokemon-img img ').src = URL_IMG;

        axios.get(API_URL(i))
            .catch(err => {
                console.error(err);
            })
            .then(res => {

                const data = res.data;

                const { id, name, types, abilities, } = data;

                const removeDiv = document.querySelector(' .container ');

                removeDiv.removeChild(removeDiv.childNodes[4]);

                pokemonItem.querySelector(' .number ').innerHTML = id;

                pokemonItem.querySelector(' .name ').innerHTML = name;

                pokemonItem.querySelector(' .type ').innerHTML = types.map(typeInfo => typeInfo.type.name).join(' | ');

                pokemonItem.querySelector(' .abilities ').innerHTML = abilities.map(abilityInfo => abilityInfo.ability.name).join(' | ');

                document.querySelector(' .container ').append(pokemonItem);

        });
    };
};

getPokemon();

function showPokemon() {

    const searchPokemon = document.querySelector(' .pokemonWindowArea ');

    searchPokemon.style.opacity = 0;
    searchPokemon.style.display = 'flex';

    setTimeout(() => {
        searchPokemon.style.opacity = 1;
    }, 200);

    modal();
    modalName();
};

let search = document.querySelector(' .fas ');

search.addEventListener('click', showPokemon);

function closePokemon() {

    const hidePokemon = document.querySelector(' .pokemonWindowArea ');

    hidePokemon.style.opacity = 0;

    setTimeout(() => {
        hidePokemon.style.display = 'none';
    }, 200);

};

let close = document.querySelector(' .far ');

close.addEventListener('click', closePokemon);

function modal() {

    let input = document.querySelector(' input ').value;

    console.log(input)

    const IMG = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${input}.svg`;

    const imgPokemon = document.querySelector(' .pokemonWindowBody ');
        
    imgPokemon.querySelector(' .pokemonBig img ').src = IMG;

    axios.get(API_URL(input))
        .catch(err => {
            console.error(err);
        })
        .then(res => {
            
            const data = res.data;

            const { name, types, abilities, } = data;

            const infoPokemon = document.querySelector(' .infoPokemon ');

            infoPokemon.querySelector(' .number ').innerHTML = input;

            infoPokemon.querySelector(' .name ').innerHTML = name;

            infoPokemon.querySelector(' .type ').innerHTML = types.map(typesPokemon => typesPokemon.type.name);

            infoPokemon.querySelector(' .abilities ').innerHTML = abilities.map(abilittisPokemon => abilittisPokemon.ability.name).join(' | ');
        });
};

function modalName() {

    let input = document.querySelector(' input ').value;

    const imgPokemon = document.querySelector(' .pokemonWindowBody ');

    axios.get(API_URL(input).toLocaleLowerCase())
        .catch(err => {
            console.error(err);
        })
        .then(res => {
            
            const data = res.data;

            const { id, name, types, abilities, } = data;

            const IMG = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;

            const infoPokemon = document.querySelector(' .infoPokemon ');

            imgPokemon.querySelector(' .pokemonBig img ').src = IMG;

            infoPokemon.querySelector(' .name ').innerHTML = name;

            infoPokemon.querySelector(' .number ').innerHTML = id;

            infoPokemon.querySelector(' .type ').innerHTML = types.map(typesPokemon => typesPokemon.type.name).join(' | ');

            infoPokemon.querySelector(' .abilities ').innerHTML = abilities.map(abilittisPokemon => abilittisPokemon.ability.name).join(' | ');
        });
};
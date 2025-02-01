import { useEffect, useState } from 'react';
import './PokemonList.css';
import axios from 'axios';
import Pokemon from '../Pokemon/Pokemon';

function PokemonList() {

    const [pokemonList, setPokemonList] = useState([]);

    const POKEDEX_URL = "https://pokeapi.co/api/v2/pokemon";

    async function downloadPokemons() {
        const response = await axios.get(POKEDEX_URL);

        const pokemonResults = response.data.results; // array of pokemons

        const pokemonPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));

        const pokemonListData = await axios.all(pokemonPromise);

        const pokemonFinalList = pokemonListData.map(pokemonData => {
            const pokemon = pokemonData.data;
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.other.dream_world.front_default,
                types: pokemon.types
            }
        });
        setPokemonList(pokemonFinalList);
    }

    useEffect(() => {
        downloadPokemons();
    }, []);

    return (
        <div className='pokemon-list-wrapper'>
            <div>
                <h1>Pokemon List</h1>
            </div>
            <div className='page-controls'>
                <button>Prev</button>
                <button>Next</button>
            </div>
            <div className='pokemon-list'>
                {pokemonList.map(pokemon => <Pokemon name={pokemon.name} key={pokemon.id} url={pokemon.image} />)}
            </div>
        </div>
    )

}

export default PokemonList;
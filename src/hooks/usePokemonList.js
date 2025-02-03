import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonList() {
    const DEFAULT_URL = "https://pokeapi.co/api/v2/pokemon";

    // const [pokemonList, setPokemonList] = useState([]);

    // const [nextUrl, setNextURL] = useState(DEFAULT_URL);
    // const [prevUrl, setPrevURL] = useState(DEFAULT_URL);

    // const [pokedexUrl, setPokedexUrl] = useState("DEFAULT_URL");

    const [pokemonListState, setPokemonListState] = useState({
        pokemonList:[],
        pokedexUrl: DEFAULT_URL,
        nextUrl: DEFAULT_URL,
        prevUrl: DEFAULT_URL,
    });

    async function downloadPokemons() {
        const response = await axios.get(pokemonListState.pokedexUrl ? pokemonListState.pokedexUrl : DEFAULT_URL);

        const pokemonResults = response.data.results; // array of pokemons

        const pokemonPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));

        // setNextURL(response.data.next);
        // setPrevURL(response.data.previous);

        // setPokemonListState((state) => ({...state, nextUrl: response.data.next, prevUrl: response.data.previous }))

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
        // setPokemonList(pokemonFinalList);
        setPokemonListState((state) => ({...state, pokemonList: pokemonFinalList, nextUrl: response.data.next, prevUrl: response.data.previous}));
    }

    useEffect(() => {
        downloadPokemons();
    }, [pokemonListState.pokedexUrl]);

    return [pokemonListState, setPokemonListState];

}

export default usePokemonList;
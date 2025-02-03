import { useEffect, useState } from "react";
import downloadPokemons from "../utils/downloadPokemons";

function usePokemonList(DEFAULT_URL) {

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

    useEffect(() => {
        downloadPokemons(pokemonListState, setPokemonListState, DEFAULT_URL);
    }, [pokemonListState.pokedexUrl]);

    return [pokemonListState, setPokemonListState];

}

export default usePokemonList;
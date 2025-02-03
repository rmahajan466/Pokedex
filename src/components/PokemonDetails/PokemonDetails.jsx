// CSS Import
import "./PokemonDetails.css";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import usePokemon from "../../hooks/usePokemon";
import Pokemon from "../Pokemon/Pokemon";

function PokemonDetails() {

    const {id} = useParams();

    const [pokemon, pokemonListState] = usePokemon(id);

    return (
        <>
            <h1 className="pokedex-redirect">
                <Link to="/">
                    PokeDex
                </Link>
            </h1>
            {pokemon && <div className="pokemon-details-wrapper">
                <div className="pokemon-name-details">
                    {pokemon.name.toUpperCase()}
                </div>
                <div className="pokemon-image">
                    <img src={pokemon.image} alt={pokemon.name} />
                </div>
                <div className="pokemon-attr">
                    <div>
                        Height: {pokemon.height}
                    </div>
                    <div>
                        Weight: {pokemon.weight}
                    </div>
                </div>
                <div className="pokemon-types">
                    <h1>Type:</h1> {pokemon.types.map(t => <span className="types-span" key={t.type.name}>{t.type.name}</span> )}
                </div>
            </div>}
                <div className="similar-pokemons">
                    <h2> Similar Pokemons</h2>
                    <div className="pokemon-similar-boxes">
                        {pokemonListState.pokemonList.length > 0 &&
                            pokemonListState.pokemonList.map(pokemon => <Pokemon name={pokemon.name} key={pokemon.id} url={pokemon.image} id ={pokemon.id} />)
                        }
                    </div>
                </div>
        </>
    );
}

export default PokemonDetails;
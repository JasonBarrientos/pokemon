import { PokemonCard } from "./PokemonCard"

export const PokemonGrid = ({ pokemons }) => {
    
    return (
        <div className="card-grid">
            {
            pokemons.map(pokemon => {
                return (<PokemonCard key={pokemon.url} pokemon={pokemon}></PokemonCard>                )
            })
            }
        </div>


    )
}

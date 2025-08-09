import { useState } from 'react'
import { SearchPokemon } from './components/SearchPokemon'

export const PokedexApp = () => {
        const [pokemons, setPokemons] = useState([])

        const onChangeInput=(value)=>{
            if (pokemons.includes(value)) return;
           setPokemons((arr)=>[value,...arr]);
        }
    return (
    <>
        <h1>PokedexApp</h1>
        <SearchPokemon onChangeInput={onChangeInput} ></SearchPokemon>
        <ol>
              {
            pokemons.map(pokemon=>{
                return <li> {pokemon}</li>
            })
        }
        </ol>
      
    </>
  )
}

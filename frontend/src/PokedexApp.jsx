import { useEffect, useState } from 'react'
import { SearchPokemon } from './components/SearchPokemon'
import { PokemonGrid } from './components/PokemonGrid'
import { getInitPokemons } from './utils/pokemons'

export const PokedexApp = () => {
        const [pokemons, setPokemons] = useState([])

        const getPokemons=async()=>{
            const pokemons=await getInitPokemons();
            setPokemons(pokemons) 
        };
        useEffect(() => {
          getPokemons()
        }, [])
        

        const onChangeInput=(value)=>{
            if (pokemons.includes(value)) return;
           setPokemons((arr)=>[value,...arr]);
        }
    return (
    <>
        <h1>PokedexApp</h1>
        <SearchPokemon onChangeInput={onChangeInput}/>
        <PokemonGrid pokemons={pokemons} />
    </>
  )
}

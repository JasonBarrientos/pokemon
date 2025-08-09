export const getInitPokemons = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`;

    const response = await fetch(url);
    const data = await response.json();

    const pokemons = await Promise.all(
        data.results.map(pokemon => getPokemon(pokemon.name))
    );

    return pokemons;
};



export const getPokemon = async (pokemonName) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    const response = await fetch(url);
    const data = await response.json();

    const pokemon = {
        url: data.sprites.other.dream_world.front_default,
        name: pokemonName,
        hp: data.stats[0].base_stat,
        statAttack: data.stats[1].base_stat,
        statDefense: data.stats[2].base_stat,
        statSpeed: data.stats[5].base_stat,
        types: await Promise.all( await data.types.map(element=>{
            return {name: element.type.name}
        }))
    }

    return pokemon;
}
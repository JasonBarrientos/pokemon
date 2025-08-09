
export const PokemonCard = ({ pokemon }) => {
const typeColor = {
    bug: "#26de81",
    dragon: "#ffeaa7",
    electric: "#fed330",
    fairy: "#ff0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#efb549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190ff"
}

const themeColor = typeColor[pokemon.types[0].name];

    return (
        <div className="card" key={pokemon.name} style={{ background: `radial-gradient(circle at 50% 0%, ${themeColor} 36%, #efffff 36%)` }}>
            <p className="hp">
                <span>HP  </span>
                {pokemon.hp}
            </p>
            <img src={pokemon.url} />
            <h2 className="poke-name">{pokemon.name}</h2>
            <div className="types">
                    {
                        pokemon.types.map(type=>{
                            return <span style={{backgroundColor: `${typeColor[type.name]}`}} key={type.name}>{type.name}</span>
                        })
                    }
            </div>
            <div className="stats">
                <div>
                    <h3>{pokemon.statAttack}</h3>
                    <p>Attack</p>
                </div>
                <div>
                    <h3>{pokemon.statDefense}</h3>
                    <p>Defense</p>
                </div>
                <div>
                    <h3>{pokemon.statSpeed}</h3>
                    <p>Speed</p>
                </div>
            </div>
        </div>
    )
}

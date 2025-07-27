import './PokemonCard.css';
import {Link} from "react-router-dom";

function PokemonCard({ pokemon }) {
    return (
        <Link to={`/pokemon/${pokemon.id}`} className="pokemon-link">
            <div className="pokemon-card">
                <h3>{pokemon.name.toUpperCase()}</h3>
                <img
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className="pokemon-image"
                />
                <div className="pokemon-types">
                    {pokemon.types.map((typeObj, index) => (
                        <span key={index} className={`type ${typeObj.type.name}`}>
              {typeObj.type.name}
            </span>
                    ))}
                </div>
            </div>
        </Link>
    );
}

export default PokemonCard;

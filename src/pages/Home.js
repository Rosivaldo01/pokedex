import { useEffect, useState } from 'react';
import axios from 'axios';
import PokemonCard from '../components/PokemonCard';
import './Home.css';

function Home() {
    const [pokemons, setPokemons] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState('');
    const [type, setType] = useState('');

    useEffect(() => {
        fetchPokemons();
    }, []);

    const fetchPokemons = async () => {
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        const allPokemonData = await Promise.all(
            res.data.results.map(async (pokemon) => {
                const detail = await axios.get(pokemon.url);
                return detail.data;
            })
        );
        setPokemons(allPokemonData);
        setFiltered(allPokemonData);
    };

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearch(value);
        filterPokemons(value, type);
    };

    const handleTypeFilter = (e) => {
        const selectedType = e.target.value;
        setType(selectedType);
        filterPokemons(search, selectedType);
    };

    const filterPokemons = (searchTerm, selectedType) => {
        let result = pokemons;

        if (searchTerm) {
            result = result.filter(p => p.name.includes(searchTerm));
        }

        if (selectedType) {
            result = result.filter(p =>
                p.types.some(t => t.type.name === selectedType)
            );
        }

        setFiltered(result);
    };

    return (
        <div className="home-container">
            <h1>Pokédex - Primeira Geração</h1>

            <div className="filters">
                <input
                    type="text"
                    placeholder="Buscar por nome..."
                    value={search}
                    onChange={handleSearch}
                />
                <select value={type} onChange={handleTypeFilter}>
                    <option value="">Todos os Tipos</option>
                    <option value="fire">Fogo</option>
                    <option value="water">Água</option>
                    <option value="grass">Grama</option>
                    <option value="electric">Elétrico</option>
                    <option value="normal">Normal</option>
                    <option value="psychic">Psíquico</option>
                    <option value="bug">Inseto</option>
                    <option value="poison">Veneno</option>
                    <option value="ground">Terra</option>
                    <option value="rock">Rocha</option>
                    <option value="fighting">Lutador</option>
                    <option value="ghost">Fantasma</option>
                    <option value="dragon">Dragão</option>
                </select>
            </div>

            <div className="pokemon-grid">
                {filtered.map((pokemon) => (
                    <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))}
            </div>
        </div>
    );
}

export default Home;

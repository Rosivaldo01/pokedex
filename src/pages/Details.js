import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Details.css';

const Details = () => {
    const { id } = useParams(); // Pega o ID da URL
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Requisição à PokéAPI ao carregar o componente
    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                if (!res.ok) throw new Error('Erro ao buscar Pokémon');
                const data = await res.json();
                setPokemon(data);
                setLoading(false);
            } catch (err) {
                setError(true);
                setLoading(false);
            }
        };

        fetchPokemon();
    }, [id]);

    if (loading) return <div className="details-loading">Carregando...</div>;
    if (error) return <div className="details-error">Pokémon não encontrado.</div>;

    return (
        <div className="details-container">
            <Link className="back-link" to="/">← Voltar</Link>

            <h1 className="details-title">{pokemon.name.toUpperCase()}</h1>
            <img
                className="details-img"
                src={pokemon.sprites.other['official-artwork'].front_default}
                alt={pokemon.name}
            />

            <div className="details-info">
                <p><strong>Altura:</strong> {pokemon.height / 10} m</p>
                <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
                <p><strong>Tipos:</strong> {pokemon.types.map(t => t.type.name).join(', ')}</p>
                <p><strong>Habilidades:</strong> {pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
                <p><strong>Base XP:</strong> {pokemon.base_experience}</p>
            </div>
        </div>
    );
};

export default Details;

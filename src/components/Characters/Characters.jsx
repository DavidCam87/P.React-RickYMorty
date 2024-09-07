import { useState, useEffect } from 'react';
import './Characters.css'; // Importa el archivo CSS

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [rotaciones, setRotaciones] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://rickandmortyapi.com/api/character');
      const data = await response.json();
      setCharacters(data.results);
    };
    fetchData();
  }, []);

  const handleClick = (id) => {
    setRotaciones((prevRotaciones) => ({
      ...prevRotaciones,
      [id]: prevRotaciones[id] === 180 ? 0 : 180,
    }));
  };

  return (
    <div className="characters-container">
      <h1>Personajes de Rick y Morty</h1>
      <div className="characters-grid">
        {characters.map((character) => (
          <div key={character.id} className="character-card">
            <h3>{character.name}</h3>
            <img
              src={character.image}
              alt={character.name}
              className="character-image"
              style={{ transform: `rotate(${rotaciones[character.id] || 0}deg)` }}
              onClick={() => handleClick(character.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Characters;
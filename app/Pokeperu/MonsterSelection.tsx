import { useEffect } from 'react';
import ROUTES from '../consts/ROUTES';

interface MonsterSelectionProps {
  monsters: {
    name: string;
    trainer: string;
    image: string;
  }[];
  selectedMonstersNames: string[];
  currentUser: number;
  handleMonsterSelect: (monster: object) => void;
}

export default function MonsterSelection({
  monsters,
  selectedMonstersNames,
  currentUser,
  handleMonsterSelect,
}: MonsterSelectionProps) {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = parseInt(event.key, 10); // Convert the key to a number
      if (!isNaN(key) && key > 0 && key <= monsters.length) {
        const monster = monsters[key - 1];
        if (!selectedMonstersNames.includes(monster.name)) {
          handleMonsterSelect(monster);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [monsters, selectedMonstersNames, handleMonsterSelect]);

  return (
    <div className="PokePeruStart">
      <div className="header">
        <h1 className="title">Monster Selection</h1>
        <a href={ROUTES.pokePeru.pokedex} className="pokedex-link">
          <img
            src="/images/pokedex-icon.png"
            alt="Pokedex"
            className="pokedex-image"
          />
        </a>
      </div>
      <h2>User {currentUser}, choose your monster:</h2>
      <div className="monster-grid">
        {monsters.map((monster, index) => (
          <button
            key={monster.name}
            onClick={() => handleMonsterSelect(monster)}
            disabled={selectedMonstersNames.includes(monster.name)}
            className="monster-button"
          >
            <div>{monster.name}</div>
            <div>(Gym Leader: {monster.trainer})</div>
            <img src={monster.image} alt={monster.name} className="monster-image" />
            <div className="shortcut-label">Press {index + 1}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
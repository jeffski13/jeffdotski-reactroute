import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import '../styles.css';
import './battlestart.css';

interface MonsterSelectionResultsProps {
  monster1: string;
  monster2: string;
  monster1Image: string;
  monster2Image: string;
  setBattleClicked: () => void;
}

export default function BattleStartScreen({
  monster1,
  monster2,
  monster1Image,
  monster2Image,
  setBattleClicked,
}: MonsterSelectionResultsProps) {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === '1') {
        setBattleClicked();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [setBattleClicked]);

  return (
    <div className="MonsterSelectionResults">
      <h1>Selection Results</h1>
      <div className="monster-container">
        <div className="monster">
          <p>User 1 chose: {monster1}</p>
          <img src={monster1Image} alt={monster1} className="monster-image" />
        </div>
        <div className="monster">
          <p>User 2 chose: {monster2}</p>
          <img src={monster2Image} alt={monster2} className="monster-image" />
        </div>
      </div>
      <Button onClick={setBattleClicked}>Start Battle</Button>
    </div>
  );
}
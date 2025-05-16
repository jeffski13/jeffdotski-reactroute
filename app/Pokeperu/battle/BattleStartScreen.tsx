import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
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
  trainer1Image,
  trainer2Image,
}: MonsterSelectionResultsProps & { trainer1Image: string; trainer2Image: string }) {
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
        <div className="monster" style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={trainer1Image}
            alt="Trainer 1"
            className="trainer-image"
            style={{ marginRight: 16, width: 200, height: 200, objectFit: 'contain' }}
          />
          <div>
            <p>User 1 chose: {monster1}</p>
            <img src={monster1Image} alt={monster1} className="monster-selected" />
          </div>
        </div>
        <div className="monster" style={{ display: 'flex', alignItems: 'center' }}>
          <div>
            <p>User 2 chose: {monster2}</p>
            <img src={monster2Image} alt={monster2} className="monster-selected" />
          </div>
          <img
            src={trainer2Image}
            alt="Trainer 2"
            className="trainer-image"
            style={{ marginLeft: 16, width: 200, height: 200, objectFit: 'contain' }}
          />
        </div>
      </div>
      <Button onClick={setBattleClicked}>Start Battle</Button>
    </div>
  );
}
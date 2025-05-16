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
      <div className="selection-results-container">
        {/* User 1 */}
        <div className="monster-trainer-container" style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ marginBottom: 8, fontWeight: 'bold', textAlign: 'center' }}>
              User 1 chose: {monster1}
            </div>
            <div style={{ position: 'relative', width: 220, height: 200 }}>
              <img
                src={trainer1Image}
                alt="Trainer 1"
                className="trainer-image trainer1"
              />
              <img
                src={monster1Image}
                alt={monster1}
                className="monster-selected monster1"
              />
            </div>
          </div>
        </div>
        {/* VS */}
        <div className="monster-trainer-container" style={{ display: 'flex', alignItems: 'center' }}>
          <h2>VS</h2>
        </div>
        {/* User 2 */}
        <div className="monster-trainer-container" style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ marginBottom: 8, fontWeight: 'bold', textAlign: 'center' }}>
              User 2 chose: {monster2}
            </div>
            <div style={{ position: 'relative', width: 220, height: 200 }}>
              <img
                src={trainer2Image}
                alt="Trainer 2"
                className="trainer-image trainer2"
              />
              <img
                src={monster2Image}
                alt={monster2}
                className="monster-selected monster2"
              />
            </div>
          </div>
        </div>
      </div>
      <Button onClick={setBattleClicked}>Start Battle</Button>
    </div>
  );
}
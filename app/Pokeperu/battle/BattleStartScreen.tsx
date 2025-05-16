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
        {/* User 1 */}
        <div className="monster" style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: 220, height: 200 }}>
            <img
              src={trainer1Image}
              alt="Trainer 1"
              className="trainer-image"
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: 180,
                height: 180,
                objectFit: 'contain',
                zIndex: 1,
                filter: 'brightness(0.6)',
              }}
            />
            <img
              src={monster1Image}
              alt={monster1}
              className="monster-selected"
              style={{
                position: 'absolute',
                left: 80,
                top: 60,
                width: 170,
                height: 170,
                objectFit: 'contain',
                zIndex: 2,
              }}
            />
          </div>
          <div style={{ marginLeft: 16 }}>
            <p>User 1 chose: {monster1}</p>
          </div>
        </div>
        {/* User 2 */}
        <div className="monster" style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ marginRight: 16 }}>
            <p>User 2 chose: {monster2}</p>
          </div>
          <div style={{ position: 'relative', width: 220, height: 200 }}>
            <img
              src={trainer2Image}
              alt="Trainer 2"
              className="trainer-image"
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                width: 180,
                height: 180,
                objectFit: 'contain',
                zIndex: 1,
                filter: 'brightness(0.6)',
              }}
            />
            <img
              src={monster2Image}
              alt={monster2}
              className="monster-selected"
              style={{
                position: 'absolute',
                right: 80,
                top: 60,
                width: 170,
                height: 170,
                objectFit: 'contain',
                zIndex: 2,
              }}
            />
          </div>
        </div>
      </div>
      <Button onClick={setBattleClicked}>Start Battle</Button>
    </div>
  );
}
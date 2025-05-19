import { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import NavigationConfirmModal from './NavigationConfirmModal';
import './selectionResults.css';
import './navigationOverride.css';
import '../navigation.css';
interface MonsterSelectionResultsProps {
  monster1: string;
  monster2: string;
  monster1Image: string;
  monster2Image: string;
  setBattleClicked: () => void;
}

export default function SelectionResults({
  monster1,
  monster2,
  monster1Image,
  monster2Image,
  setBattleClicked,
  trainer1Image,
  trainer2Image,
}: MonsterSelectionResultsProps & { trainer1Image: string; trainer2Image: string }) {
  const [showBackConfirm, setShowBackConfirm] = useState(false);

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
    <div>
      <button
        type="button"
        className="back-button selection-results-back-button"
        onClick={() => setShowBackConfirm(true)}
        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
      >
        <img src="/images/arrow-left.png" alt="Back" className="back-arrow" />
      </button>
      <Container>
        <Row>
          <h1>Selection Results</h1>
        </Row>
        <Row>
          <Col sm={5}>
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
          </Col>
          <Col sm={2}>
            <div className='results-vs' style={{ marginLeft: 'auto', alignSelf: 'flex-start' }}>
              <h2>VS</h2>
            </div>
          </Col>
          <Col sm={5}>
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
          </Col>
        </Row>
        <Row>
          <Col className="startButtonContainer" xs={12}>
            <Button onClick={setBattleClicked}>Start Battle</Button>
          </Col>
        </Row>
      </Container>
      {showBackConfirm && (<NavigationConfirmModal onCancelNavigation={() => setShowBackConfirm(false)}></NavigationConfirmModal>)}
    </div>
  );
}
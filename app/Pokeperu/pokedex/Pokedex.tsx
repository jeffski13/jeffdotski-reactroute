import ROUTES from '../../consts/ROUTES';
import { monsters, type Monster } from '../monsters';
import { getTypeColor } from './typeColors';
import './pokedex.css';
import { Container, Row, Col } from 'react-bootstrap';

export default function Pokedex() {
  return (
    <div className="Pokedex">
      <div className="header">
        <a href={ROUTES.pokePeru.battle} className="back-button">
          <img src="/images/arrow-left.png" alt="Back" className="back-arrow" />
        </a>
        <div className="title-container">
          <h1>Pokedex</h1>
          <img src="/images/pokedex-icon.png" alt="Pokedex" className="pokedex-icon" />
        </div>
      </div>
      <ul className="monster-list">
        {monsters.map((monster: Monster) => (
          <li key={monster.name} className="monster-item">
            <img src={monster.image} alt={monster.name} className="monster-image" />
            <div className="monster-details">
              <h2 className="monster-name">{monster.name}</h2>
              <div
                className="type-badge"
                style={{ backgroundColor: getTypeColor(monster.type) }}
              >
                {monster.type}
              </div>
              {monster.secondType && (
                <div
                  className="type-badge"
                  style={{ backgroundColor: getTypeColor(monster.secondType) }}
                >
                  {monster.secondType}
                </div>
              )}
              <p className="monster-description">{monster.description}</p>
              <Container>
                <Row>
                  <Col md={4} className='stats-container'>
                    <div className="stats-label-container"><span className='stats-label'>Hit Points:</span></div>
                  </Col>
                  <Col md={8}>
                      <div className="stat-bar">
                        <div className="bar" style={{ width: `${monster.hp}%`, backgroundColor: '#FF5959' }}></div>
                      </div>
                  </Col>
                </Row>
                    <Row>
                  <Col md={4} className='stats-container' >
                    <div className="stats-label-container"><span className='stats-label'>Attack:</span></div>
                  </Col>
                  <Col md={8}>
                      <div className="stat-bar">
                        <div className="bar" style={{ width: `${monster.attack}%`, backgroundColor: '#F5AC78' }}></div>
                      </div>
                  </Col>
                </Row>
                    <Row>
                  <Col md={4} className='stats-container' >
                    <div className="stats-label-container"><span className='stats-label'>Defense:</span></div>
                  </Col>
                  <Col md={8}>
                      <div className="stat-bar">
                        <div className="bar" style={{ width: `${monster.defense}%`, backgroundColor: '#FAE078' }}></div>
                      </div>
                  </Col>
                </Row>
                    <Row>
                  <Col md={4} className='stats-container' >
                    <div className="stats-label-container"><span className='stats-label'>Special Attack:</span></div>
                  </Col>
                  <Col md={8}>
                      <div className="stat-bar">
                        <div className="bar" style={{ width: `${monster.specialAttack}%`, backgroundColor: '#9DB7F5' }}></div>
                      </div>
                  </Col>
                </Row>
                    <Row>
                  <Col md={4} className='stats-container' >
                    <div className="stats-label-container"><span className='stats-label'>Special Defense:</span></div>
                  </Col>
                  <Col md={8}>
                      <div className="stat-bar">
                        <div className="bar" style={{ width: `${monster.specialDefense}%`, backgroundColor: '#A7DB8D' }}></div>
                      </div>
                  </Col>
                </Row>
                    <Row>
                  <Col md={4} className='stats-container' >
                    <div className="stats-label-container"><span className='stats-label'>Speed:</span></div>
                  </Col>
                  <Col md={8}>
                      <div className="stat-bar">
                        <div className="bar" style={{ width: `${monster.speed}%`, backgroundColor: '#FA92B2' }}></div>
                      </div>
                  </Col>
                </Row>
              </Container>
              <div className="monster-stats">
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
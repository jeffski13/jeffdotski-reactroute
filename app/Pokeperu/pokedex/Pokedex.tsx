import ROUTES from '../../consts/ROUTES';
import { monsters, type Monster } from '../monsters';
import { getTypeColor } from './typeColors';
import { Container, Row, Col } from 'react-bootstrap';
import './pokedex.css';

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
        {monsters.map((monster: Monster) => {
          const statsList = [
            {
              name: 'Hit Points',
              value: monster.hp,
              color: '#FF5959'
            },
            {
              name: 'Attack',
              value: monster.attack,
              color: '#F5AC78'
            },
            {
              name: 'Defense',
              value: monster.defense,
              color: '#FAE078'
            },
            {
              name: 'Special Attack',
              value: monster.specialAttack,
              color: '#9DB7F5'
            },
            {
              name: 'Special Defense',
              value: monster.specialDefense,
              color: '#A7DB8D'
            },
            {
              name: 'Speed',
              value: monster.speed,
              color: '#FA92B2'
            }
          ];
          const totalStats =
            monster.hp +
            monster.attack +
            monster.defense +
            monster.specialAttack +
            monster.specialDefense +
            monster.speed;

          const attackList = [
            monster.attack1,
            monster.attack2,
          ];

          return (
            <li key={monster.name} className="monster-item">
              <img src={monster.image} alt={monster.name} className="monster-image-dex" />
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
                  {statsList.map((stat) => (
                    <Row key={stat.name}>
                      <Col md={4} className="stats-container">
                        <div className="stats-label-container">
                          <span className="stats-label">{stat.name}:</span>
                        </div>
                      </Col>
                      <Col md={8}>
                        <div className="stat-bar">
                          <div
                            className="bar"
                            style={{
                              width: `${stat.value}%`,
                              backgroundColor: stat.color,
                            }}
                          ></div>
                        </div>
                      </Col>
                    </Row>
                  ))}
                </Container>
                <div className="total-stats">Total Stats: {totalStats}</div>

                {/* Attacks Section */}
                <div className="attacks-section">
                  <Container className="attacks-list">
                    {attackList.map((attack, index) => (
                      <Row key={index} className="attack-item">
                        <Col md={1}>
                          {attack.isPhysical ? 
                          <img className="attack-type-physical" src="/images/pokedex/attack_physical.png" /> : 
                          <img className="attack-type-physical" src="/images/pokedex/attack_special.png" />}
                        </Col>
                        <Col md={4}>
                          <span className="attack-name">{attack.name}</span>
                        </Col>
                        <Col md={4}>
                          <span className="attack-name">Pow: {attack.damage}, PP: 2</span>
                        </Col>
                        <Col md={2}>
                          <div
                            className="type-badge type-badge-attack"
                            style={{ backgroundColor: getTypeColor(attack.type) }}
                          >
                            {attack.type}
                          </div>
                        </Col>
                      </Row>
                    ))}
                  </Container>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
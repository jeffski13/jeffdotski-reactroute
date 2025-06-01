import { Col, Container, Row } from 'react-bootstrap';
import ROUTES from '../../consts/ROUTES';
import '../navigation.css';
import '../secondaryPage.css';
import './infopage.css';

interface InfoPageProps {}

export default function InfoPageContainer() {
  return (<InfoPage />);
}

function InfoPage({ }: InfoPageProps) {
  return (
    <div className="PokePeruSecondaryPage">
      <div className="header">
        <a href={ROUTES.pokePeru.battle} className="back-button">
          <img src="/images/arrow-left.png" alt="Back" className="back-arrow" />
        </a>
        <div className="title-container">
          <h1>About Pokemon in Peru</h1>
          <img src="/images/gym-icon.png" alt="Pokedex" className="secondary-page-icon" />
        </div>
      </div>
      <div className="project-info">
        <h2>About the Project</h2>
        <p>Pokemon in Peru was an educational project designed to expand students descriptive vocabulary in the following categories:</p>
        <ul>
          <li>Elements</li>
          <li>Names of Animals</li>
          <li>Personality Types</li>
        </ul>
        <p>The students were required to create pokemon (inspired by animals) and a gym leader (with a personality). The project had an optional battle component with prizes to keep the students invested in the project.</p>
        <h3>Pokemon Creation</h3>
        <p>The students were required to create the following for the pokemon</p>
        <ul>
          <li>Name</li>
          <li>Two sentences describing the pokemon's character/personality.</li>
          <li>Element Type 1 (Type 2 optional)</li>
          <li>Stats: HP, Attack, Defense, Special Attack, Special Defense, Speed</li>
          <li>Attack 1 Name</li>
          <li>Attack 2 Name</li>
        </ul>
        <Container>
          <Row className="info-images-container">
            <Col sm={5}>
              <img src="/images/info/info_pokemon_creation.png" alt="Back" className="info-image" />
            </Col>
            <Col sm={2} className="info-arrow-separator" >
              <span>➡️</span>
            </Col>
            <Col sm={5}>
              <img src="/images/info/info_pokemon_creation.png" alt="Back" className="info-image" />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
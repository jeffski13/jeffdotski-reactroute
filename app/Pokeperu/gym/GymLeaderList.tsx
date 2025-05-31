import ROUTES from '../../consts/ROUTES';
import './gymleaderlist.css';
import '../navigation.css';

export interface GymLeader {
  name: string;
  image: string;
  environmentImage: string;
}

interface GymLeaderListProps {
  gymLeaders: GymLeader[];
}

export default function GymLeaderList({ gymLeaders }: GymLeaderListProps) {
  return (
    <div className="Pokedex">
      <div className="header">
        <a href={ROUTES.pokePeru.battle} className="back-button">
          <img src="/images/arrow-left.png" alt="Back" className="back-arrow" />
        </a>
        <div className="title-container">
          <h1>Gym Leaders</h1>
          <img src="/images/gym-icon.png" alt="Pokedex" className="gym-icon" />
        </div>
      </div>
      <ul className="gymleader-list">
        {gymLeaders.map((leader) => (
          <li key={leader.name} className="gymleader-item">
            <div className="gymleader-details">
              <img src={leader.image} alt={leader.name} className="gymleader-image" />
              <div>
                <h2 className="gymleader-name">{leader.name}</h2>
                <img
                  src={leader.environmentImage}
                  alt={`${leader.name} environment`}
                  className="gymleader-environment-image"
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
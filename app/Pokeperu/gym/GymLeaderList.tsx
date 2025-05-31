import ROUTES from '../../consts/ROUTES';
import './gymleaderlist.css';
import '../navigation.css';
import { gymLeaders, type GymLeader } from '../gymleaders';

interface GymLeaderListProps {
  gymLeaders: GymLeader[];
}

export default function GymLeaderListContainer() {
  return (<GymLeaderList gymLeaders={gymLeaders} />);
}

function GymLeaderList({ gymLeaders }: GymLeaderListProps) {
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
            <div
              className="gymleader-details"
              style={{
                backgroundImage: `url(${leader.environmentImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '16px',
                minHeight: '180px',
              }}
            >
              <div className='gymleader-details-top'>
                <img src={leader.image} alt={leader.name} className="gymleader-image" />
                <div>
                  <h2 className="gymleader-name">
                    {leader.name}
                  </h2>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
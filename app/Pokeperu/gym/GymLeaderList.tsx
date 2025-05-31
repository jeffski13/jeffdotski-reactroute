import './gymleaderlist.css';

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
    <div className="GymLeaderList">
      <div className="header">
        <h1>Gym Leaders</h1>
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
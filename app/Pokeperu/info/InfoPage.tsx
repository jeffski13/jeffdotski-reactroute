import ROUTES from '../../consts/ROUTES';
import '../navigation.css';
import './infopage.css';

interface InfoPageProps {}

export default function InfoPageContainer() {
  return (<InfoPage />);
}

function InfoPage({ }: InfoPageProps) {
  return (
    <div className="InfoPage">
      <div className="header">
        <a href={ROUTES.pokePeru.battle} className="back-button">
          <img src="/images/arrow-left.png" alt="Back" className="back-arrow" />
        </a>
        <div className="title-container">
          <h1>About Pokemon in Peru</h1>
          <img src="/images/gym-icon.png" alt="Pokedex" className="info-icon" />
        </div>
      </div>
    </div>
  );
}
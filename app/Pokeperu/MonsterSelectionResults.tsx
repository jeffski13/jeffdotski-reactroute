import './styles.css';

interface MonsterSelectionResultsProps {
  selectedMonsters: string[];
}

export default function MonsterSelectionResults({ selectedMonsters }: MonsterSelectionResultsProps) {
  return (
    <div className="MonsterSelectionResults">
      <h1>Selection Results</h1>
      <p>User 1 chose: {selectedMonsters[0]}</p>
      <p>User 2 chose: {selectedMonsters[1]}</p>
    </div>
  );
}
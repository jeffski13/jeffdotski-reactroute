import { render, screen, fireEvent } from '@testing-library/react';
import BattleContainer from './BattleParent';

const mockSelectedMonsters = [
  {
    name: 'Pikachu',
    trainer: 'Ash',
    hp: 35,
    attack: 55,
    defense: 40,
    specialAttack: 50,
    specialDefense: 50,
    speed: 90,
    type: 'Electric',
    image: '/images/pikachu.jpg',
    attack1: { name: 'Quick Attack', damage: 10, type: 'Normal' },
    attack2: { name: 'Thunderbolt', damage: 20, type: 'Electric' },
  },
  {
    name: 'Charmander',
    trainer: 'Brock',
    hp: 39,
    attack: 52,
    defense: 43,
    specialAttack: 60,
    specialDefense: 50,
    speed: 65,
    type: 'Fire',
    image: '/images/charmander.jpg',
    attack1: { name: 'Scratch', damage: 10, type: 'Normal' },
    attack2: { name: 'Flamethrower', damage: 20, type: 'Fire' },
  },
];

describe('BattleStartScreen Component', () => {
  test('clicking "Start Battle" transitions to the battle phase', () => {
    render(<BattleContainer selectedMonsters={mockSelectedMonsters} />);

    // Verify the initial UI shows the selection results
    expect(screen.getByText(/Selection Results/i)).toBeInTheDocument();
    expect(screen.getByText(/User 1 chose: Pikachu/i)).toBeInTheDocument();
    expect(screen.getByText(/User 2 chose: Charmander/i)).toBeInTheDocument();

    // Find and click the "Start Battle" button
    const startBattleButton = screen.getByText(/Start Battle/i);
    fireEvent.click(startBattleButton);

    // Verify the UI transitions to the battle phase
    expect(screen.getByText(/Battle Time!/i)).toBeInTheDocument();
    expect(screen.getByText(/Trainer: Ash/i)).toBeInTheDocument();
    expect(screen.getByText(/Trainer: Brock/i)).toBeInTheDocument();
    expect(screen.getByText(/HP: 35/i)).toBeInTheDocument(); // Pikachu's HP
    expect(screen.getByText(/HP: 39/i)).toBeInTheDocument(); // Charmander's HP
  });
});
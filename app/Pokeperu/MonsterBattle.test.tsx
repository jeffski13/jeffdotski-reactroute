import { render, screen, fireEvent } from '@testing-library/react';
import MonsterBattle from './MonsterBattle';

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

describe('MonsterBattle Component', () => {
  test('when monster1 attacks, monster2Hp is reduced', () => {
    render(<MonsterBattle selectedMonsters={mockSelectedMonsters} />);

    // Verify initial HP values
    expect(screen.getByText(/HP: 35/i)).toBeInTheDocument(); // Pikachu's HP
    expect(screen.getByText(/HP: 39/i)).toBeInTheDocument(); // Charmander's HP

    // Find and click the attack button for monster1 (Pikachu)
    const attackButton = screen.getByText(/Quick Attack/i);
    fireEvent.click(attackButton);

    // Verify that monster2's HP is reduced
    expect(screen.getByText(/HP: 29/i)).toBeInTheDocument(); // Charmander's HP after attack
  });

  test('monster2 attack buttons are disabled and monster1 attack buttons are enabled when the UI appears', () => {
    render(<MonsterBattle selectedMonsters={mockSelectedMonsters} />);

    // Verify monster1's attack buttons are enabled
    const monster1Attack1Button = screen.getByText(/Quick Attack/i);
    const monster1Attack2Button = screen.getByText(/Thunderbolt/i);
    expect(monster1Attack1Button).toBeEnabled();
    expect(monster1Attack2Button).toBeEnabled();

    // Verify monster2's attack buttons are disabled
    const monster2Attack1Button = screen.getByText(/Scratch/i);
    const monster2Attack2Button = screen.getByText(/Flamethrower/i);
    expect(monster2Attack1Button).toBeDisabled();
    expect(monster2Attack2Button).toBeDisabled();
  });
});

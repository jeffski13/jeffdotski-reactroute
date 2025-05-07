import { render, screen, fireEvent } from '@testing-library/react';
import Battle from './Battle';

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

const mockSelectedMonstersSpeedMod = [{...mockSelectedMonsters[0]}, {...mockSelectedMonsters[1]}];
mockSelectedMonstersSpeedMod[0].speed = 50; // Pikachu's speed
mockSelectedMonstersSpeedMod[1].speed = 60; // Charmander's speed


describe('Battle Component', () => {
  test('when monster1 attacks, monster2Hp is reduced', () => {
    render(<Battle selectedMonsters={mockSelectedMonsters} />);

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
    render(<Battle selectedMonsters={mockSelectedMonsters} />);

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

  test('monster with the highest speed attacks first', () => {
    render(<Battle selectedMonsters={mockSelectedMonstersSpeedMod} />);

    // Verify that the monster with the highest speed (Pikachu) attacks first
    const monster2Attack1Button = screen.getByText(/Scratch/i);
    const monster2Attack2Button = screen.getByText(/Flamethrower/i);

    // Monster1's attack buttons should be enabled
    expect(monster2Attack1Button).toBeEnabled();

    // Monster2's attack buttons should be disabled
    expect(monster2Attack2Button).toBeEnabled();
  });
});

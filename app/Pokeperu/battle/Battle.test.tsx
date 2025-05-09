import { render, screen, fireEvent } from '@testing-library/react';
import Battle from './Battle';
import { MonsterType } from '../MonsterType';

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
    expect(screen.getByText(/HP: 34/i)).toBeInTheDocument(); // Charmander's HP after attack
  });
  
  test('when monster1 attacks, the results of the attack are displayed', () => {
    render(<Battle selectedMonsters={mockSelectedMonsters} />);

    // Verify initial HP values
    expect(screen.getByText(/HP: 35/i)).toBeInTheDocument(); // Pikachu's HP
    expect(screen.getByText(/HP: 39/i)).toBeInTheDocument(); // Charmander's HP

    // Find and click the attack button for monster1 (Pikachu)
    const attackButton = screen.getByText(/Quick Attack/i);
    fireEvent.click(attackButton);

    // Verify that monster2's HP is reduced
    expect(screen.getByText(/Pikachu did 5 damage to Charmander./i)).toBeInTheDocument(); // 
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

  test('attack buttons are disabled once a monster has won', () => {
    render(<Battle selectedMonsters={mockSelectedMonsters} />);

    // Simulate Monster 1 attacking Monster 2 until Monster 2's HP reaches 0
    const attackButtonMonster1 = screen.getByText(/Quick Attack/i);
    const attackButtonMonster2 = screen.getByText(/Scratch/i);
    for (let i = 0; i < 10; i++) {
      fireEvent.click(attackButtonMonster1);
      fireEvent.click(attackButtonMonster2);
    }

    // Verify that Monster 2's HP is 0
    expect(screen.getByText(/HP: 0/i)).toBeInTheDocument();

    // Verify that all attack buttons are disabled
    const allButtons = screen.getAllByRole('button');
    allButtons.forEach((button) => {
      expect(button).toBeDisabled();
    });
  });

  it('should deal no damage when an Electric type attack is used against a Ground type monster', () => {
    const selectedMonsters = [
      {...mockSelectedMonsters[0]},
      {
        name: 'Diglett',
        trainer: 'Brock',
        hp: 100,
        attack: 55,
        defense: 25,
        specialAttack: 35,
        specialDefense: 45,
        speed: 95,
        type: MonsterType.Ground,
        secondType: null,
        image: '/images/diglett.jpg',
        attack1: {
          name: 'Scratch',
          damage: 10,
          type: MonsterType.Normal,
        },
        attack2: {
          name: 'Earthquake',
          damage: 50,
          type: MonsterType.Ground,
        },
      },
    ];

    render(<Battle selectedMonsters={selectedMonsters} />);

    // Monster 1 (Pikachu) uses Thunderbolt on Monster 2 (Diglett)
    const thunderboltButton = screen.getByText('Thunderbolt');
    fireEvent.click(thunderboltButton);

    // Assert that Diglett's HP remains unchanged
    expect(screen.getByText(/HP: 100/i)).toBeInTheDocument();
  });

  it('should deal no damage when an Electric type attack is used against a Ghost type monster with secondary type Ground', () => {
    const selectedMonsters = [
      {...mockSelectedMonsters[0]},
      {
        name: 'Gengar',
        trainer: 'Morty',
        hp: 100,
        attack: 65,
        defense: 60,
        specialAttack: 130,
        specialDefense: 75,
        speed: 110,
        type: MonsterType.Ghost,
        secondType: MonsterType.Ground,
        image: '/images/gengar.jpg',
        attack1: {
          name: 'Shadow Ball',
          damage: 50,
          type: MonsterType.Ghost,
        },
        attack2: {
          name: 'Earthquake',
          damage: 50,
          type: MonsterType.Ground,
        },
      },
    ];

    render(<Battle selectedMonsters={selectedMonsters} />);

    // Monster 1 (Pikachu) uses Thunderbolt on Monster 2 (Gengar)
    const thunderboltButton = screen.getByText('Thunderbolt');
    fireEvent.click(thunderboltButton);

    // Assert that Gengar's HP remains unchanged
    const gengarHp = screen.getByText('HP: 100');
    expect(gengarHp).toBeInTheDocument();
  });
});

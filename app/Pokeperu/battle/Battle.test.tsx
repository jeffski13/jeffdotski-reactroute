import { render, screen, fireEvent } from '@testing-library/react';
import Battle, { calculateAdjustedDamage } from './Battle';
import { ElementType } from '../ElementType';
import type { Monster } from '../monsters';

const mockSelectedMonsters: Monster[] = [
  {
    name: 'Pikachu',
    trainer: 'Ash',
    description: '',
    inspiration: '',
    hp: 35,
    attack: 55,
    defense: 40,
    specialAttack: 50,
    specialDefense: 50,
    speed: 90,
    type: ElementType.Electric,
    secondType: null,
    image: '/images/monsters/pikachu.jpg',
    attack1: { name: 'Quick Attack', damage: 10, type: ElementType.Normal, isPhysical: true, powerPoints: 20, accuracy: 1 },
    attack2: { name: 'Thunderbolt', damage: 20, type: ElementType.Electric, isPhysical: false, powerPoints: 20, accuracy: 1 },
  },
  {
    name: 'Charmander',
    trainer: 'Brock',
    description: '',
    inspiration: '',
    hp: 47,
    attack: 52,
    defense: 43,
    specialAttack: 60,
    specialDefense: 50,
    speed: 65,
    type: ElementType.Fire,
    secondType: null,
    image: '/images/monsters/charmander.jpg',
    attack1: { name: 'Scratch', damage: 10, type: ElementType.Normal, isPhysical: true, powerPoints: 20, accuracy: 1 },
    attack2: { name: 'Flamethrower', damage: 20, type: ElementType.Fire, isPhysical: false, powerPoints: 20, accuracy: 1 },
  },
];

describe('Battle Component', () => {
  test('verify initial HP', () => {
    render(<Battle selectedMonsters={mockSelectedMonsters} attackMissedPercentage={0} isAttackRandomDamage={false} isTextRenderInstant={true} />);

    // Verify initial HP values
    expect(screen.getByText(/HP: 35/i)).toBeInTheDocument(); // Pikachu's HP
    expect(screen.getByText(/HP: 47/i)).toBeInTheDocument(); // Charmander's HP
  });
  
  test('verify initial title message', () => {
    render(<Battle selectedMonsters={mockSelectedMonsters} attackMissedPercentage={0} isAttackRandomDamage={false} isTextRenderInstant={true} />);

    expect(screen.getByText(/Battle Time!/i)).toBeInTheDocument();
  });

  test('when monster1 attacks, monster2Hp is reduced', () => {
    render(<Battle selectedMonsters={mockSelectedMonsters} attackMissedPercentage={0} isAttackRandomDamage={false} />);

    // Find and click the attack button for monster1 (Pikachu)
    const attackButton = screen.getByText(/Quick Attack/i);
    fireEvent.click(attackButton);

    const damage = calculateAdjustedDamage(mockSelectedMonsters[0], mockSelectedMonsters[1], mockSelectedMonsters[0].attack1.damage, mockSelectedMonsters[0].attack1.type, mockSelectedMonsters[0].attack1.isPhysical, false);
    const expectedHp = mockSelectedMonsters[1].hp - damage;
    // Verify that monster2's HP is reduced
    expect(screen.getByText(`HP: ${expectedHp}`)).toBeInTheDocument(); // Charmander's HP after attack
  });

  test('when monster1 attacks, the results of the attack are displayed', () => {
    render(<Battle selectedMonsters={mockSelectedMonsters} attackMissedPercentage={0} isAttackRandomDamage={false} isTextRenderInstant={true} />);

    // Find and click the attack button for monster1 (Pikachu)
    const attackButton = screen.getByText(/Quick Attack/i);
    fireEvent.click(attackButton);

    // Verify that monster2's HP is reduced
    expect(screen.getByText(/Pikachu did /i)).toBeInTheDocument(); // 
    expect(screen.getByText(/damage to Charmander./i)).toBeInTheDocument(); // 
  });

  test('monster2 attack buttons are disabled and monster1 attack buttons are enabled when the UI appears', () => {
    render(<Battle selectedMonsters={mockSelectedMonsters} attackMissedPercentage={0} isAttackRandomDamage={false} isTextRenderInstant={true} />);

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
    const mockSelectedMonstersSpeedMod = [{ ...mockSelectedMonsters[0] }, { ...mockSelectedMonsters[1] }];
    mockSelectedMonstersSpeedMod[0].speed = 50; // Pikachu's speed
    mockSelectedMonstersSpeedMod[1].speed = 60; // Charmander's speed

    render(<Battle selectedMonsters={mockSelectedMonstersSpeedMod} attackMissedPercentage={0} isAttackRandomDamage={false} isTextRenderInstant={true}/>);

    // Verify that the initial message indicates that the monster with the highest speed attacks first
    expect(screen.getByText(/Charmander attacks first./i)).toBeInTheDocument();

    // Verify that the monster with the highest speed (Pikachu) attacks first
    const monster2Attack1Button = screen.getByText(/Scratch/i);
    const monster2Attack2Button = screen.getByText(/Flamethrower/i);

    // Monster1's attack buttons should be enabled
    expect(monster2Attack1Button).toBeEnabled();

    // Monster2's attack buttons should be disabled
    expect(monster2Attack2Button).toBeEnabled();
  });

  test('attack buttons are disabled once a monster has won', () => {
    render(<Battle selectedMonsters={mockSelectedMonsters} attackMissedPercentage={0} isAttackRandomDamage={false} />);

    // Simulate Monster 1 attacking Monster 2 until Monster 2's HP reaches 0
    const attackButtonMonster1 = screen.getByText(/Quick Attack/i);
    const attackButtonMonster2 = screen.getByText(/Scratch/i);
    for (let i = 0; i < 30; i++) {
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

  test('correct messages when monster has won', () => {
    const veryWeakPokemon = {
      name: 'Charmander', trainer: 'Brock', description: '', inspiration: '',
      hp: 1, attack: 1, defense: 1, specialAttack: 1, specialDefense: 1, speed: 1,
      type: ElementType.Fire,
      secondType: null,
      image: '/images/monsters/charmander.jpg',
      attack1: { name: 'Scratch', damage: 0, type: ElementType.Normal, isPhysical: true, powerPoints: 20, accuracy: 0 },
      attack2: { name: 'Flamethrower', damage: 0, type: ElementType.Fire, isPhysical: false, powerPoints: 20, accuracy: 0 },
    };

    const oneSidedBattleMonsters = [mockSelectedMonsters[0], veryWeakPokemon];

    render(<Battle selectedMonsters={oneSidedBattleMonsters} attackMissedPercentage={0} isAttackRandomDamage={false} isTextRenderInstant={true} />);

    // Simulate Monster 1 attacking Monster 2 until Monster 2's HP reaches 0
    const attackButtonMonster1 = screen.getByText(/Quick Attack/i);
    for (let i = 0; i < 30; i++) {
      fireEvent.click(attackButtonMonster1);
    }

    expect(screen.getByText(/Pikachu Wins!/i)).toBeInTheDocument();
  });

  it('should deal no damage when an Electric type attack is used against a Ground type monster', () => {
    const selectedMonsters = [
      { ...mockSelectedMonsters[0] },
      { ...mockSelectedMonsters[1] },
    ];
    selectedMonsters[1].type = ElementType.Ground;
    selectedMonsters[1].hp = 100;

    render(<Battle selectedMonsters={selectedMonsters} attackMissedPercentage={0} isAttackRandomDamage={false} />);

    // Monster 1 (Pikachu) uses Thunderbolt on Monster 2 (Diglett)
    const thunderboltButton = screen.getByText('Thunderbolt', { exact: false });
    fireEvent.click(thunderboltButton);

    // Assert that Diglett's HP remains unchanged
    expect(screen.getByText(/HP: 100/i)).toBeInTheDocument();
  });

  it('should deal no damage when an Electric type attack is used against a Ghost type monster with secondary type Ground', () => {
    const gengar: Monster = {
      name: 'Gengar',
      trainer: 'Morty',
      hp: 100,
      attack: 65,
      defense: 60,
      specialAttack: 130,
      specialDefense: 75,
      speed: 110,
      type: ElementType.Ghost,
      secondType: ElementType.Ground,
      image: '/images/monsters/gengar.jpg',
      attack1: {
        name: 'Shadow Ball',
        damage: 50,
        type: ElementType.Ghost,
        isPhysical: false,
        powerPoints: 10,
        accuracy: 1,
      },
      attack2: {
        name: 'Earthquake',
        damage: 50,
        type: ElementType.Ground,
        isPhysical: false,
        powerPoints: 10,
        accuracy: 1,
      },
      description: null,
      inspiration: '',
    };
    const selectedMonsters = [
      { ...mockSelectedMonsters[0] },
      gengar,
    ];

    render(<Battle selectedMonsters={selectedMonsters} attackMissedPercentage={0} isAttackRandomDamage={false} />);

    // Monster 1 (Pikachu) uses Thunderbolt on Monster 2 (Gengar)
    const thunderboltButton = screen.getByText('Thunderbolt', { exact: false });
    fireEvent.click(thunderboltButton);

    // Assert that Gengar's HP remains unchanged
    const gengarHp = screen.getByText('HP: 100');
    expect(gengarHp).toBeInTheDocument();
  });

  it('displays "attack missed!" when the attack misses', () => {
    // Render the Battle component with attackMissedPercentage set to 1 (guaranteed miss)
    render(<Battle selectedMonsters={mockSelectedMonsters} attackMissedPercentage={1} isAttackRandomDamage={false} isTextRenderInstant={true}/>);

    // Simulate an attack by clicking the first monster's first attack button
    const attackButton = screen.getByText('Quick Attack', { exact: false });
    fireEvent.click(attackButton);

    // Assert that the "attack missed!" message is displayed
    expect(screen.getByText(/attack missed!/i)).toBeInTheDocument();
  });

  it('displays "attack missed!" when the attack misses due to accuracy', () => {
    const mockSelectedMonstersAccuracyMod = [{ ...mockSelectedMonsters[0] }, { ...mockSelectedMonsters[1] }];
    mockSelectedMonstersAccuracyMod[0].attack1 = {
      name: 'Quick Attack',
      damage: 10,
      type: ElementType.Normal,
      isPhysical: true,
      powerPoints: 1,
      accuracy: 0,
    }

    render(<Battle selectedMonsters={mockSelectedMonstersAccuracyMod} attackMissedPercentage={0} isAttackRandomDamage={false} isTextRenderInstant={true} />);

    // Simulate an attack by clicking the first monster's first attack button
    const attackButton = screen.getByText('Quick Attack', { exact: false });
    fireEvent.click(attackButton);

    // Assert that the "attack missed!" message is displayed
    expect(screen.getByText(/attack missed!/i)).toBeInTheDocument();
  });

  test('attack buttons are disabled once an attack has 0 power points', () => {
    const mockSelectedMonstersPowerPointsMod = [{ ...mockSelectedMonsters[0] }, { ...mockSelectedMonsters[1] }];
    mockSelectedMonstersPowerPointsMod[0].attack1 = {
      name: 'Quick Attack',
      damage: 10,
      type: ElementType.Normal,
      isPhysical: true,
      powerPoints: 1,
      accuracy: 1,
    }

    render(<Battle selectedMonsters={mockSelectedMonstersPowerPointsMod} attackMissedPercentage={0} isAttackRandomDamage={false} />);

    // Simulate Monster 1 attacking Monster 2 until Monster 2's HP reaches 0
    const attackButtonMonster1 = screen.getByText(/Quick Attack/i);
    fireEvent.click(attackButtonMonster1);
    const attackButtonMonster2 = screen.getByText(/Scratch/i);
    fireEvent.click(attackButtonMonster2);

    // Verify that attack 1's power points is 0
    expect(screen.getByText(/PP: 0\/1/i)).toBeInTheDocument();

    // Verify attack 1 button is disabled and attack 2 is enabled
    const monster1Attack1Button = screen.getByText(/Quick Attack/i);
    expect(monster1Attack1Button).toBeDisabled();
    const monster1Attack2Button = screen.getByText(/Thunderbolt/i);
    expect(monster1Attack2Button).toBeEnabled();
  });
  
  test('pokemon struggles once both attacks have 0 power points', () => {
    const mockSelectedMonstersPowerPointsMod = [{ ...mockSelectedMonsters[0] }, { ...mockSelectedMonsters[1] }];
    mockSelectedMonstersPowerPointsMod[0].attack1 = {
      name: 'Quick Attack',
      damage: 10,
      type: ElementType.Normal,
      isPhysical: true,
      powerPoints: 1,
      accuracy: 1,
    }
    mockSelectedMonstersPowerPointsMod[0].attack2 = {
      name: 'Tackle',
      damage: 10,
      type: ElementType.Normal,
      isPhysical: true,
      powerPoints: 1,
      accuracy: 1,
    }
    mockSelectedMonstersPowerPointsMod[1].attack1 = {
      name: 'Scratch',
      damage: 10,
      type: ElementType.Normal,
      isPhysical: true,
      powerPoints: 1,
      accuracy: 1,
    }
    mockSelectedMonstersPowerPointsMod[1].attack2 = {
      name: 'Bite',
      damage: 10,
      type: ElementType.Normal,
      isPhysical: true,
      powerPoints: 2,
      accuracy: 1,
    }

    render(<Battle selectedMonsters={mockSelectedMonstersPowerPointsMod} 
      attackMissedPercentage={0} isAttackRandomDamage={false} 
      isTextRenderInstant={true} isInstantStruggleEnabled={true} />);

    // Simulate Monster 1 attacking Monster 2 until Monster 2's HP reaches 0
    const attackButtonMonster1Attack1 = screen.getByText(/Quick Attack/i);
    fireEvent.click(attackButtonMonster1Attack1);
    const attackButtonMonster2Attack1 = screen.getByText(/Scratch/i);
    fireEvent.click(attackButtonMonster2Attack1);
    const attackButtonMonster1Attack2 = screen.getByText(/Tackle/i);
    fireEvent.click(attackButtonMonster1Attack2);
    const attackButtonMonster2Attack2 = screen.getByText(/Bite/i);
    fireEvent.click(attackButtonMonster2Attack2);

    // Verify that attack 1's power points is 0
    expect(screen.getByText(/Pikachu used struggle!/i)).toBeInTheDocument();
    expect(screen.getByText(/Pikachu is hurt by recoil!/i)).toBeInTheDocument();
  });
  test('pokemon struggle loop once all attacks have 0 power points', () => {
    const mockSelectedMonstersPowerPointsMod = [{ ...mockSelectedMonsters[0] }, { ...mockSelectedMonsters[1] }];
    mockSelectedMonstersPowerPointsMod[0].hp = 500
    mockSelectedMonstersPowerPointsMod[0].defense = 100
    mockSelectedMonstersPowerPointsMod[0].attack1 = {
      name: 'Quick Attack',
      damage: 10,
      type: ElementType.Normal,
      isPhysical: true,
      powerPoints: 1,
      accuracy: 1,
    }
    mockSelectedMonstersPowerPointsMod[0].attack2 = {
      name: 'Tackle',
      damage: 10,
      type: ElementType.Normal,
      isPhysical: true,
      powerPoints: 1,
      accuracy: 1,
    }
    mockSelectedMonstersPowerPointsMod[1].attack1 = {
      name: 'Scratch',
      damage: 10,
      type: ElementType.Normal,
      isPhysical: true,
      powerPoints: 1,
      accuracy: 1,
    }
    mockSelectedMonstersPowerPointsMod[1].attack2 = {
      name: 'Bite',
      damage: 10,
      type: ElementType.Normal,
      isPhysical: true,
      powerPoints: 1,
      accuracy: 1,
    }

    render(<Battle selectedMonsters={mockSelectedMonstersPowerPointsMod} 
      attackMissedPercentage={0} isAttackRandomDamage={false} 
      isTextRenderInstant={true} isInstantStruggleEnabled={true} />);

    // Simulate Monster 1 attacking Monster 2 until Monster 2's HP reaches 0
    const attackButtonMonster1Attack1 = screen.getByText(/Quick Attack/i);
    fireEvent.click(attackButtonMonster1Attack1);
    const attackButtonMonster2Attack1 = screen.getByText(/Scratch/i);
    fireEvent.click(attackButtonMonster2Attack1);
    const attackButtonMonster1Attack2 = screen.getByText(/Tackle/i);
    fireEvent.click(attackButtonMonster1Attack2);
    const attackButtonMonster2Attack2 = screen.getByText(/Bite/i);
    fireEvent.click(attackButtonMonster2Attack2);

    // Verify that attack 1's power points is 0
    expect(screen.getByText(/Pikachu wins!/i)).toBeInTheDocument();
    expect(screen.getByText(/Pikachu used struggle!/i)).toBeInTheDocument();
    expect(screen.getByText(/Pikachu is hurt by recoil!/i)).toBeInTheDocument();
  });
});

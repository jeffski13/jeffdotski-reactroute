import { MonsterType } from '../MonsterType';

export const getTypeColor = (type: MonsterType): string => {
  const typeColors: Record<MonsterType, string> = {
    [MonsterType.Normal]: '#A8A77A',
    [MonsterType.Fire]: '#EE8130',
    [MonsterType.Water]: '#6390F0',
    [MonsterType.Electric]: '#ba9b1e',
    [MonsterType.Grass]: '#7AC74C',
    [MonsterType.Ice]: '#96D9D6',
    [MonsterType.Fighting]: '#C22E28',
    [MonsterType.Poison]: '#A33EA1',
    [MonsterType.Ground]: '#E2BF65',
    [MonsterType.Flying]: '#A98FF3',
    [MonsterType.Psychic]: '#F95587',
    [MonsterType.Bug]: '#A6B91A',
    [MonsterType.Rock]: '#B6A136',
    [MonsterType.Ghost]: '#735797',
    [MonsterType.Dragon]: '#6F35FC',
    [MonsterType.Dark]: '#705746',
    [MonsterType.Steel]: '#B7B7CE',
    [MonsterType.Fairy]: '#D685AD',
  };

  return typeColors[type] || '#000'; // Default to black if type is not found
};
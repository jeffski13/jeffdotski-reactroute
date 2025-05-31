export interface GymLeader {
  name: string;
  image: string;
  environmentImage: string;
}

export const gymLeaders: GymLeader[] = [
  {
    name: "Brock",
    image: "/images/gymleaders/brock.png",
    environmentImage: "/images/gymleaders/rock_gym.jpg",
  },
  {
    name: "Misty",
    image: "/images/gymleaders/misty.png",
    environmentImage: "/images/gymleaders/water_gym.jpg",
  },
];
import type { Route } from "./+types/home";
import JeffSkiPageWithContent from "../Inf/JeffSkiPageWithContent";
import GymLeaderList, { GymLeader } from "../Pokeperu/gym/GymLeaderList";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "PokePeru Gym Leaders" },
    { name: "Pokemon Gym Leaders in Peru", content: "Pokemon Gym Leaders in Peru" },
  ];
}

// Example gym leaders data
const gymLeaders: GymLeader[] = [
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
  // Add more gym leaders as needed
];

const Content = JeffSkiPageWithContent(() => <GymLeaderList gymLeaders={gymLeaders} />);

export default function PokePeruGymLeaders() {
  return <Content />;
}
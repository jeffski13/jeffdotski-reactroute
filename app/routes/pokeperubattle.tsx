import type { Route } from "./+types/home";
import JeffSkiPageWithContent from "../Inf/JeffSkiPageWithContent"
import PokePeru from "../Pokeperu";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "PokePeru" },
    { name: "Pokemon in Peru", content: "Pokebattle in Peru" },
  ];
}

const Content = JeffSkiPageWithContent(PokePeru);
export default function PokePeruBattle() {
  return <Content />;
}

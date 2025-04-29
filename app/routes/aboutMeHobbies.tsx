import type { Route } from "./+types/home";
import JeffDotSkiPage from "../Inf/JeffDotSkiPage"
import Hobbies from "../AboutMe/Hobbies";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Hobbies" },
    { name: "Hobbies Web Page", content: "The hobbies of Jeff Szcinski" },
  ];
}

const Content = JeffDotSkiPage(Hobbies);
export default function AboutMeHobbies() {
  return <Content />;
}

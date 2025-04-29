import type { Route } from "./+types/home";
import JeffDotSkiPage from "../Inf/JeffDotSkiPage"
import TitlePage from "../TitlePage";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Jeff Szcinski" },
    { name: "Home Page", content: "Jeff Szcinski Personal Website" },
  ];
}

const Content = JeffDotSkiPage(TitlePage);
export default function JeffskiHome() {
  return <Content />;
}

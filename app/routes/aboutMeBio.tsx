import type { Route } from "./+types/home";
import Bio from "../AboutMe/Bio";
import JeffDotSkiPage from "../Inf/JeffDotSkiPage"

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Bio" },
    { name: "Bio Web Page", content: "The story of Jeff Szcinski" },
  ];
}

const Content = JeffDotSkiPage(Bio);
export default function AboutMeBio() {
  return (
    <>
     <Content />
    </>
  );
}

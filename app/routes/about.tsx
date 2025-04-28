import type { Route } from "./+types/home";
import { AboutskiComp } from "../about/aboutski";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Abouttitleski" },
    { name: "descriptionski", content: "about the route!" },
  ];
}

export default function AboutTsxski() {
  return <AboutskiComp />;
}

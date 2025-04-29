import type { Route } from "./+types/home";
import { AboutskiComp } from "../about/aboutski";
import JeffDotSkiPage from "../Inf/JeffDotSkiPage"

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Abouttitleski" },
    { name: "descriptionski", content: "about the route!" },
  ];
}

const Content = JeffDotSkiPage(AboutskiComp);
export default function AboutTsxski() {
  return (
    <>
    <div>about</div>
     <Content />
    </>
  );
}

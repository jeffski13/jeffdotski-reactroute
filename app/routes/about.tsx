import type { Route } from "./+types/home";
import { AboutskiComp } from "../about/aboutski";
import NavigationBar from "../Inf/NavigationBar";
import FooterBarski from "../Inf/FooterBarski";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Abouttitleski" },
    { name: "descriptionski", content: "about the route!" },
  ];
}

export default function AboutTsxski() {
  return (
    <div id="App" >
      <NavigationBar />
      <div className="webpagecontent">
        <AboutskiComp />
      </div>
      <FooterBarski />
    </div>
  );
}

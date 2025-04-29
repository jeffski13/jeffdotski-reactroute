import TitlePage from "../TitlePage";
import NavigationBar from "../Inf/NavigationBar";
import FooterBarski from "../Inf/FooterBarski";

export default function JeffskiHome() {
  return (
    <div id="App" >
        <NavigationBar />
        <div className="webpagecontent">
          <TitlePage />
        </div>
        <FooterBarski />
    </div>
  )
};

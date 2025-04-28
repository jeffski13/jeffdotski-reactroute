import type { Route } from "./+types/home";
import TitlePage from "../TitlePage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function JeffskiHome() {

  // return(
  //   <div>JeffskiHome</div> 
  // );
  return(
    <TitlePage/>
  )
};

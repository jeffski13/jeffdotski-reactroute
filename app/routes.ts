import { type RouteConfig, index, route } from "@react-router/dev/routes";
import ROUTES from './consts/ROUTES';

export default [
    index("routes/jeffskihome.tsx"),
    route(ROUTES.aboutMe.bio, "routes/aboutMeBio.tsx"),
    route(ROUTES.aboutMe.hobbies, "routes/aboutMeHobbies.tsx"),
    route(ROUTES.pokePeru.battle, "routes/pokeperubattle.tsx"),
] satisfies RouteConfig;
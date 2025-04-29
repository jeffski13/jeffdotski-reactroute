import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/jeffskihome.tsx"),
    route("aboutme/bio", "routes/aboutMeBio.tsx"),
    route("aboutme/hobbies", "routes/aboutMeHobbies.tsx"),
] satisfies RouteConfig;
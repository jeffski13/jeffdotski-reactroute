import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/jeffskihome.tsx"),
    route("about", "routes/about.tsx"),
] satisfies RouteConfig;
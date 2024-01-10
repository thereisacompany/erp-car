import store from "@/state/store";

export default [
    { path: "/", name: "default", meta: { authRequired: false, }, component: require("./views/car/carhome").default },
    { path: "/home", name: "home", meta: { authRequired: false, }, component: require("./views/car/carhome").default },

    { path: "/profile", name: "carprofile", meta: { authRequired: false, }, component: require("./views/car/carprofile").default },
    { path: "/qrcode", name: "carqrcode", meta: { authRequired: false, }, component: require("./views/car/carqrcode").default },
    { path: "/deliverdetail", name: "cardeliverdetail", meta: { authRequired: false, }, component: require("./views/car/cardeliverdetail").default },

    { path: "/success", name: "carsuccess", meta: { authRequired: false, }, component: require("./views/car/carsuccess").default },

    {
        path: "/login",
        name: "login",
        meta: {
            beforeResolve(routeTo, routeFrom, next) {
                // If the user is already logged in
                if (store.getters["auth/loggedIn"]) {
                    next({ name: "default" });
                } else {
                    next();
                }
            },
        },
        component: require("./views/car/carlogin").default
    },

    {
        path: "/404",
        name: "404",
        component: require("./views/utility/404").default,
    },

];
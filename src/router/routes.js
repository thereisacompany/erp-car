import store from "@/state/store";

export default [
    { path: "/", name: "default", meta: { authRequired: false, }, component: require("./views/car/carhome").default },
    { path: "/home", name: "home", meta: { authRequired: false, }, component: require("./views/car/carhome").default },

    { path: "/profile", name: "carprofile", meta: { authRequired: false, }, component: require("./views/car/carprofile").default },
    { path: "/qrcode", name: "carqrcode", meta: { authRequired: false, }, component: require("./views/car/carqrcode").default },
    { path: "/deliverdetail", name: "cardeliverdetail", meta: { authRequired: false, }, component: require("./views/car/cardeliverdetail").default },

    { path: "/success", name: "carsuccess", meta: { authRequired: false, }, component: require("./views/car/carsuccess").default },


    {
        path: "/jaytest",
        name: "jaytest",
        meta: {
            authRequired: true,
        },
        component: require("./views/dashboards/jaytest").default,
    },
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
        path: "/register",
        name: "Register",
        component: () =>
            import ("./views/account/register"),
        meta: {

            beforeResolve(routeTo, routeFrom, next) {
                // If the user is already logged in
                if (store.getters["auth/loggedIn"]) {
                    // Redirect to the home page instead
                    next({ name: "default" });
                } else {
                    // Continue to the login page
                    next();
                }
            },
        },
    },
    {
        path: "/forgot-password",
        name: "Forgot password",
        component: () =>
            import ("./views/account/forgot-password"),
        meta: {
            beforeResolve(routeTo, routeFrom, next) {
                // If the user is already logged in
                if (store.getters["auth/loggedIn"]) {
                    // Redirect to the home page instead
                    next({ name: "default" });
                } else {
                    // Continue to the login page
                    next();
                }
            },
        },
    },
    {
        path: "/logout",
        name: "logout",
        component: () =>
            import ("./views/account/logout"),
        meta: {
            authRequired: true,
            beforeResolve(routeTo, routeFrom, next) {
                if (process.env.VUE_APP_DEFAULT_AUTH === "firebase") {
                    store.dispatch("auth/logOut");
                } else {
                    store.dispatch("authfack/logout");
                }
                const authRequiredOnPreviousRoute = routeFrom.matched.some((route) =>
                    route.push("/login")
                );
                // Navigate back to previous page, or home as a fallback
                next(
                    authRequiredOnPreviousRoute ? { name: "default" } : {...routeFrom }
                );
            },
        },
    },
    {
        path: "/404",
        name: "404",
        component: require("./views/utility/404").default,
    },

];
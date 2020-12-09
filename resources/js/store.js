import { getLocalUser } from "./helpers/auth";

const user = getLocalUser();

export default {
    state: {
        currentUser: user,
        isLoggedIn: !!user,
        loading: false,
    },
    getters: {
        isLoading(state) {
            return state.loading;
        },
        isLoggedIn(state) {
            return state.isLoggedIn;
        },
        currentUser(state) {
            return state.currentUser;
        },
    },
    mutations: {
        login(state) {
            state.loading = true;
        },
        loginSuccess(state, payload) {
            state.isLoggedIn = true;
            state.loading = false;
            state.currentUser = Object.assign({}, payload.user, {token: payload.access_token});
            localStorage.setItem("user", JSON.stringify(state.currentUser));
        },
        loginFailed(state, payload) {
            state.loading = false;
        },
        logout(state) {
            localStorage.removeItem("user");
            state.isLoggedIn = false;
            state.currentUser = null;
        }
    },
    actions: {
        login(context) {
            context.commit("login");
        },
    }
};
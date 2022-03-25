<template>
  <LoginView v-if="view === views.login" @onLogin="handleLogin" />
  <MainView
    v-if="view === views.main"
    :username="this.username"
    @onLogout="handleLogout"
  />
  <FooterComponent />
</template>

<script>
import LoginView from "./views/LoginView.vue";
import MainView from "./views/MainView.vue";
import FooterComponent from "./components/FooterComponent.vue";

export default {
  components: {
    LoginView,
    MainView,
    FooterComponent,
  },
  data() {
    return {
      views: {
        login: "login",
        main: "main",
      },
      view: "login",
      username: "admin",
    };
  },
  methods: {
    redirectView(view) {
      this.view = view;
    },
    handleLogin(username) {
      this.redirectView(this.views.main);
      this.username = username;
    },
    handleLogout() {
      this.redirectView(this.views.login);
      this.username = "admin";
    },
  },
};
</script>

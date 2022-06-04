<template>
  <v-app>
    <v-app-bar app class="yellow lighten-1" dark>
      <v-btn color="deep-purple darken-4" class="mr-2" to="/">
        <span>Home</span>
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn color="deep-purple darken-4" to="/crud" v-if="user">
        <span class="mr-2">Lista APP</span>
        <v-icon>mdi-clipboard-list-outline</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        color="deep-purple darken-1"
        class="mr-2"
        to="/register"
        v-if="!user"
      >
        <span class="mr-2">Registrarte</span>
        <v-icon>mdi-account-plus</v-icon>
      </v-btn>
      <v-btn color="deep-purple darken-1" class="mr-2" to="/login" v-if="!user">
        <span class="mr-2">Iniciar Sesión</span>
        <v-icon>mdi-login-variant</v-icon>
      </v-btn>
      <v-btn color="deep-purple darken-1" @click="cerrarSesion" v-if="user">
        <span class="mr-2">Cerrar Sesion</span>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";

export default {
  name: "App",

  data: () => ({
    user: null,
  }),
  created() {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      this.user = user;
    });
  },
  methods: {
    async cerrarSesion() {
      await signOut(auth);
      this.$router.push("/login")
    },
  },
};
</script>

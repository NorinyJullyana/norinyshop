<!-- App.vue -->
<template>
  <v-app>
    <v-app-bar app color="#313030">
      <v-spacer></v-spacer>
      <router-link to="/">
        <v-btn text class="menu">Página Inicial</v-btn>
      </router-link>

      <router-link to="/cliente-cadastro">
        <v-btn text class="menu">Cadastrar Cliente</v-btn>
      </router-link>

      <router-link to="/produto-cadastro">
        <v-btn text class="menu">Cadastrar Produto</v-btn>
      </router-link>
    </v-app-bar>

    <v-main>
      <router-view class="router"></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {},
};
</script>

<style scoped>
.router {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}
.menu{
  color:#ff75b7;
    font-size: 18px; /* Ajuste o tamanho da fonte conforme necessário */
  font-weight: bold;
}
</style>

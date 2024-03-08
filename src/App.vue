<template>
  <v-app>

    <v-app-bar app color="#313030">
      
      <v-spacer></v-spacer>

      <v-btn v-if="!isMobile" text class="menu" to="/">Página Inicial</v-btn>
      <v-btn v-if="!isMobile" text class="menu" to="/cliente-cadastro">Cadastrar Cliente</v-btn>
      <v-btn v-if="!isMobile" text class="menu" to="/produto-cadastro">Cadastrar Produto</v-btn>
      <v-btn v-if="!isMobile" text class="menu" to="/associar-produtos-cliente">Associar Produtos ao Cliente</v-btn>
    </v-app-bar>

    <v-main>
      <router-view class="router"></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      drawer: false,
    };
  },
  computed: {
    isMobile() {

      return window.innerWidth <= 600;
    },
  },
};
</script>

<style scoped>
.router {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}
.menu {
  color: #ff75b7;
  font-size: 18px;
  font-weight: bold;
}
</style>

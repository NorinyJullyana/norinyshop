<template>
  <div>
    <v-container>
      <h1 class="titulo">Cadastro de Produto</h1>

      <v-form>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="nome" label="Nome do Produto"></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-checkbox v-model="ativo" label="Ativo"></v-checkbox>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-btn @click="submitForm" color="#ff75b7">Salvar</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'ProdutoCadastro',
  data() {
    return {
      nome: '',
      ativo: false,
    };
  },
  methods: {
    submitForm() {
      console.log('Nome:', this.nome);
      console.log('Ativo:', this.ativo);
    },
  },
};
</script>

<style scoped>
.titulo {
  font-weight: 700;
}
</style>

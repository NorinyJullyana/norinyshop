<template>
  <div>
    <v-container>
      <h1 class="titulo">Cadastro de Produto</h1>

      <v-form @submit.prevent="submitForm">
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="nome" label="Nome do Produto" required></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-checkbox v-model="ativo" label="Ativo"></v-checkbox>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-btn type="submit" color="#ff75b7">Salvar</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';

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
      axios.post('http://localhost:3000/api/produtos', {
        nome: this.nome,
        ativo: this.ativo,
      })
      .then(response => {
        console.log('Produto salvo:', response.data);

        this.nome = '';
        this.ativo = false;
      })
      .catch(error => {
        console.error('Erro ao salvar o produto:', error);
      });
    },
  },
};
</script>

<style scoped>
.titulo {
  font-weight: 700;
}
</style>

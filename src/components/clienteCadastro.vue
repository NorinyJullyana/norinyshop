<template>
  <div>
    <v-container>
      <h1 class="titulo">Cadastro Cliente</h1>

      <v-form @submit.prevent="salvarCliente">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="cliente.nome" label="Nome" required></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="cliente.documento" label="Documento"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="cliente.telefone" label="Telefone"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="cliente.email" label="E-mail" type="email"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-checkbox v-model="cliente.ativo" label="Ativo" append-icon="check"></v-checkbox>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
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
  name: 'ClienteCadastro',
  data() {
    return {
      cliente: {
        nome: '',
        documento: '',
        telefone: '',
        email: '',
        ativo: false,
      },
    };
  },
  methods: {
    salvarCliente() {
      axios.post('http://localhost:3000/api/clientes', this.cliente)
        .then(response => {
          console.log('Cliente salvo:', response.data);

        })
        .catch(error => {
          console.error('Erro ao salvar o cliente:', error);

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

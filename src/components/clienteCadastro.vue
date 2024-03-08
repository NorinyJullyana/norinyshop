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
            <v-btn type="submit" color="#ff75b7">
              {{ clienteAtual ? 'Editar' : 'Salvar' }}
            </v-btn>
          </v-col>
        </v-row>
      </v-form>

      <h2 class="subtitulo">Lista de Clientes Cadastrados</h2>
      <v-row>
        <v-col v-for="cliente in clientes" :key="cliente.id" cols="12" md="4">
          <v-card>
            <v-card-title>{{ cliente.nome }}</v-card-title>
            <v-card-subtitle>Documento: {{ cliente.documento }}</v-card-subtitle>
            <v-card-subtitle>Telefone: {{ cliente.telefone }}</v-card-subtitle>
            <v-card-subtitle>E-mail: {{ cliente.email }}</v-card-subtitle>
            <v-card-subtitle>Ativo: {{ cliente.ativo ? 'Sim' : 'Não' }}</v-card-subtitle>
            <v-btn @click="editarClienteModoLista(cliente)" color="#ff75b7">Editar</v-btn>
          </v-card>
        </v-col>
      </v-row>
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
        produtos: [{}],
      },
      clientes: [],
      clienteAtual: null,
    };
  },
  methods: {
    salvarCliente() {
      if (this.clienteAtual) {
        this.editarCliente();
      } else {
        axios.post('http://localhost:3000/api/clientes', this.cliente)
          .then(response => {
            console.log('Cliente salvo:', response.data);
            this.cliente = {
              nome: '',
              documento: '',
              telefone: '',
              email: '',
              ativo: false,
              produtos: [{}],
            };
            this.carregarClientes();
          })
          .catch(error => {
            console.error('Erro ao salvar o cliente:', error);
          });
      }
    },
    editarCliente() {

      if (this.clienteAtual) {
        axios.put(`http://localhost:3000/api/clientes/${this.clienteAtual.id}`, this.cliente)
          .then(response => {
            console.log('Cliente editado:', response.data);
            this.cliente = {
              nome: '',
              documento: '',
              telefone: '',
              email: '',
              ativo: false,
              produtos: [{}],
            };
            this.clienteAtual = null;
            this.carregarClientes();
          })
          .catch(error => {
            console.error('Erro ao editar o cliente:', error);
          });
      }
    },
    editarClienteModoLista(cliente) {
      this.clienteAtual = cliente;
      this.cliente = { ...cliente };
    },
    carregarClientes() {
      axios.get('http://localhost:3000/api/clientes')
        .then(response => {
          this.clientes = response.data;
        })
        .catch(error => {
          console.error('Erro ao carregar clientes:', error);
        });
    },
  },
  mounted() {
    this.carregarClientes();
  },
};
</script>

<style scoped>
.titulo {
  font-weight: 700;
}

.subtitulo {
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>

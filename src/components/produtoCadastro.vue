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
            <v-btn type="submit" color="#ff75b7">
              {{ produtoAtual ? 'Editar' : 'Salvar' }}
            </v-btn>
          </v-col>
        </v-row>
      </v-form>

   
      <h2 class="subtitulo">Lista de Produtos Cadastrados</h2>
      <v-row>
        <v-col v-for="produto in produtos" :key="produto.id" cols="12" md="4">
          <v-card>
            <v-card-title>{{ produto.nome }}</v-card-title>
            <v-card-subtitle>Ativo: {{ produto.ativo ? 'Sim' : 'Não' }}</v-card-subtitle>
            <v-btn @click="editarProdutoLista(produto)" color="#ff75b7">Editar</v-btn>
          </v-card>
        </v-col>
      </v-row>
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
      produtos: [],
      produtoAtual: null,
    };
  },
  methods: {
    submitForm() {
      if (this.produtoAtual) {
        this.editarProduto();
      } else {
        axios.post('http://localhost:3000/api/produtos', {
          nome: this.nome,
          ativo: this.ativo,
        })
          .then(response => {
            console.log('Produto salvo:', response.data);
            this.nome = '';
            this.ativo = false;
            this.carregarProdutos();
          })
          .catch(error => {
            console.error('Erro ao salvar o produto:', error);
          });
      }
    },
    editarProduto() {
      if (this.produtoAtual) {
        axios.put(`http://localhost:3000/api/produtos/${this.produtoAtual.id}`, {
          nome: this.nome,
          ativo: this.ativo,
        })
          .then(response => {
            console.log('Produto editado:', response.data);
            this.nome = '';
            this.ativo = false;
            this.produtoAtual = null;
            this.carregarProdutos();
          })
          .catch(error => {
            console.error('Erro ao editar o produto:', error);
          });
      }
    },
    editarProdutoLista(produto) {
      this.produtoAtual = produto;
      this.nome = produto.nome;
      this.ativo = produto.ativo;
    },
    carregarProdutos() {
      axios.get('http://localhost:3000/api/produtos')
        .then(response => {
          this.produtos = response.data;
        })
        .catch(error => {
          console.error('Erro ao carregar produtos:', error);
        });
    },
  },
  mounted() {
    this.carregarProdutos();
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

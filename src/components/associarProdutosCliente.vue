<template>
  <v-container class="container">
    <div>
      <h1 class="titulo">Associar Produtos ao Cliente</h1>
    </div>
    <br />
    <v-alert v-if="erro" type="error" dismissible class="mt-5">
      {{ erro }}
    </v-alert>

    <v-row>
      <v-col v-for="cliente in clientesAtivos" :key="cliente.id" cols="12" md="4">
        <v-card>
          <v-card-title>{{ cliente.nome }}</v-card-title>
          <v-card-subtitle>Produtos Adicionados:</v-card-subtitle>
          <template v-if="cliente.produtosSelecionados && cliente.produtosSelecionados.length > 0">
            <v-chip class="produto" v-for="produtoId in cliente.produtosSelecionados" :key="`produto-${produtoId}`" label color="#ff75b7">
              {{ nomeProdutoAssociado(produtoId) }}
            </v-chip>
          </template>
          <template v-else>
            <p class="produto">Nenhum produto associado</p>
          </template>
          <v-row>
            <v-col cols="12">
              <v-btn @click="toggleAssociarProdutos(cliente)" color="#ff75b7">
                {{ cliente.associandoProdutos ? 'Cancelar Associação' : 'Associar/Desassociar Produtos' }}
              </v-btn>
            </v-col>
          </v-row>

          <v-row v-if="cliente.associandoProdutos">
            <v-col cols="12">
              <h2>Produtos Disponíveis:</h2>
              <v-card v-for="produto in produtosAtivos" :key="produto.id">
                <v-checkbox v-model="cliente.produtosSelecionados" :label="produto.nome" :value="produto.id" :key="`checkbox-${cliente.id}-${produto.id}`" @change="atualizarProdutosSelecionados(cliente)"></v-checkbox>
              </v-card>
              <v-btn @click="confirmarAssociacao(cliente)" color="#ff75b7">Confirmar</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AssociacaoClienteProduto',
  data() {
    return {
      clientes: [],
      produtos: [],
      erro: null,
    };
  },
  computed: {
    clientesAtivos() {
      return this.clientes.filter((cliente) => cliente.ativo);
    },
    produtosAtivos() {
      return this.produtos.filter((produto) => produto.ativo);
    },
  },
  mounted() {
    this.carregarClientes();
    this.carregarProdutos();
  },
  methods: {
    carregarClientes() {
      axios.get('http://localhost:3000/api/clientes')
        .then((response) => {
          this.clientes = response.data.map((cliente) => {
            const localStorageKey = `produtosSelecionados_${cliente.id}`;
            const produtosSelecionadosLocalStorage = localStorage.getItem(localStorageKey);
            const produtosSelecionados = produtosSelecionadosLocalStorage ? JSON.parse(produtosSelecionadosLocalStorage) : [];

            if (!produtosSelecionados || produtosSelecionados.length === 0) {
              cliente.produtosSelecionados = cliente.produtos ? cliente.produtos.map((p) => p.id.toString()) : [];
            } else {
              cliente.produtosSelecionados = produtosSelecionados;
            }

            this.salvarLocalStorage(cliente);

            return {
              ...cliente,
              associandoProdutos: false,
            };
          });
        })
        .catch((error) => {
          console.error('Erro ao carregar clientes:', error);
          this.erro = 'Erro ao carregar clientes.';
        });
    },

    carregarProdutos() {
      axios.get('http://localhost:3000/api/produtos')
        .then((response) => {
          this.produtos = response.data;
        })
        .catch((error) => {
          console.error('Erro ao carregar produtos:', error);
          this.erro = 'Erro ao carregar produtos.';
        });
    },

    toggleAssociarProdutos(cliente) {
      cliente.associandoProdutos = !cliente.associandoProdutos;
    },

    confirmarAssociacao(cliente) {
      const urlProdutosCliente = `http://localhost:3000/api/clientes/${cliente.id}/produtos`;

      axios.put(urlProdutosCliente, {
        produtosIds: cliente.produtosSelecionados.map(Number),
      })
        .then((response) => {
          console.log('Dados atualizados na API:', response.data);
          cliente.produtos = response.data.produtos;
          cliente.associandoProdutos = false;
          this.erro = null;
        })
        .catch((error) => {
          console.error('Erro ao enviar dados para a API:', error);
          this.erro = 'Erro ao enviar dados para a API.';
        });
    },

    nomeProdutoAssociado(produtoId) {
      const produtoAssociado = this.produtos.find(produto => produto.id.toString() === produtoId.toString());
      return produtoAssociado ? produtoAssociado.nome : 'Produto não encontrado';
    },

    marcarProdutosAssociados(produtosSelecionados) {
      produtosSelecionados.forEach((produtoId) => {
        const produto = this.produtos.find((p) => p.id.toString() === produtoId.toString());
        if (produto) {
          this.$set(produto, 'selecionado', true);
        }
      });
    },

    atualizarProdutosSelecionados(cliente) {
      cliente.produtosSelecionados = this.produtosAtivos
        .filter(produto => cliente.produtosSelecionados.includes(produto.id))
        .map(produto => produto.id);

      this.salvarLocalStorage(cliente);
    },

    salvarLocalStorage(cliente) {
      localStorage.setItem(`produtosSelecionados_${cliente.id}`, JSON.stringify(cliente.produtosSelecionados));
    },
  },
};
</script>

<style scoped>
.titulo {
  font-weight: 700;
  margin-bottom: 20px;
}

.v-alert {
  margin-bottom: 20px;
}

.v-card {
  margin-bottom: 20px;
}

.v-btn {
  margin-top: 10px;
}

.container {
  flex-direction: column;
}

.produto {
  margin-left: 16px;
}
</style>

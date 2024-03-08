<template>
  <div >
    <div class="projeto-info">
      <h1 class="titulo">Bem-vindo ao Sistema de Cadastro de Clientes e Associação de Produtos</h1>
      <h2>Objetivo do Projeto:</h2>
      <p>
        Construir um sistema de cadastro de clientes e associação de produtos oferecidos aos mesmos.
      </p>
      
      <h2>Telas do Sistema:</h2>
      <ul>
        <li>Tela de Cadastro de Produtos com os campos (nome, ativo [Sim ou Não]).</li>
        <li>Tela de Cadastro de Clientes com os campos (nome, documento, telefone, e-mail, ativo [Sim ou Não]).</li>
        <li>Tela para Associar Produtos ao Cliente, exibindo o nome do cliente e os produtos disponíveis para associação.</li>
      </ul>
      
      <h2>Finalidade:</h2>
      <p>
        Disponibilizar para a área comercial um cadastro de clientes e uma forma de associar os produtos que cada cliente tem disponível para utilizar na plataforma.
      </p>
      
      <h2>Listagens:</h2>
      <ul>
        <li>Listagem de produtos cadastrados com opções para editar, inativar/ativar.</li>
        <li>Listagem de todos os clientes com opções de edição, inativar/ativar e associar produtos.</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home-page',
}
</script>

<style scoped>
.titulo {
  font-weight: 700;
}

.projeto-info {
  margin-top: 20px;
}

.projeto-info h2 {
  margin-bottom: 10px;
}

.projeto-info p {
  margin-bottom: 15px;
}
</style>

.container {
  flex-direction: column;
}
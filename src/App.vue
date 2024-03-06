<template>
  <router-view class="router"></router-view>
</template>

<script>
export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
.router{
  display: flex;
  justify-content: center;
}

body{
  background-color: #222;
  color: #fff;
  font-family: Roboto,sans-serif;
}

</style>

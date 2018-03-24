<template>
  <div id="app">
    <v-app>
      <Game />
    </v-app>
  </div>
</template>

<script>
import Game from './components/Game.vue'

export default {
  name: 'app',
  components: {
    Game
  }
}
</script>

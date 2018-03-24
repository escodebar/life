<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-card
        class="canvas elevation-12"
        color="secondary"
      >
        <v-card-text>
          <canvas
            :height="height * pixelSize"
            :width="width * pixelSize">
          </canvas>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            @click="clear()"
            color="accent"
            fab
            small
          >
            <v-icon color="secondary">delete</v-icon>
          </v-btn>
          <v-btn
            @click="play()"
            color="accent"
            fab
            v-if="interval === null"
          >
            <v-icon color="secondary">play_arrow</v-icon>
          </v-btn>
          <v-btn
            @click="pause()"
            color="accent"
            fab
            v-else
          >
            <v-icon color="secondary">pause</v-icon>
          </v-btn>
          <v-btn
            @click="replay()"
            color="accent"
            dark
            fab
            small
          >
            <v-icon color="secondary">replay</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
        <v-btn
          color="secondary"
          dark
          fab
          small
          fixed
          right
          bottom
          href="https://github.com/escodebar/life"
        >
          <v-icon color="accent">code</v-icon>
        </v-btn>
      </v-card>
    </v-layout>
  </v-container>
</template>
<script>
import colors from 'vuetify/es5/util/colors'
export default {
  name: 'Game',
  mounted () {
    this.clear()
  },
  methods: {
    clear () {
      if (this.interval !== null) {
        this.pause()
      }
      let state = ''
      while (state.length !== this.height * this.width) {
        state += Math.floor(Math.random() * 2).toString()
      }
      this.initial = state
      this.state = state
      this.draw()
    },
    draw () {
      let context = this.$el.querySelector('canvas').getContext('2d')
      let counter = 0
      context.clearRect(0, 0, this.width * this.pixelSize, this.height * this.pixelSize)
      context.fillStyle = this.color
      while (this.state !== 0 && counter < this.width * this.height) {
        let x = counter % this.width
        let y = Math.floor(counter / this.width)
        if (this.state[counter] === '1') {
          context.fillRect(
            x * this.pixelSize,
            y * this.pixelSize,
            this.pixelSize,
            this.pixelSize)
        }
        counter++
      }
    },
    neighbors (position) {
      let n = position - this.width
      if (n < 0) {
        n = n + this.height * this.width
      }
      let ne = n + 1
      if (ne % this.width === 0) {
        ne = ne - this.width
      }
      let nw = n - 1
      if (nw < 0 ||
          nw % this.width === this.width - 1) {
        nw = nw + this.width
      }
      let e = position + 1
      if (e % this.width === 0) {
        e = e - this.width
      }
      let w = position - 1
      if (w < 0 ||
          w % this.width === this.width - 1) {
        w = w + this.width
      }
      let s = position + this.width
      if (s > this.width * this.height) {
        s = s - this.width * this.height
      }
      let se = s + 1
      if (se % this.width === 0) {
        se = se - this.width
      }
      let sw = s - 1
      if (sw < 0 ||
          sw % this.width === this.width - 1) {
        sw = sw + this.width
      }
      return [n, ne, e, se, s, sw, w, nw]
    },
    nextState (state) {
      let counter = 0
      let newState = ''
      while (counter < this.width * this.height) {
        let livingNeighbors = this.neighbors(counter).reduce(
          (alive, neighborsPosition) => alive + parseInt(state[neighborsPosition]),
          0)
        if (state[counter] === '1' && (livingNeighbors === 2 || livingNeighbors === 3)) {
          newState += '1'
        } else if (state[counter] === '0' && livingNeighbors === 3) {
          newState += '1'
        } else {
          newState += '0'
        }
        counter++
      }
      return newState
    },
    pause () {
      clearInterval(this.interval)
      this.interval = null
    },
    play () {
      // draw the field and compute the next state
      this.interval = setInterval(() => {
        this.draw()
        this.state = this.nextState(this.state)
        this.counter++
      }, this.intervalLength)
    },
    replay () {
      this.state = this.initial
      this.draw()
    }
  },
  data: function () {
    let pixelSize = 4
    let side = Math.min(
      window.innerWidth,
      window.innerHeight)

    let height = Math.min(Math.floor((side - 100) / pixelSize), 175)
    let width = Math.min(Math.floor((side - 100) / pixelSize), 175)

    let state = '0'.repeat(height * width)
    return {
      counter: 0,
      color: colors.yellow.base,
      height: height,
      initial: state,
      intervalLength: 100,
      interval: null,
      pixelSize: pixelSize,
      state: state,
      width: width
    }
  }
}
</script>
<style>
</style>

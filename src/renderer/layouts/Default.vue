<template>
  <div class="layout-content" :style="{ 'background-color': config.pageBgColor, 'color': config.pageFontColor }">
    <div class="columns is-gapless">
      <div class="column is-multiline featured-column">
        <header class="column">
          <featured :message="lastMessage" v-if="lastMessage" @blink="playAudio" :fontColor="config.pageFontColor"></featured>
        </header>
        <footer class="column" :style="{ 'background-color': config.footerBgColor, 'color': config.footerFontColor }">
          <img src="static/images/ifto2019.png">
        </footer>
      </div>
      <div class="column is-one-quarter history-column" :style="{ 'background-color': config.sidebarBgColor, 'color': config.sidebarFontColor }">
        <header>
          <h2 class="title" :style="{ 'color': config.sidebarFontColor }">
            {{ 'history.title'|trans }}
          </h2>
          <history :messages="messages" v-if="lastMessage" :fontColor="config.sidebarFontColor"></history>
        </header>
        <footer :style="{ 'background-color': config.clockBgColor, 'color': config.clockFontColor }">
          <clock :locale="config.locale" :dateFormat="'date_format'|trans" :fontColor="config.clockFontColor"></clock>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
  import Clock from '@/components/default/Clock.vue'
  import Featured from '@/components/default/Featured.vue'
  import History from '@/components/default/History.vue'
  import audio from '@/services/audio'

  export default {
    name: 'Default',
    components: {
      Clock,
      Featured,
      History
    },
    computed: {
      messages () {
        return this.$store.getters.history
      },
      lastMessage () {
        return this.$store.getters.message
      },
      config () {
        return this.$store.state.config
      }
    },
    methods: {
      playAudio () {
        audio.playAlert(this.config.alert)
      }
    }
  }
</script>

<style lang="sass">
  .layout-content
    position: fixed
    width: 100%
    height: 100%
    .columns
      height: 100%

  .clock
    .time
      span
        font-size: 4vw
      span.hours
        font-weight: bold
      span.seconds
        font-style: italic
    .date
      text-align: center
      span
        font-size: 2vw
        font-weight: bold

  .featured-column
      header
        height: 80vh
      footer
        height: 20vh
        padding: 5vh
        img
          height: 18vh
      .featured-message
        text-align: center
        .title
          font-size: 30vh
          font-weight: bold
        .subtitle
          font-size: 10vh
        .description
          font-size: 10vh

  .history-column
    height: 100vh
    header
      height: 80vh
      padding: 1rem 0
    footer
      height: 20vh
      padding: 1rem 0
      text-align: center
      background: rgba(0,0,0,.1)
    *
      color: #2c3e50
    .title
      text-align: center
      font-weight: bold
    .message
      background-color: transparent
      border-left: 8px solid rgba(0,0,0,.3)
      padding-left: 2rem
      margin-bottom: 1rem
    .empty
      p
        font-style: italic
        text-align: center
    .history
      .message
        span
          text-align: left
          display: block
        .title
          font-size: 8vh
          font-weight: bold
        .subtitle
          font-size: 4vh
          font-style: italic
</style>

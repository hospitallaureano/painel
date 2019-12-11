<template>
<div class="grid-container">
		<div class="lcs-datetime">
			<clock :locale="config.locale" :dateFormat="'date_format'|trans" :fontColor="config.clockFontColor"></clock>
		</div>
		<div class="lcs-logo">
			<img src="static/images/ifto.png" style="width:120%;border:0; margin: .5vw" />
		</div>
		<div class="lcs-footer">
			<history :messages="messages" v-if="lastMessage" :fontColor="config.sidebarFontColor"></history>
		</div>
		<div class='lcs-name'>{{config.hostname}}</div>
    <featured :message="lastMessage" v-if="lastMessage" @blink="playAudio" :fontColor="config.pageFontColor"></featured>		
	</div>
</template>

<script>
  import Clock from '@/components/theme02/Clock.vue'
  import Featured from '@/components/theme02/Featured.vue'
  import History from '@/components/theme02/History.vue'
  import audio from '@/services/audio'
  import speak from '@/services/speech'
  import { log } from '@/util/functions'

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
        const lang = this.config.locale || 'pt-BR'
        const pass = ['Senha']
        const talking = pass.concat(this.$store.getters.message.falar)

        speak.speechAll([talking.join(' ')], lang).then(() => {
          log('Testing end')
        }, (e) => {
          log('Testing error', e)
        })
      }
    }
  }
</script>
<style>
		html, body{
			margin: 0px;
			padding: 0px;
			width: 100%;
			heiht: 100%;
      overflow: hidden;
		}

		* {
			margin: 0;
			padding: 0;
			box-sizing: border-box;
		}

		::before,
		::after {
			box-sizing: inherit;
		}

		.grid-container {
			font-family: Arial;
			clear: both;
			position: relative;
			margin: 0px;
  		padding: 0px;
			display: grid;
			width: 100%;
			height: 100%;
			background-color: #848688;
			grid-template-columns: 1fr 1fr 1fr 1fr;
			grid-template-rows: 1.2fr 2.9fr 1.52fr;
			grid-auto-rows: minmax(min-content, max-content);
			grid-template-areas: "lcs-logo . . lcs-datetime" "lcs-main lcs-main lcs-main lcs-main" "lcs-footer lcs-footer lcs-footer lcs-footer";
		}

		.lcs-datetime { 
			grid-area: lcs-datetime;
		}

		.lcs-logo { 
			grid-area: lcs-logo; 
		}

		.lcs-name{
			text-align: center;
			font-size: 5vw;
			font-weight: 500;
			color: #bbb;
			margin-top: -1vw;
			position: absolute;
			top: 0px;
			margin-left: 15%;
		}

		.lcs-footer { 
			grid-area: lcs-footer; 
			background-color: #E6E7E8;
			border-top: 1vw solid #BDBFC1;
			padding: 1vw;
		}

		.lcs-main { 
			grid-area: lcs-main; 
			padding: 1vw;
			background-color: #E6E7E8;
		}

		.lcs-main .lcs-guide{
			display: inline-block;
			width: 24vw;
			background-color: #D2D3D5;
			text-align: center;
      border-bottom: 1.5vw solid;
		}

		.lcs-main .lcs-call{
			display:  inline-block;
			margin-top: -3vw;
			width: 72vw;
			background-color: #D2D3D5;
			position: absolute;
			margin-left: 1.3vw;
			text-align: center;
		}

		.lcs-guide .lcs-local{
			font-size: 5vw;
			font-weight: 500;
			color: #00660A;
		}

		.lcs-guide .lcs-number{
			font-size: 14vw;
			font-weight: 700;
			color: #00660A;
			line-height: 12vw;
		}

		.lcs-main .lcs-password{
			font-size: 14vw;
			font-weight: 700;
			color: #00660A;
			line-height: 12vw;
		}

		.lcs-main .lcs-type{
			font-size: 7vw;
			font-weight: 500;
			color: red;
			line-height: 7vw;
		}

		.lcs-datetime-date{
			font-weight: 600;
			font-size: 4vw;
			text-align: center;
			line-height: 3vw;
		}
		.lcs-datetime-time{
			font-weight: 700;
			text-align: center;
			line-height: 5vw;
		}

		.lcs-datetime-time span.hour{
			font-size: 6vw;
		}

		.lcs-datetime-time span.separator{
			font-size: 5vw;
		}

		.lcs-datetime-time span.minutes{
			font-size: 5vw;
		}

		.lcs-block{
			display: table-cell;
			height: 9.125vw;
			text-align: center;
		}

		.lcs-password{
			font-size: 300%;
			font-weight: bolder;
			padding-right: 0.1vw;
		}

		.lcs-local-call{
			font-size: 5vw;
			padding-right: 1vw;
		}

		.lcs-local{
			font-size: 2.5vw;
			padding-right: 1vw;
		}

		.lcs-sub-block{
			display: block;
			width: 16.15vw;
			text-align: center;
		}

		.lcs-panel{
			height:  30.364583333333332vw;
		}
	</style>
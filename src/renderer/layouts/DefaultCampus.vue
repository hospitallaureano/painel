<template>
  <div class="lcs-wgs-grid-container">
		<div class="lcs-wgs-footer">
			<history :messages="messages" v-if="lastMessage" :fontColor="config.sidebarFontColor"></history>
		</div>
		<div class="lcs-wgs-datetime">
			<clock :locale="config.locale" :dateFormat="'date_format'|trans" :fontColor="config.clockFontColor"></clock>
		</div>
		<div class="lcs-wgs-header">
			<img src="static/images/ifto2019.png" style="width:45%;border:0;" />
			<div class='lcs-wgs-name'>{{config.hostname}}</div>
		</div>		
    <featured :message="lastMessage" v-if="lastMessage" @blink="playAudio" :fontColor="config.pageFontColor"></featured>
	</div>
</template>

<script>
  import Clock from '@/components/theme01/Clock.vue'
  import Featured from '@/components/theme01/Featured.vue'
  import History from '@/components/theme01/History.vue'
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
			height: 100%;
			overflow: hidden;
		}

		* {
			margin: 0px;
			padding: 0px;
			box-sizing: border-box;
		}

		::before,
		::after {
			box-sizing: inherit;
		}

		.lcs-wgs-grid-container {
			font-family: Arial;
			clear: both;
			position: relative;
			margin: 0px;
      padding: 0px;
			display: grid;
			width: 100%;
			height: 100%;
			background-color: #E6E7E8;
			grid-template-columns: 1fr 1fr 1fr 1fr;
			grid-template-rows: 20vw 21vw 20vw; /* 0.9fr 1.2fr 0.8fr;*/
			grid-auto-rows: auto;
			grid-template-areas: "lcs-wgs-header lcs-wgs-header lcs-wgs-header lcs-wgs-datetime" "lcs-wgs-main lcs-wgs-main lcs-wgs-main lcs-wgs-main" "lcs-wgs-footer lcs-wgs-footer lcs-wgs-footer lcs-wgs-footer";
		}

		.lcs-wgs-footer { 
      grid-area: lcs-wgs-footer;
			margin: 1vw;
		}

		.lcs-wgs-header { 
			grid-area: lcs-wgs-header;
			margin: 1vw;
		}
		
		.lcs-wgs-main { 
      grid-area: lcs-wgs-main; 
			clear: both;
			background-color: #BDBFC1;
			text-align: center;
		}

		.lcs-wgs-main-call{
			display: table-cell;
			width: 75.8vw;
		}

		.lcs-wgs-guide { 
			display: table-cell;
			width: 24vw;
			height: 100%;
			background-color: #A8CF45;
			border-bottom: 1.5vw solid #00660A;
			text-align: center;
		}

		.lcs-wgs-guide .lcs-wgs-local-call{
			font-size: 5vw;
			font-weight: 500;
			color: #00660A;
		}
		.lcs-wgs-guide .lcs-wgs-number{
			font-size: 14vw;
			font-weight: 700;
			color: #00660A;
			line-height: 12vw;
		}
		.lcs-wgs-main .lcs-wgs-password{
			font-size: 14vw;
			font-weight: 700;
			color: #00660A;
			line-height: 12vw;
		}

		.lcs-wgs-main .lcs-wgs-type{
			font-size: 7vw;
			font-weight: 500;
			color: red;
			line-height: 7vw;
		}

		.lcs-wgs-name{
			text-align: center;
			font-size: 5vw;
			font-weight: 500;
			color: #00660A;
			margin-top: -1vw;
			position: absolute;
			top: 0px;
			margin-left: 15%;
		}

		.lcs-wgs-history{
			text-align: right;
			height: 11.8vw;
			padding: 1vw;
		}

		.lcs-wgs-block{
			display: table-cell;
			height: 9.125vw;
			text-align: center;
			padding-right: .4vw;
		}


		.lcs-wgs-password{
			display: block;
			width: 16vw;
			font-weight: bolder;
			font-size: 300%;
			text-align: center;
			color: #00660A;
      line-height: 5vw;
		}

		.lcs-wgs-local{
			display: block;
			width: 16vw;
			font-size: 2.8vw;
			text-align: center;
			padding-right: 1vw;
			color: red;
		}

		.lcs-wgs-sub-block{
			display: block;
			width: 16vw;
			text-align: center;
		}
	</style>
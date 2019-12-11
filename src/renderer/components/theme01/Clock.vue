<template>
	<div>
    <div class='lcs-wgs-datetime-time'>
      <span class='lcs-wgs-hour' v-if="showHours">{{ hours }}</span>
      <span class='lcs-wgs-separator'>h</span>
      <span class='lcs-wgs-minutes' v-if="showMinutes">{{ minutes }}</span>
      <span class='lcs-wgs-separator'>.</span>
      <span class='lcs-wgs-minutes' v-if="showMinutes">{{ seconds }}</span>
    </div>
    <div class='lcs-wgs-datetime-date' v-if="showDate"><span class='date'>{{formattedDate}}</span></div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Clock',
  data () {
    return {
      date: new Date()
    }
  },
  props: {
    showHours: {
      type: Boolean,
      default: true
    },
    showMinutes: {
      type: Boolean,
      default: true
    },
    showSeconds: {
      type: Boolean,
      default: true
    },
    showDate: {
      type: Boolean,
      default: true
    },
    dateFormat: {
      type: String,
      default: 'DD.MM.YYYY'
    },
    locale: {
      type: String,
      default: 'en'
    },
    fontColor: {
      type: String,
      default: '#000000'
    }
  },
  computed: {
    hours () {
      return moment(this.date).format('HH')
    },
    minutes () {
      return moment(this.date).format('mm')
    },
    seconds () {
      return moment(this.date).format('ss')
    },
    formattedDate () {
      return moment(this.date).format('DD.MM.YYYY')
    }
  },
  created () {
    moment.locale(this.locale)
    setInterval(() => { this.date = new Date() }, 1000)
  }
}
</script>
<style>
	

		.lcs-wgs-datetime {
       grid-area: lcs-wgs-datetime;
       color: #00660A;
    }

		.lcs-wgs-datetime-date{
			font-weight: 600;
			font-size: 4vw;
			text-align: center;
		}
		.lcs-wgs-datetime-time{
			font-weight: 700;
			text-align: center;
		}

		.lcs-wgs-datetime-time span.lcs-wgs-hour{
			font-size: 6vw;
		}

		.lcs-wgs-datetime-time span.lcs-wgs-separator{
			font-size: 5vw;
		}

		.lcs-wgs-datetime-time span.lcs-wgs-minutes{
			font-size: 5vw;
		}
	</style>
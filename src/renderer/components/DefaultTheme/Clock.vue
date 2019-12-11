<template>
	<div>
    <div class='lcs-datetime-time'>
      <span class='lcs-hour' v-if="showHours">{{ hours }}</span>
      <span class='lcs-separator'>h</span>
      <span class='lcs-minutes' v-if="showMinutes">{{ minutes }}</span>
      <span class='lcs-separator'>.</span>
      <span class='lcs-minutes' v-if="showMinutes">{{ seconds }}</span>
    </div>
    <!-- <div class='lcs-datetime-date' v-if="showDate"><span class='date'>{{formattedDate}}</span></div> -->
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
	

		.lcs-datetime {
       grid-area: lcs-datetime;
       color: #00660A;
    }

		.lcs-datetime-date{
			font-weight: 600;
			font-size: 4vw;
			text-align: center;
		}
		.lcs-datetime-time{
			font-weight: 700;
			text-align: center;
		}

		.lcs-datetime-time span.lcs-hour{
			font-size: 6vw;
		}

		.lcs-datetime-time span.lcs-separator{
			font-size: 5vw;
		}

		.lcs-datetime-time span.lcs-minutes{
			font-size: 5vw;
		}
	</style>
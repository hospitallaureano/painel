<template>
	<div class='lcs-wgs-history'>
    <div v-for="message in messages" class="lcs-wgs-block" :key="message.id">
        <div class='lcs-wgs-sub-block'>
          <div class='lcs-wgs-password' v-if="showMessageTitle">{{ message.title }}</div>
          <div class='lcs-wgs-local' v-if="showMessageSubtitle">{{ message.subtitle }}</div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'History',
  props: {
    messages: {
      required: true
    },
    fontColor: {
      type: String,
      default: '#000000'
    },
    showMessageTitle: {
      type: Boolean,
      default: true
    },
    showMessageSubtitle: {
      type: Boolean,
      default: true
    },
    showMessageDescription: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<template>
	<div class='lcs-history'>
    <div v-for="message in messages" class="lcs-block" :key="message.id">
        <div class='lcs-sub-block'>
          <div class='lcs-password' v-if="showMessageTitle">{{ message.title }}</div>
          <div class='lcs-local' v-if="showMessageSubtitle">{{ message.subtitle }}</div>
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

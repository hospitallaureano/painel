import storage from '@/services/storage'

const HISTORY_MAX_LENGTH = 7

function equals (m1, m2) {
  return m1.type === m2.type && m1.title === m2.title
}
/*
function saveFile (message) {
  const data = JSON.stringify(message)
  const fs = require('fs')
  try {
    fs.writeFileSync('history.json', data, 'utf-8')
  } catch (e) { }
} */

export default {
  updateConfig (state, config) {
    config = config || {}
    state.config = config
    storage.set('config', config)

    const locale = config.locale || 'en'

    state.dict = require(`../../../static/i18n/${locale}.json`)
  },

  newMessage (state, message) {
    if (state.messages.length) {
      const last = state.messages[0]
      if (last.id === message.id) {
        return
      }

      // prevent multiple messages of same type+title
      for (let i = 0; i < state.messages.length; i++) {
        let m = state.messages[i]
        if (equals(m, message)) {
          state.messages.splice(state.messages.indexOf(m), 1)
          console.log(state.messages)
          /* saveFile(state.message) */
          break
        }
      }
    }

    state.messages.unshift(message)

    if (state.messages.length > HISTORY_MAX_LENGTH) {
      /* Vue.history.push() */
      state.messages.pop()
    }
  }
}

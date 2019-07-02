import Axios from 'axios'
Axios.defaults.xsrfCookieName = 'csrftoken'
Axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'
var URL = 'http://h49680.hostru03.fornex.org/'

var state = {
  message: {},
  messages_chat: []
}

var getters = {
  MESSAGE: state => {
    return state.message
  },
  MESSAGES_CHAT: state => {
    return state.messages_chat
  }
}

var mutations = {
  SET_MESSAGE: (state, payload) => {
    state.message = payload
  },
  SET_MESSAGES_CHAT: (state, payload) => {
    state.messages_chat = payload
  }
}

var actions = {
  GET_MESSAGE: async (context, message) => {
    let {data} = await Axios.get(URL + 'api_v1/messages/' + message.id + '/')
    context.commit('SET_MESSAGE', data)
  },
  GET_MESSAGES_CHAT: async (context, chat) => {
    let {data} = await Axios.get(URL + 'api_v1/filters/messages_chat?chat=' + chat.id)
    context.commit('SET_MESSAGES_CHAT', data)
  },
  POST_MESSAGE: async (context, message) => {
    let {data} = await Axios.post(URL + 'api_v1/messages/', message)
    context.commit('SET_MESSAGE', data)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

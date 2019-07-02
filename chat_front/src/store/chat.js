import Axios from 'axios'
Axios.defaults.xsrfCookieName = 'csrftoken'
Axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'
var URL = 'http://h49680.hostru03.fornex.org/'

var state = {
  chat: {},
  chats: [],
  chats_all: [],
  chats_user: []
}

var getters = {
  CHAT: state => {
    return state.chat
  },
  CHATS: state => {
    return state.chats
  },
  CHATS_ALL: state => {
    return state.chats_all
  },
  CHATS_USER: state => {
    return state.chats_user
  }
}

var mutations = {
  SET_CHAT: (state, payload) => {
    state.chat = payload
  },
  SET_CHATS: (state, payload) => {
    state.chats = payload
  },
  SET_CHATS_ALL: (state, payload) => {
    state.chats_all = payload
  },
  SET_CHATS_USER: (state, payload) => {
    state.chats_user = payload
  }
}

var actions = {
  GET_CHAT: async (context, chat) => {
    let {
      data
    } = await Axios.get(URL + 'api_v1/chats/' + chat.id)
    context.commit('SET_CHAT', data)
  },
  GET_CHAT_NAME: async (context, chat) => {
    let {data} = await Axios.get(URL + 'api_v1/filters/chats?name=' + chat.name)
    context.commit('SET_CHAT', data[0])
  },
  GET_CHATS_USER: async (context, user) => {
    let {
      data
    } = await Axios.get(URL + 'api_v1/filters/chats_user?users=' + user.id)
    context.commit('SET_CHATS_USER', data)
  },
  GET_CHATS_NAME: async (context, chat) => {
    let {
      data
    } = await Axios.get(URL + 'api_v1/filters/chats?name=' + chat.name)
    context.commit('SET_CHATS', data)
  },
  GET_CHATS_ALL: async (context) => {
    let {
      data
    } = await Axios.get(URL + 'api_v1/filters/chats')
    context.commit('SET_CHATS_ALL', data)
  },
  SET_CHATS_ALL: async (context, data) => {
    context.commit('SET_CHATS_ALL', data)
  },
  SET_CHAT: async (context, chat) => {
    context.commit('SET_CHAT', chat)
  },
  SET_CHATS: async (context, chats) => {
    context.commit('SET_CHATS', chats)
  },
  SET_CHATS_USER: async (context, chats) => {
    context.commit('SET_CHATS_USER', chats)
  },
  POST_CHAT: async (context, chat) => {
    let {
      data
    } = await Axios.post(URL + 'api_v1/chats/', chat)
    context.commit('SET_CHAT', data)
  },
  SAVE_CHAT: async (context, chat) => {
    let {
      data
    } = await Axios.put(URL + 'api_v1/chats/' + chat.id + '/', chat)
    context.commit('SET_CHAT', data)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

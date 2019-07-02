import Axios from 'axios'
Axios.defaults.xsrfCookieName = 'csrftoken'
Axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'
var URL = 'http://h49680.hostru03.fornex.org/'

var state = {
  user: {},
  users: [],
  users_chat: []
}
var getters = {
  USER: state => {
    return state.user
  },
  USERS: state => {
    return state.users
  },
  USERS_CHAT: state => {
    return state.users_chat
  }
}
var mutations = {
  SET_USERS: (state, payload) => {
    state.users = payload
  },
  SET_USER: (state, payload) => {
    state.user = payload
  },
  SET_USERS_CHAT: (state, payload) => {
    if (payload === 'RECOVERY') {
      state.users_chat = []
    } else {
      state.users_chat.push(payload)
    }
  }
}
var actions = {
  GET_USERS_CHAT: async (context, chat) => {
    context.commit('SET_CHATS_USER', 'RECOVERY')
    if (Array.isArray(chat.users)) {
      for (var i = 0; i < chat.users.length; i++) {
        let {data} = await Axios.get(URL + 'api_v1/users/' + chat.users[i] + '/')
        context.commit('SET_USERS_CHAT', data)
      }
    }
  },
  GET_USER_LOGIN: async (context, user) => {
    let {data} = await Axios.get(URL + 'api_v1/filters/user_enter?login=' + user.login + '&password=')
    context.commit('SET_USER', data[0])
  },
  GET_USERS: async (context, user) => {
    let {
      data
    } = await Axios.get(URL + 'api_v1/filters/user_enter?login=' + user.login + '&password=' + user.password)
    context.commit('SET_USERS', data)
  },
  GET_USERS_LOGIN: async (context, user) => {
    let {
      data
    } = await Axios.get(URL + 'api_v1/filters/user_enter?login=' + user.login + '&password=')
    context.commit('SET_USERS', data)
  },
  GET_USER: async (context, user) => {
    let {
      data
    } = await Axios.get(URL + 'api_v1/users/', user.id)
    context.commit('SET_USER', data)
  },
  SET_USER: async (context, payload) => {
    context.commit('SET_USER', payload)
  },
  SET_USERS: async (context, payload) => {
    context.commit('SET_USERS', payload)
  },
  POST_USER: async (context, user) => {
    let {
      data
    } = await Axios.post(URL + 'api_v1/users/', user)
    context.commit('SET_USER', data)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter, asyncRoutes, anyRoutes, constantRoutes } from '@/router'
import router from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    routes: [],
    buttons: [],
    roles: [],
    resultAsyncRoutes: [],
    resultAllRoutes: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERINFO: (state, userInfo) => {

    state.name = userInfo.name;
    state.avatar = userInfo.avatar;
    state.routes = userInfo.routes;
    state.buttons = userInfo.buttons;
    state.roles = userInfo.roles;
  },
  SET_RESULTASYNCROUTES: (state,asyncRoutes) => {

    state.resultAsyncRoutes = asyncRoutes;
    state.resultAllRoutes = constantRoutes.concat(state.resultAsyncRoutes, anyRoutes);
    router.addRoutes(state.resultAllRoutes)
  }
}

const computedAsyncRoutes = (asyncRoutes, routes) => {

  // console.log(asyncRoutes, 111);
  // console.log(routes, 222);
  return asyncRoutes.filter(item => {

    if (routes.indexOf(item.name) != -1) {

      if (item.children && item.children.length) {

        item.children = computedAsyncRoutes(item.children, routes);
      }

      return true;
    }
  })
}

const actions = {
  // user login
  async login({ commit }, userInfo) {
    const { username, password } = userInfo

    const result = await login({ username: username.trim(), password: password })

    // console.log(result)
    if (result.code === 20000) {
      commit('SET_TOKEN', result.data.token)
      setToken(result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
    // return new Promise((resolve, reject) => {
    //   login({ username: username.trim(), password: password }).then(response => {
    //     const { data } = response
    //     commit('SET_TOKEN', data.token)
    //     setToken(data.token)
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // get user info
  async getInfo({ commit, state }) {
    const result = await getInfo(state.token)
    // console.log(result)
    if (result.code === 20000) {

      commit('SET_USERINFO', result.data)
      commit('SET_RESULTASYNCROUTES', computedAsyncRoutes(asyncRoutes, result.data.routes))
      return 'ok'
    } else {
      return Promise.reject(new Error('Verification failed, please Login again.'))
    }
    // return new Promise((resolve, reject) => {
    //   getInfo(state.token).then(response => {
    //     const { data } = response
    //
    //     if (!data) {
    //       return reject('Verification failed, please Login again.')
    //     }
    //
    //     const { name, avatar } = data
    //
    //     commit('SET_NAME', name)
    //     commit('SET_AVATAR', avatar)
    //     resolve(data)
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // user logout
  async logout({ commit, state }) {
    const result = await logout(state.token)
    // console.log(result)
    if (result.code === 20000) {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
    // return new Promise((resolve, reject) => {
    //   logout(state.token).then(() => {
    //     removeToken() // must remove  token  first
    //     resetRouter()
    //     commit('RESET_STATE')
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // remove token
  async resetToken({ commit }) {
    removeToken()
    commit('RESET_STATE')
    return 'ok'
    // return new Promise(resolve => {
    //   removeToken() // must remove  token  first
    //   commit('RESET_STATE')
    // resolve()
    // })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}


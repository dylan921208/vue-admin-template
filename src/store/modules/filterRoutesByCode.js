import { getAsyncRouterMap, constantRouterMap, rootAuthCodes } from '@/router/index'// rootAuth 可忽略代表基础路由

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.role) {
    return roles.some(role => route.meta.role.indexOf(role) >= 0)
  } else {
    return true
  }
}

function hasPermissionQ(auths, route) {
  if (route.authCode) {
    return auths.some(authCode => route.authCode === authCode)
  } else {
    return false
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    cosnole.log(hasPermission(roles, route))
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

function filterAsyncRouterQ(asyncRouterMap, auths) {
  const accessedRouters = asyncRouterMap.map(route => {
    if (hasPermissionQ(auths, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouterQ(route.children, auths)
        if (!route.children.filter(item => !item.hidden).length) {
          
          route.hidden = true
          return route
        }
      }
      return route
    }
    route.hidden = true
    return route
  })
  return accessedRouters.filter(item => !item.authCode || item.hidden !== true)
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    buttonCode: [],
    routerAdded: ''
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    SET_BUTTON_CODE: (state, buttonCode) => {
      state.buttonCode = buttonCode
    },
    SET_ROUTER_ADDED: (state, data) => {
      state.routerAdded = data
    },
    RESET_ROUTER_ADDED: (state, data) => {
      state.routerAdded = data
    },
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        console.log('routedata',data)
        let { authCode, buttonCode } = data
        // mock all
        // authCode =authCode.concat('A','B','C', 'D', 'E', 'F', 'G', 'H', 'I','J', 'K') 
        const asyncRouterMap = getAsyncRouterMap()
        let accessedRouters = filterAsyncRouterQ(asyncRouterMap,authCode)
        console.log(accessedRouters)
        commit('SET_ROUTERS', accessedRouters)
        commit('SET_BUTTON_CODE', buttonCode)
        commit('SET_ROUTER_ADDED', '1')
        resolve()
      })
    },
    removeRouter({ commit}) {
      commit('RESET_ROUTER_ADDED', '2')
    }
  }
}

export default permission

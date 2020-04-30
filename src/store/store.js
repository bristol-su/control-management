import Vue from 'vue'
import Vuex from 'vuex'

import * as user from './modules/user.js'
import * as group from './modules/group.js'
import * as position from './modules/position.js'
import * as role from './modules/role.js'
import * as userTagCategory from './modules/userTagCategory.js'
import * as groupTagCategory from './modules/groupTagCategory.js'
import * as roleTagCategory from './modules/roleTagCategory.js'
import * as positionTagCategory from './modules/positionTagCategory.js'
import * as userTag from './modules/userTag.js'
import * as groupTag from './modules/groupTag.js'
import * as roleTag from './modules/roleTag.js'
import * as positionTag from './modules/positionTag.js'
import * as notifications from './modules/notifications';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
      user,
      group,
      position,
      role,
      userTagCategory,
      groupTagCategory,
      roleTagCategory,
      positionTagCategory,
      userTag,
      groupTag,
      roleTag,
      positionTag,
      notifications
  }
})

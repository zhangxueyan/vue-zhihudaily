import * as types from './mutation-types';

export default {
  // 新增新闻内容
  [types.INCREASE] (state, payload) {
    state.count2 += payload.num
  },
  [types.DECREASE] (state, payload) {
    state.count2 -= payload.num
  }
};

import * as types from './mutation-types';

export default {
  // 新增新闻内容
  increase({commit}, payload){
  	commit(types.INCREASE, {num:20})
  },
  decrease({commit}, payload){
  	commit(types.INCREASE, {num:1})
  }
};

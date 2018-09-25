import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Detail from '@/pages/Detail'
import EditorList from '@/pages/EditorList'
import Editor from '@/pages/Editor'
import ThemeDetail from '@/pages/ThemeDetail'
import Comments from '@/pages/Comments'
import Collect from '@/pages/Collect'
Vue.use(Router)

export default new Router({
  routes: [
    {
    path: '/',
    redirect:'/home'
  },
  {
  	path: '/home',
  	name: 'home',
  	component: Home
  },
  {
  	path: '/detail/:id',
  	name: 'detail',
  	component: Detail
  },
  {
  	path: '/editorList/:id',
  	name: 'editorList',
  	component: EditorList
  },
  {
  	path: '/themeDetail/:id/:next',
  	name: 'themeDetail',
  	component: ThemeDetail
  },
  {
    path: '/comments/:id',
    name: 'comments',
    component: Comments
  },
  {
    path: '/editor/:id',
    name: 'editor',
    component: Editor
  },
  {
    path: '/collect',
    name: 'collect',
    component: Collect
  }
  ]
})

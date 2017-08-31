<template>
<div class="collect">
 <nav @click = "goBack"><i class="iconfont icon-xiangqian"></i>收藏</nav>
   {{msg}}
</div>
</template>

<script>
import axios from 'axios'
import router from '../router'
export default {
  name: 'editorList',
  data () {
    return {
      msg: 'Welcome to Your shoucang'
    }
  },
  methods:{
      goBack:function(){
        router.go(-1)
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
nav{
  height: 1.25rem;
  background: #028fd6;
  font-size: 0.625rem;
  text-align: center;
  line-height: 1.25rem;
  color: #fff;
  position: relative;
}
.icon-xiangqian {
  font-size: 0.78125rem;
  position: absolute;
  left: 0;
  top:0;
}
</style>

<template>
<div class="editor">
    <nav @click = "goBack"><i class="iconfont icon-xiangqian"></i>主编</nav>
    <div v-html="editorDetail"></div>
</div>
</template>

<script>
import axios from 'axios'
import router from '../router'
export default {
  name: 'editorList',
  data () {
    return {
      msg: 'Welcome to Your editorList',
      editorDetail:''
    }
  },
    created() {
      this.fetchEditorData()
    },
  methods:{
      // 获取知乎主题页面的内容
       fetchEditorData:function(){
              axios.get('api/editor/'+this.$route.params.id+'/profile-page/ios')
              .then((response)=>{
                // console.log(response)
                this.editorDetail = response.data
              })
              .catch((error)=>{
                console.log(error);
              })
      },
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

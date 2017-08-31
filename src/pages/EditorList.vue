<template>
  <div class="editorList">
   <nav @click = "goBack"><i class="iconfont icon-xiangqian"></i>推荐者</nav>
    <ul>
      <li v-for = "item in editorList" class="editor-one clearfix">
      <router-link :to="{ name: 'editor', params: { id: item.id }}">
          <img :src="item.avatar" alt="" class="editor-avatar">
          <div class="editor-div">
            <p>{{item.name}}</p>
            <p>{{item.bio}}</p>
          </div>
        </router-link>
      </li>
    </ul>
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
      editorList:''
    }
  },
  created() {
      this.fetchEditorData()
    },
  methods:{
      // 获取知乎主题页面的内容
       fetchEditorData:function(){
              axios.get('api/theme/'+this.$route.params.id)
              .then((response)=>{
                // console.log(response)
                this.editorList = response.data.editors
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
.editor-one {
  padding: 0.15625rem 0.3125rem;
  border-bottom: 1px solid #ccc;
}
.editor-avatar {
  width: 0.9375rem;
  height: 0.9375rem;
  border-radius: 50%;
  float: left;
}
.editor-div {
  float: left;
  margin-left: 0.3125rem;
}
.editor-div p{
  font-size: 0.375rem;
}
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
.editor-one a{
  display: block;
}
</style>

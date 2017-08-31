<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import router from '../router';
import axios from 'axios'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
      created() {
      this.fetchData()
    },
  methods:{
            // 获取知乎最新新闻数据列表和滚动swiper数据
            fetchData:function (){
              axios.get('api/news/latest')
              .then((response)=>{
                console.log(response)
              })
              .catch((error)=>{
                console.log(error);
              })
            }
          }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

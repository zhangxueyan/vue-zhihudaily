/**
 * Create bu zechun.chen on 2016/12/22
 * api配置
 */
import axios from 'axios'

let url = process.env.NODE_ENV !== 'production' ? '/api/' : 'http://news-at.zhihu.com';


let func_axios = (api,cb) => {
    axios.get(api).then(function(res){
        if(res.status >= 200 && res.status <300){
            console.log(res);
            cb(res.data)
        }
    }).catch((error) => {
        // new Error('desc');
        return Promise.reject(error)
    })
}

export default {
    /**
     * 获取知乎最新新闻数据列表
     */
    getLatest:(cb)=>func_axios(url,cb)
}

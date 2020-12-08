import {reqsPecslist,reqsPecscount} from '../../utile/request'
const state = {
    list:[],//请求回来的数据
    total:0,//请求回来的总数
    size:2,//每页展示的条数
    page:1,//当前第几页
}
const mutations = {
    getcomList(state,arr){
       return state.list = arr
    },
     //获取总数
     changeCount(state,num){
         return state.total = num

     },
     //修改当前页
     changepage(state,page){
         return state.page = page
     }

}
const actions = {
    reqspecList(context){
        reqsPecslist({
            size: context.state.size,
            page: context.state.page,
        }).then(res=>{

            var arr = res.data.list
            arr.forEach(item => {
                item.attrs = JSON.parse(item.attrs)
                console.log(item.attrs);
            });
            
          context.commit('getcomList',arr)
        })
    },
    //读取总页数
    requestuserCount(context){
        reqsPecscount().then(res=>{
            console.log(res);
            context.commit('changeCount',res.data.list[0].total)

        })

    },
    //修改当前页码数
    changeCurrentPages(context,page){
        context.commit('changepage',page);
        //vuex是单向的无法直接调取需要用dispatch来再次调用reqcomList
        context.dispatch('reqspecList')

    }

}
const getters = {
    list(state){
        return state.list
    },
    total(state){
        return state.total
    },
    size(state){
        return state.size
    },
    page(state){
        return state.page
    }
  
}


export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true

}



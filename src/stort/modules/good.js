import {reqgoodlist} from '../../utile/request'
const state = {
    list:[]

}
const mutations = {
    changegoodList(state,arr){
        return state.list = arr
    },
}
const actions = {
    requestgoodlist(context){
        reqgoodlist({istree:true}).then(res=>{
            context.commit('changegoodList',res.data.list)
        })
    }
}
const getters = {
    list(state){
        return state.list
    }
}


export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true

}



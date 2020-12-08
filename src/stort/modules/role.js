import {reqroleList} from '../../utile/request'

const state = {
    list:[]
   
}
const mutations = {

    getrole(state,arr){
        return state.list = arr

    }
    
}
const actions = {
    requareRoleList(context){
        reqroleList().then(res=>{
            context.commit('getrole',res.data.list)
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



import {reqsecklist} from '../../utile/request'

const state = {
    list:[]
   
}
const mutations = {

    getseck(state,arr){
        return state.list = arr

    }
    
}
const actions = {
    requareseckList(context){
        reqsecklist().then(res=>{
            context.commit('getseck',res.data.list)
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



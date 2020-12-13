
const state = {
    list:sessionStorage.getItem('list')?JSON.parse(sessionStorage.getItem('list')):{},

}
const mutations = {
    changecateList(state,obj){
       
         state.list = obj
         sessionStorage.setItem('list',JSON.stringify(obj))
      
    },


   

}
const actions = {
    requestloginlist(context,obj){
        context.commit('changecateList',obj)
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



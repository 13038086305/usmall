import axios from 'axios'
import qs from 'qs'



//响应拦截
axios.interceptors.response.use(res=>{
    console.log('===============请求路径:'+res.config.url+'========');
    console.log(res);
    return res
})
const baseUrl = '/api'
//菜单请求
export const reqmenuAdd =(data)=>{
    return axios(
        {
            url:baseUrl+'/api/menuadd',
            method:'post',
            data: data
        }
    
    )
}

export const reqMenuList = (istree)=>{
    return axios({
        url:baseUrl+'/api/menulist',
        method:'get',
        params:istree
    })
}


export const reqMenuListOne = (id)=>{
    return axios({
        url:baseUrl+'/api/menuinfo',
        method:'get',
        params:id

    })
}

//修改
export const reqMenuUpdate = (data)=>{
    return axios({
        url:baseUrl+'/api/menuedit',
        method:'post',  
        data:data

    })
}


//删除
export const reqMenuListDel=(id)=>{
    return axios({
        url:baseUrl+'/api/menudelete',
        method:'post',
        data:id

    })
}


///////////////////////////////////角色管理//////////////////////////////////

//角色添加
export const reqroleadd=(data)=>{
    return axios({
        url:baseUrl+'/api/roleadd',
        method:'post',
        data:data

    })
}

//角色列表
export const reqroleList=()=>{
    return axios({
        url:baseUrl+'/api/rolelist',
        method:'get',
    })
}

//角色获取一条
export const reqroleOne=(id)=>{
    return axios({
        url:baseUrl+'/api/roleinfo',
        method:'get',
        params:id
    })
}

//点击修改
export const reqroleEdit=(data)=>{
    return axios({
        url:baseUrl+'/api/roleedit',
        method:'post',
        data:data
    })
}

//角色删除
export const reqroleDel=(id)=>{
    return axios({
        url:baseUrl+'/api/roledelete',
        method:'post',
        data:id
    })
}



///////////////////////////////////管理员管理//////////////////////////////////

//管理员添加

export const reqcomponentAdd=(data)=>{
    return axios({
        url:baseUrl+'/api/useradd',
        method:'post',
        data:data
    })
}


//管理员列表
export const reqcomponentList=(params)=>{
    return axios({
        url:baseUrl+'/api/userlist',
        method:'get',
        params:params

    })
}

//管理员总数
export const reqcomponentCount=()=>{
    return axios({
        url:baseUrl+'/api/usercount',
        method:'get',
    })
}


//获取一条

export const reqcomponentInfo=(id)=>{
    return axios({
        url:baseUrl+'/api/userinfo',
        method:'get',
        params:id
    })
}

//管理员修改
export const reqcomponentRedite=(id)=>{
    return axios({
        url:baseUrl+'/api/useredit',
        method:'post',
        data:id
    })
}

//管理员删除
export const reqcomponentDel=(id)=>{
    return axios({
        url:baseUrl+'/api/userdelete',
        method:'post',
        data:id
    })
}




///////////////////////////////////商品分类管理管理//////////////////////////////////
//商品分类添加
export const reqcateadd=(data)=>{
    var form = new FormData()
    for(var i in data){
        form.append(i,data[i])
    }
    console.log(form);
    return axios({
        url:baseUrl+'/api/cateadd',
        method:'post',
        data:form
    })
}

//分类列表
export const reqcatelist=(params)=>{
    return axios({
        url:baseUrl+'/api/catelist',
        method:'get',
        params:params
    })
}
//商品分类获取（一条）
export const reqcateinfo=(id)=>{
    return axios({
        url:baseUrl+'/api/cateinfo',
        method:'get',
        params:id
    })
}
//商品修改
export const reqcateedit=(data)=>{
    var form = new FormData()
    for(var i in data){
        form.append(i,data[i])
    }
    return axios({
        url:baseUrl+'/api/cateedit',
        method:'post',
        data:form
    })
}

//商品删除
export const reqcateDel=(id)=>{
    return axios({
        url:baseUrl+'/api/catedelete',
        method:'post',
        data:id
    })
}

///////////////////////////////////商品分规格//////////////////////////////////
//商品规格添加
export const reqsPecsadd=(data)=>{
    return axios({
        url:baseUrl+'/api/specsadd',
        method:'post',
        data:data
    })
}

//商品规格列表
export const reqsPecslist=(data)=>{
    return axios({
        url:baseUrl+'/api/specslist',
        method:'get',
        params:data
    })
}
//获取一条数据
export const reqsPecsinfo=(id)=>{
    return axios({
        url:baseUrl+'/api/specsinfo',
        method:'get',
        params:id
    })
}
//请求页数
export const reqsPecscount=(data)=>{
    return axios({
        url:baseUrl+'/api/specscount',
        method:'get',
        params:data
    })
}
//规格修改
export const reqsPecsedit=(data)=>{
    return axios({
        url:baseUrl+'/api/specsedit',
        method:'post',
        data:data
    })
}

//规格删除
export const reqsPecsDel=(id)=>{
    return axios({
        url:baseUrl+'/api/specsdelete',
        method:'post',
        data:id
    })
}






///////////////////////////////////商品管理//////////////////////////////////
//商品添加
export const reqgoodadd=(data)=>{
    var form = new FormData()
    for(var i in data){
        form.append(i,data[i])
    }
    console.log(form);
    return axios({
        url:baseUrl+'/api/goodsadd',
        method:'post',
        data:form
    })
}

//商品列表
export const reqgoodlist=(params)=>{
    return axios({
        url:baseUrl+'/api/goodslist',
        method:'get',
        params:params
    })
}
//商品获取（一条）
export const reqgoodinfo=(id)=>{
    return axios({
        url:baseUrl+'/api/goodsinfo',
        method:'get',
        params:id
    })
}
//商品修改
export const reqgoodedit=(data)=>{
    var form = new FormData()
    for(var i in data){
        form.append(i,data[i])
    }
    return axios({
        url:baseUrl+'/api/goodsedit',
        method:'post',
        data:form
    })
}

//商品删除
export const reqgoodDel=(id)=>{
    return axios({
        url:baseUrl+'/api/goodsdelete',
        method:'post',
        data:id
    })
}














///////////////////////////////////轮播图管理//////////////////////////////////
//商品分类添加
export const reqbanneradd=(data)=>{
    var form = new FormData()
    for(var i in data){
        form.append(i,data[i])
    }
    console.log(form);
    return axios({
        url:baseUrl+'/api/banneradd',
        method:'post',
        data:form
    })
}

//分类列表
export const reqbannerlist=()=>{
    return axios({
        url:baseUrl+'/api/bannerlist',
        method:'get',

    })
}
//商品分类获取（一条）
export const reqbannerinfo=(id)=>{
    return axios({
        url:baseUrl+'/api/bannerinfo',
        method:'get',
        params:id
    })
}
//商品修改
export const reqbanneredit=(data)=>{
    var form = new FormData()
    for(var i in data){
        form.append(i,data[i])
    }
    return axios({
        url:baseUrl+'/api/banneredit',
        method:'post',
        data:form
    })
}

//商品删除
export const reqbannerDel=(id)=>{
    return axios({
        url:baseUrl+'/api/bannerdelete',
        method:'post',
        data:id
    })
}

















<template>
<div class="box">
    <div class="con">
        <h3>登录</h3>
        <div><input type="text" value="请输入账号"></div>
        <div><input type="text" value="请输入密码"></div>
        <div><button @click="tiao">登录</button></div>
    </div>
    
</div>
</template>
<script>
export default {
components:{
 },
data () {
 return {
 }
},
methods:{
    tiao(){
        this.$router.push('/index')
    }
},
mounted(){
}
}
</script>
<style scoped>
.box{
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: linear-gradient(to right,#563443,#303d60);
}
.con{
    width: 400px;
    height: 220px;
    background: white;
    border: 1px solid #ccc;
    margin: 200px auto;
    text-align: center;
    line-height: 50px;
    border-radius:10px;
    padding: 40px;
}
input{
    border: 1px solid #777;
    width: 200px;
    line-height: 25px;
    border-radius: 5px;
    color: #999;
    padding-left: 10px;
}
button{
    width: 220px;
    line-height: 30px;
    text-align: center;
    background: skyblue;
    border-radius: 5px;
    margin-top: 20px;
    color:white

}
</style>
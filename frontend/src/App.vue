<template>
<div id="app">
    <div id="nav">
        <router-link class="code-desc" to="/home">Home</router-link> |
        <router-link class="code-desc" to="/about">Test</router-link> |
        <router-link class="code-desc" to="/create">Create</router-link> |
        <router-link class="code-desc" to="/dovote">Dovote</router-link> |
        <router-link class="code-desc" to="/result">Result</router-link>
    </div>
    <router-view />
</div>
</template>

<script>
export default {
    name: "app",
    mounted() {
        this.$setMenu({ "menuitems": [{ "menuid": "1111", "name": "菜单栏1" }, { "menuid": "2222", "name": "菜单栏2" }] })
        // 模拟安卓 webview 挂载函数
        // window.android = {
        //     GBReqService : (bot_id, tag, interact_type, interact_func, interact_param, bot_name, msg_content, msg_ext )=>{
        //         // let res = { bot_id, tag, interact_type, interact_func, interact_param, bot_name, msg_content, msg_ext }
        //         // let res = JSON.stringify({result:0,errmsg:"",botId:"6F1E7154902070297D46C853116AD995",tag:tag,jsonStr:{"id":1564648285,"bot_id":"6F1E7154902070297D46C853116AD995"},msg_type:0})
        //         // 格式：result,errmsg,bot_id,tag,msg_content,msg_type
        //         this.$wind.onGBServiceRsp(
        //             "0",
        //             "",
        //             "6F1E7154902070297D46C853116AD995",
        //             tag,
        //             '{"result":0,"err_msg":"succ","seq":12683,"title_list":[{"title_id":"11","title":"呱聊好用不？","item_list":[{"item_id":"21","desc":"好用","item_num":3},{"item_id":"22","desc":"不好用","item_num":1}]}]}',
        //             "0"
        //         )
        //     },
        //     requireBotInfo : (tag)=>{
        //         this.$wind.onBotInfoToH5(1,1,tag)
        //     },
        //     JSTest : (res) =>{
        //         return res;
        //     }
        // };
    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}

.gfont{  
    text-align: center;
    font-family: "Monoton", sans-serif;
    font-size: 32px;
    line-height: 24px;
    color: #47B584;
    margin-top: 50px;
    margin-bottom: 50px;
}
.code-desc {
color: #999;
margin: 5px auto 15px auto;
font-family: "Josefin Sans", sans-serif;
}
</style>

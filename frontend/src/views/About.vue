<template>
  <div class="about">
    <h1 @click="getUa()" class>UIBot 测试页</h1>
    <p>当前设备环境接口：{{this.$env}}</p>
    <p class="code-desc">{{ua}}</p>
    <p class="code-desc">{{test}}</p>
    <hr />
    <p class="code-desc">onGBServiceRsp-->{{resp}}</p>
    <p class="code-desc">onGBMenuItemSelect-->{{menu}}</p>
    <p class="code-desc">onBotInfoToH5-->{{info}}</p>
    <hr />
    
    <p class="code-desc">get bot info{{botinfo}}</p>
    <!-- <button @click="dotest()">JSTest</button> -->
    <h2>发起网络请求</h2>
    <button @click="send()">网络请求</button>

    <h2>获取bot信息</h2>
    <button @click="getBotInfo()">获取信息</button>

    <h2>设置顶部信息</h2>
    <input v-model="color" placeholder="16进制颜色 #ff0000" />
    <br />
    <input v-model="type" placeholder="0 字体黑色 1 字体白色" />
    <br />
    <input v-model="title" placeholder="输入顶部标题" />
    <br />
    <br />
    <button @click="upColor()">标题颜色</button>&nbsp;
    <button @click="upType()">字体颜色</button>&nbsp;
    <button @click="upTitle()">标题内容</button>
  </div>
</template>

<script>
import app from "@/App";
export default {
  name: "about",
  data() {
    return {
      ua: navigator.userAgent.toLowerCase(),
      menu: null,
      resp: null,
      info: null,
      test: null,
      botinfo:null,

      color: "#FF0000",
      type: null,
      title: null
    };
  },
  beforeMount() {
    this.$setupTypeTitleColor(0, "测试页", '#ffffff');
    this.$setMenu({
      menuitems: [
        { menuid: "01", name: "选项① " },
        { menuid: "02", name: "选项② " }
      ]
    });
  },
  mounted() {
    setInterval(() => {
      this.menu = sessionStorage.getItem("menu");
      this.botinfo = localStorage.getItem("botinfo");
    }, 100);
  },
  methods: {
    upColor() {
      this.$setupBackColor(this.color);
    },
    upType() {
      this.$setupColorType(this.type);
    },
    upTitle() {
      this.$setupTitle(this.title);
    },
    // 调起 webview 事件，发起网络代理请求
    async send() {
      let body = {
        bot_id: "6F1E7154902070297D46C853116AD995",
        interact_type: "id",
        interact_func: "get_id",
        interact_param: `{"type":1,"bot_id":"6F1E7154902070297D46C853116AD995"}`,
        bot_name: "",
        msg_content: "msg_content",
        msg_ext: "msg_ext"
      };
      // 使用 async 进行异步处理
      let resp = await this.$req(body);
      console.log(`测试req信息返回`, resp);
      this.$toast.center(resp);
      this.resp = resp;
    },
    // 获取bot信息
    async getBotInfo() {
      console.log("requireBotInfo");
      let info = await this.$getBotInfo();
      console.log("获取bot信息返回", info);
      this.$toast.center(info.data);
      this.info = info;
    }
  }
};
</script>

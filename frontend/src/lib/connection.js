import vue from 'vue'
var Vue = new vue()

export default {
    async gcSubmit(param) {
        // bot_id	string	bot id
        // bot_name	string	bot 名字
        // client_type	int	客户端类型
        // msg_content	string	消息体
        // interact_type	string	交互类型，例如："cardinfo"
        // interact_func	string	请求的行为
        // interact_param	string	交互参数，bot json的数据，在这个字段里面传输
        // msg_ext	json	扩展参数
        let data = Object.assign({
                client_type: 1000110,

                interact_type: 'botinfo',
                interact_func: '',
                interact_param: '',
                msg_content: '',
                msg_ext: ''
            },
            param // interact_param
        );
        console.log('发起请求---->', data);

        // 使用 async 进行异步处理
        let resp = await Vue.$req(data)
        console.log('呱聊代理请求----->', resp)
        let succ = { succ: true }
        return Object.assign(resp, succ)
    }
};
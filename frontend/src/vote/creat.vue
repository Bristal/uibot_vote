<template>
<div>
    <h1 class="gfont">Vote Create</h1>
    <label>标题:</label>&nbsp;<input v-model="title" /><br>
    <label>选项:</label>&nbsp;<input v-model="op1" /><br>
    <label>选项:</label>&nbsp;<input v-model="op2" /><br>

    <button class="btn" @click="create()">创建投票</button>
</div>
</template>

<script>
import conn from '../lib/connection'
export default {
    name: 'creat',
    data() {
        return {
            title: null,
            op1: null,
            op2: null
        }
    },
    beforeMount() {
        this.$setupTypeTitleColor(0,"创建",'#ffffff');
    },
    methods: {
        async create() {
            const { title,op1,op2 } = this;
            if (!title || !op1 || !op2) {
                return;
            } else {
                // do create vote ...
                this.err_msg = ''
                let interact_param = ''
                let seq = Math.floor(Math.random() * 100000);
                let title_list = [{
                    'title': title,
                    'item_list': [{ desc: op1 }, { desc: op2 }]
                }];
                try {
                    interact_param = JSON.stringify({
                        cmd: "addvote",
                        seq,
                        title_list
                    });
                } catch (e) {
                    console.error(e);
                }
                let voteret = await conn.gcSubmit({ interact_param });
                console.log("addvote---->", voteret);
                if (voteret["succ"]) {
                    let botret = voteret["data"];
                    let vote_id = JSON.parse(botret["msg_content"]).vote_id
                    // 存入本地存储中
                    localStorage.setItem('vote_id',vote_id);
                    this.$router.push({
                        name: 'dovote',
                        params: {
                            'vote_id': vote_id
                        }
                    });
                } else {
                    console.error(voteret["errmsg"])
                }
            }
        }
    },
}
</script>

<style scoped>
.btn {
    margin-top: 50px;
    width: 20vw;
}
</style>

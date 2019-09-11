<template>
<div>
    <h1 class="gfont">Vote DoVote</h1>
    <h2>{{title}}</h2><br>
    <div v-for="(item,index) in vote" :key="index">
        <label>选项:</label>&nbsp;<input disabled :value="item.desc" class="option" />&nbsp;<input v-model="choosed" :value="index" type="radio" /><br>
    </div>

    <button class="btn" @click="dovote()">提交投票</button>
    <div v-if="judge">
        <hr>
        <p>未创建投票，默认显示投票——呱聊好用不？</p>
    </div>
</div>
</template>

<script>
import conn from '../lib/connection'
export default {
    name: 'creat',
    data() {
        return {
            judge:false,
            title: null,
            title_id:null,
            vote: [],
            choosed: null
        }
    },
    beforeMount() {
        this.$setupTypeTitleColor(0,"投票",'#ffffff');
    },
    async mounted() {
        if(!localStorage.getItem('vote_id')){ // this.$route.params.vote_id
            this.vote_id = 1;
            this.judge = true
        }else{
            this.judge = false;
            this.vote_id = localStorage.getItem('vote_id')
        }
        console.log(this.vote_id);

        this.err_msg = "";
        let interact_param = "";
        let vote_id = this.vote_id;
        let seq = Math.floor(Math.random() * 100000);

        try {
            interact_param = JSON.stringify({
                cmd: "queryvote",
                seq,
                vote_id // 投票id
            });
        } catch (e) {
            console.error(e);
        }
        let res = await conn.gcSubmit({ interact_param });
        console.log("vote--->", res);
        let voteinfo = JSON.parse(res.data.msg_content).title_list[0];
        console.log("投票信息", voteinfo);
        if (!res.succ) {
            this.$toast.center('获取投票信息失败');
            return;
        }

        this.title = voteinfo.title;
        this.title_id = voteinfo.title_id;
        voteinfo.item_list.forEach(e => {
            e.value = e.item_id;
            e.title = e.desc;
            this.vote.push(e);
        });
        console.log(JSON.stringify(this.vote), this.choosed, this.title);
    },
    methods: {
        async dovote() {
            console.log('选择的投票选项',this.choosed)
            if (this.choosed === null) {
                this.$toast.center('不能选择为空喔~');
                return;
            } else {
                console.log(this.choosed)
                let selected = this.choosed

                this.err_msg = "";
                let interact_param = "";
                let seq = Math.floor(Math.random() * 100000);

                try {
                    interact_param = JSON.stringify({
                        cmd: "vote",
                        seq,
                        vote_id: this.vote_id, // this.vote_id, //	投票id
                        title_id: this.title_id, //	投票题目代号
                        item_list: [this.vote[selected]] //	选项列表
                    });
                } catch (e) {
                    console.error(e);
                }
                let res = await conn.gcSubmit({ interact_param });
                console.log('投票结果---->', res)
                if (!res.succ) {
                    this.$toast.center('获取投票信息失败');
                    return;
                }
                this.$toast.center('投票成功')
                setTimeout(() => {
                    // 进入投票详情  
                    this.$router.push({
                        name: 'result',
                        params: {
                            'vote_id': this.vote_id
                        }
                    });
                }, 1500);
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

.option {
    width: 50vw;
}
</style>

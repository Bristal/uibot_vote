<template>
<div>
    <h1 class="gfont">Vote Result</h1>
    <h2>{{title}}</h2><br>
    <div v-for="(item,index) in vote" :key="index">
        <label>选项:</label>&nbsp;<input disabled :value="item.title" class="option" />&nbsp;<label>x{{item.item_num}}</label>
    </div>

    <button class="btn" @click="share()">分享结果</button>
    <div v-if="judgeShow">
        <hr>
        <p>未创建投票，默认显示投票？</p>
    </div>
</div>
</template>

<script>
import conn from '../lib/connection'
export default {
    name: 'creat',
    data() {
        return {
            judgeShow:false,
            title:null,
            choosed: null,
            vote_id:null,
            vote:[]
        }
    },
    beforeMount() {
        this.$setupTypeTitleColor(0,"结果",'#ffffff');
    },
    async mounted() {
        if(!localStorage.getItem('vote_id')){ // this.$route.params.vote_id
            this.vote_id = 1;
            this.judgeShow = true
        }else{
            this.judgeShow = false;
            this.vote_id = localStorage.getItem('vote_id')
        }
        console.log(this.vote_id,this.judgeShow);

        this.err_msg = "";
        let interact_param = "";
        let vote_id = this.vote_id
        let seq = Math.floor(Math.random() * 100000);
        try {
            interact_param = JSON.stringify({
                cmd: "queryvote",
                seq,
                vote_id //	投票id
            });
        } catch (e) {
            console.error(e);
        }
        let res = await conn.gcSubmit({ interact_param });
        console.log('获取投票结果---->', res);

        let voteinfo = JSON.parse(res.data.msg_content).title_list[0];
        console.log("投票信息", voteinfo);
        if (!res.succ) {
            alert('获取投票信息失败');
            return;
        }
        this.title = voteinfo.title;
        this.selectedValue = voteinfo.item_list[0].item_id;
        voteinfo.item_list.forEach(e => {
            e.value = e.item_id;
            e.title = e.desc;
            this.vote.push(e);
        });
        this.judge = true
        console.log('--->最后的投票结果', JSON.stringify(this.vote), this.selectedValue, this.title);
    },
    methods: {
        share(){
            // this.$toast.top('top');
            this.$toast.center('分享结果，未开放');
            // this.$toast.bottom('bottom');
            // this.$loading('loading...');
            // this.$loading.close();            
        },
    },
}
</script>

<style scoped>
.btn {
    margin-top: 50px;
    width: 20vw;
}

.option {
    width: 30vw;
}
</style>

<template>
<div class="home">
    <img alt="Vue logo" src="../assets/logo.png"/>
    <HelloWorld msg="Welcome to Your UIBot App" />
</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
    name: "home",
    components: {
        HelloWorld
    },
    beforeMount() {
        this.$setupTypeTitleColor(0,"首页",'#ffffff');
    },
    methods: {
        
    },
};
</script>

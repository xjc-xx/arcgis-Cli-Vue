<!--
 * @Author: CC-TSR
 * @Date: 2020-12-18 08:58:26
 * @LastEditTime: 2020-12-18 21:49:28
 * @LastEditors: xiejiancheng1999@qq.com
 * @Description: 
 * @FilePath: \arcgis-cli-demo\src\App.vue
 * @可以输入预定的版权声明、个性签名、空行等
-->
<template>
    <div id="main">
        <Header :app-title="title" v-on:showOperator="showOperator" />
        <component :is="currentView" />
        <WebMap />
    </div>
</template>

<script lang="ts">
import Header from './components/Header.vue';
import WebMap from './components/WebMap.vue';
import Monitor from './components/Monitor.vue';
import Operator from './components/Operator.vue';

import { title } from './config';

export default {
    name: 'App',
    components: { Header, WebMap, Monitor, Operator },
    data: () => ({
        title,
        currentView: Monitor
    }),
    methods: {
        showOperator() {
            if (this.currentView == Monitor) this.currentView = Operator;
            else this.currentView = Monitor;
        }
    }
};
</script>

<style lang="scss" scoped>
#main {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
}
</style>

<!--
 * @Author: CC-TSR
 * @Date: 2020-12-18 08:58:26
 * @LastEditTime: 2020-12-19 01:14:10
 * @LastEditors: xiejiancheng1999@qq.com
 * @Description: 
 * @FilePath: \arcgis-cli-demo\src\components\WebMap.vue
 * @可以输入预定的版权声明、个性签名、空行等
-->
<template>
    <div id="rootMap">
        <div class="mapDiv" v-show="Is2D" ref="d2" />
        <div class="mapDiv" v-show="!Is2D" ref="d3" />
        <div id="createSlideDiv" class="esri-widget" ref='sliderWidget'>
      New slide: <input type="text" id="createSlideTitleInput" size="10" />
      <button id="createSlideButton">Create</button>
    </div>
    </div>
</template>

<script lang="ts">
import bus from '../assets/eventBus';

var webMap = {};
export default {
    name: 'WebMap',
    data: function () {
        return {
            Is2D: true
        };
    },
    async mounted() {
        const app = await import('../data/map');
        app.initialize(this.$refs.d2, this.$refs.d3, this.$refs.sliderWidget);
        bus.$on('changeTo3D', function () {
            webMap.Is2D = false; // 强迫症表示很头疼
        });
        bus.$on('changeTo2D', function () {
            webMap.Is2D = true;
        });
    },
    beforeCreate() {

         webMap = this;    //将当前this赋值给that对象
    }
};
</script>

<style lang="scss" scoped>
#rootMap {
    padding: 0;
    margin: 0;
    width: 80%;
    height: 93%;
}
.mapDiv {
    width: 100%;
    height: 100%;
}
</style>

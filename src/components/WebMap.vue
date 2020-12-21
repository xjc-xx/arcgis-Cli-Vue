<!--
 * @Author: CC-TSR
 * @Date: 2020-12-18 08:58:26
 * @LastEditTime: 2020-12-21 22:03:46
 * @LastEditors: xiejiancheng1999@qq.com
 * @Description: 
 * @FilePath: \arcgis-cli-demo\src\components\WebMap.vue
 * @可以输入预定的版权声明、个性签名、空行等
-->
<template>
    <div id="rootMap">
        <div class="mapDiv" v-show="Is2D" ref="d2" />
        <div class="mapDiv" v-show="!Is2D" ref="d3" />
        <div class="snow" v-if="isSnow">
            <div class="i-large"></div>
            <div class="i-medium"></div>
            <div class="i-small"></div>
        </div>
        <div id="createSlideDiv" class="esri-widget" ref="sliderWidget">
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
            Is2D: true,
            isSnow: false
        };
    },
    beforeCreate() {
        
        //将当前this赋值给that对象,用来解决事件总线中THIS指向的问题
        webMap = this; 
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
        bus.$on("controlSnow", function (isSnow) {
            webMap.isSnow = isSnow;
        })
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

.snow {
    position: absolute;
    display: inherit;
    pointer-events: none;
    bottom: 0;
    height: 93%;
    width: 80%;
}

.i-large,
.i-medium,
.i-small {
    position: absolute;
    height: 100%;
    width: 100%;
}

.i-large {
    background: url('./img/snow_large.png') repeat 0px 0px;
    animation: dropSnowFlakes 2s linear infinite;
}
.i-medium {
    background: url('./img/snow_medium.png') repeat 0px 0px;
    animation: dropSnowFlakes 12s linear infinite;
}
.i-small {
    background: url('./img/snow_small.png') repeat 0px 0px;
    animation: dropSnowFlakes 27s linear infinite;
}
@keyframes dropSnowFlakes {
    from {
        background-position: 0 0;
    }
    to {
        background-position: 0 413px;
    }
}
</style>

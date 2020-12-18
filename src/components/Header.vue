<!--
 * @Author: CC-TSR
 * @Date: 2020-12-18 08:58:26
 * @LastEditTime: 2020-12-18 23:03:18
 * @LastEditors: xiejiancheng1999@qq.com
 * @Description: 
 * @FilePath: \arcgis-cli-demo\src\components\Header.vue
 * @可以输入预定的版权声明、个性签名、空行等
-->
<template>
    <header>
        <span ref="title">{{ appTitle }}</span>
        <span :class="[isActive == 1 ? 'active' : 's-icon']" @click="active(1)">
            <i class="el-icon-s-home"></i>
            <span class="icon-name">首页(2D模式)</span>
        </span>
        <span :class="[isActive == 2 ? 'active' : 's-icon']" @click="active(2)">
            <i class="el-icon-office-building"></i>
            <span class="icon-name">3D模式</span>
        </span>
        <span :class="[isActive == 3 ? 'active' : 's-icon']" @click="active(3)">
            <i class="el-icon-edit-outline"></i>
            <span class="icon-name">{{opreator}}</span>
        </span>
        <span :class="[isActive == 4 ? 'active' : 's-icon']" @click="active(4)">
            <i class="el-icon-s-grid"></i>
            <span class="icon-name">更多</span>
        </span>
    </header>
</template>

<script lang="ts">
import bus from '../assets/eventBus'
export default {
    name: 'Header',
    data: function () {
        return {
            isActive: 1,
            opreator: "分析评价"
        };
    },
    props: {
        appTitle: {
            type: String,
            default: 'Header'
        }
    },
    methods: {
        active(index) {
            switch (index) {
                case 1:
                    this.isActive = index;
                    bus.$emit('changeTo2D');
                    break;
                case 2:
                    this.isActive = index;
                    bus.$emit('changeTo3D');
                    break;
                case 3:
                    if(this.opreator == "分析评价") this.opreator = "关闭分析工具"
                    else this.opreator = "分析评价";
                    this.$emit('showOperator');
                    break;
                case 4:
                    break;
                default:
                    break;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
$blue: #1eacbe;
$gray: #959595;
$white: #fff;
$active: #2a95be;
$holding: #8ec0c9;

header {
    flex: 0 1 100%;
    display: flex;
    background-color: $blue;
    color: $white;
    width: 100%;
    height: 7%;
    position: relative;
    font-weight: 1000;
    font-style: normal;
    font-size: 150%;
    border-bottom: 1px solid $gray;
    text-align: left;
    padding-left: 20px;
    align-items: center;
    span {
        height: 40px;
        line-height: 40px;
    }
}
.s-icon {
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    height: 100%;
    font-size: 20px;
    align-items: center;
    justify-content: center;
    width: 150px;
}
.icon-name {
    font-size: 10px;
    height: 40%;
}
.active {
    margin-left: 20px;
    background-color: $active;
    display: flex;
    flex-direction: column;
    height: 100%;
    font-size: 20px;
    align-items: center;
    justify-content: center;
    width: 150px;
}
.s-icon:hover {
    background-color: $holding;
}
</style>

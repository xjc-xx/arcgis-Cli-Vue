<!--
 * @Author: CC-TSR
 * @Date: 2020-12-18 09:26:39
 * @LastEditTime: 2020-12-21 22:17:58
 * @LastEditors: xiejiancheng1999@qq.com
 * @Description: 
 * @FilePath: \arcgis-cli-demo\src\components\Operator.vue
 * @可以输入预定的版权声明、个性签名、空行等
-->
<template>
    <div id="Operator">
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">地图分析</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24"
                ><div class="grid-content bg-purple opreator-tool">
                    <em class="el-icon-location-information" /> 快速分析工具
                    <em class="el-icon-location-information" /></div
            ></el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple opreator-tool" @click="controlSnow">
                    <em class="el-icon-light-rain" /> {{ txtControlSonw }} <em class="el-icon-light-rain" />
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script lang='ts'>
import bus from '../assets/eventBus';
export default {
    name: 'Operator',
    data: function () {
        return {
            isSnow: false
        };
    },
    methods: {
        controlSnow() {
            this.isSnow = !this.isSnow;
            bus.$emit('controlSnow', this.isSnow);
        }
    },
    computed: {
        txtControlSonw: function () {
            return this.isSnow ? '雪快停吧' : '快下雪吧';
        }
    }
};
</script>

<style  lang="scss" scoped>
$blue: #284e64;
$gray: #959595;
$white: #fff;
#Operator {
    width: 20%;
    height: 93%;
    background-color: #e5e9f2;
}

.opreator-tool:hover {
    background: rgb(100, 100, 100);
    color: white;
    cursor: pointer;
}

.el-row {
    margin-bottom: 5px;
    &:last-child {
        margin-bottom: 0;
    }
}
.el-col {
    border-radius: 4px;
}
.bg-purple-dark {
    background: #99a9bf;
    font-size: 20px;
    font-weight: 1000;
    padding-left: 15px;
}
.bg-purple {
    background: #d3dce6;
    font-size: 15px;
    font-weight: 800;
    padding-left: 15px;
}
.bg-purple-light {
    background: #e5e9f2;
    font-size: 12px;
    padding-right: 7px;
    text-align: right;
}
.grid-content {
    border-radius: 4px;
    min-height: 36px;
    vertical-align: middle;
    line-height: 36px;
}
.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}
</style>
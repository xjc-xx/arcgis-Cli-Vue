<!--
 * @Author: CC-TSR
 * @Date: 2020-12-18 09:26:39
 * @LastEditTime: 2020-12-19 15:36:34
 * @LastEditors: xiejiancheng1999@qq.com
 * @Description: 
 * @FilePath: \arcgis-cli-vue\src\components\Monitor.vue
 * @可以输入预定的版权声明、个性签名、空行等
-->
<template>
    <div id="monitor">
        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-dark">监测指标</div></el-col>
        </el-row>
        <el-row>
            <el-col :span="18"><div class="grid-content bg-purple">耕地保有量（2020）</div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple-light">1000万亩</div></el-col>
        </el-row>
        <el-row>
            <el-col :span="18"><div class="grid-content bg-purple">城乡建设用地面积（2020）</div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple-light">1000万亩</div></el-col>
        </el-row>
        <el-row>
            <el-col :span="18"><div class="grid-content bg-purple">永久基本农田保护面积（2019）</div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple-light">1000万亩</div></el-col>
        </el-row>
        <el-row>
            <el-col :span="18"><div class="grid-content bg-purple">自然岸线保有率（2018）</div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple-light">99%</div></el-col>
        </el-row>
    </div>
</template>

<script lang='ts'>
export default {
    name: 'Monitor'
};
</script>

<style  lang="scss" scoped>
$blue: #284e64;
$gray: #959595;
$white: #fff;
#monitor {
    width: 20%;
    height: 93%;
    background-color:   #e5e9f2;
}
.el-row {
    margin-bottom: 5px;
    &:first-child {
        margin-bottom: 20px;
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
    background: #cdd8f3;
    font-size: 12px;
    padding-right: 7px;
    text-align: right;
}
.grid-content {
    font-family: "微软雅黑";
    border-radius: 4px;
    min-height: 36px;
    vertical-align: middle;
    line-height: 36px;
    border-radius: 4px
}
.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}
</style>
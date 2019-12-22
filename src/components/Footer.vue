<template>
    <div class="footer">
        <div class="copyright">
            Copyright Linter. All Rights Reserved
        </div>
        <el-link type="info" href="http://beian.miit.gov.cn" target="_blank">
            蒙ICP备19000884号
        </el-link>
    </div>
</template>

<script>
    export default {
        name: 'Footer'
    }
</script>

<style scoped>
    .footer {
        text-align: center;
        padding-top: 20px;
        line-height: 1.5;
    }

    .copyright {
        font-size: 14px;
        color: #444;
    }

    .el-link {
        font-size: 14px;
    }
</style>
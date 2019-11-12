<template>
    <div id="footer">
        <div class="footer">
            <div class="copyright">
                Copyright Citru. All Rights Reserved
            </div>
            <el-link type="info" href="http://beian.miit.gov.cn" target="_blank">
                蒙ICP备19000884号
            </el-link>
        </div>
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
        padding: 0.75rem 0;
        line-height: 1.5;
        margin: auto;
        width: 75%;
    }

    .copyright{
        margin-top: 0.5rem;
        font-size: 0.8rem;
        color: #909399;
    }
    .el-link {
        font-size: 0.75rem;
    }
</style>
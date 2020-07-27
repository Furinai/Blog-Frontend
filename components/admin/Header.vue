<template>
    <div class="header">
        <ul class="nav-list">
            <li class="nav">
                欢迎，{{this.$auth.user.username}}
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>
    .header {
        display: flex;
        margin: auto;
    }

    .nav-list {
        margin-left: auto;
        display: flex;
    }

    .nav {
        margin-left: 10px;
    }

    a {
        color: #707070;
    }
</style>

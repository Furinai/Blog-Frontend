<template>
    <div id="error">
        <NotFound v-if="error.statusCode === 404"/>
    </div>
</template>

<script>
    import NotFound from '~/components/NotFound';

    export default {
        components: {NotFound},
        props: ['error']
    }
</script>

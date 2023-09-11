<template>
    <div class="content mt-5">
        <div class="container mt-5">
            <Nuxt />
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {}
    },
    mounted() {
        let ref = this.$route.query.ref;
        if(ref) {
            localStorage.setItem('ref', ref);
        }  
    },
}

</script>
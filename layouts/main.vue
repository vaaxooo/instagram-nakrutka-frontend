<template>
    <div class="content">
        <Layouts-Header v-if="$auth.user" />
        <layouts-main-header v-else />
        <div class="container">
            <Nuxt />
            <layouts-main-footer />
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

        if(this.$i18n.locale !== 'en' && this.$i18n.locale !== 'ru') {
            const userLanguage = window.navigator.language;
            let language = userLanguage.split('-')[0];
            if (language !== 'en' && language !== 'ru') {
                language = 'en';
            }
            this.$i18n.locale = language;
        }

    },
}

</script>
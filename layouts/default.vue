<template>
    <div class="content">
        <Layouts-Header />
        <div class="container mt-4">
            <Nuxt />
        </div>


        <deposits-deposit-modal />

        <div id="scroll-to-top-button" @click="scrollToTop" v-if="shouldShowButton">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style="transition: all 100ms ease-in-out 0s; position: fixed; bottom: 32px; right: 32px; cursor: pointer;"><g filter="url(#filter0_b_2974_48896)"><rect width="40" height="40" rx="20" fill="#4c4c4c" fill-opacity="0.8"></rect><path d="M14.5899 19.8585C14.7161 20.0925 14.9562 20.2384 15.2173 20.2384L19.2827 20.2384L19.2827 28.2657C19.2827 28.671 19.604 29 20 29C20.3959 29 20.7172 28.671 20.7172 28.2657L20.7172 20.2384L24.7827 20.2384C25.0447 20.2384 25.2848 20.0925 25.4101 19.8585C25.5372 19.6245 25.5286 19.3386 25.39 19.1125L20.6073 11.3427C20.4753 11.1292 20.2467 11 20 11C19.7532 11 19.5247 11.1292 19.3927 11.3427L14.61 19.1125C14.5373 19.2319 14.5 19.368 14.5 19.5041C14.5 19.6255 14.5306 19.7479 14.5899 19.8585Z" fill="#FFF"></path></g><defs><filter id="filter0_b_2974_48896" x="-24" y="-24" width="88" height="88" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feGaussianBlur in="BackgroundImageFix" stdDeviation="12"></feGaussianBlur><feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_2974_48896"></feComposite><feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_2974_48896" result="shape"></feBlend></filter></defs></svg>
        </div>
    </div>
</template>

<script>
export default {
    auth: true,
    data() {
        return {
            shouldShowButton: false,
        };
    },
    methods: {
        handleScroll() {
            if (window.scrollY > 100) {
                this.shouldShowButton = true;
            } else {
                this.shouldShowButton = false;
            }
        },
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        },
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },
};
</script>
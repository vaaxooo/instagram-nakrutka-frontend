<template>
    <VueSlickCarousel :arrows="false" :dots="false"  :autoplaySpeed="2000" :autoplay="true">
        <div class="banner">
            <img src="/assets/images/banner1.webp" alt="" class="banner">
        </div>
        <div class="banner">
            <img src="/assets/images/banner2.webp" alt="" class="banner">
        </div>
        <div >
            <img src="/assets/images/banner3.webp" alt="" class="banner">
        </div>
    </VueSlickCarousel>
</template>


<script>
  import VueSlickCarousel from 'vue-slick-carousel'
  import 'vue-slick-carousel/dist/vue-slick-carousel.css'
  // optional style for arrows & dots
  import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
 
  export default {
    name: 'MyComponent',
    components: { VueSlickCarousel },
  }
</script> 
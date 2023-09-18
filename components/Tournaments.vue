<template>
        <VueSlickCarousel :arrows="true" :dots="false"  :autoplaySpeed="2000" :autoplay="true" :slidesToShow="slideToShow" class="tournaments">
            <div class="col-md-4">
                <div class="tournament">
                    <div class="tournament__overlay">
                        <img src="https://jetton.games/tournaments/BET%20&%20WIN%20IPHONE%202023%20-%20banner.jpg" class="tournament__image" alt="">
                        <div class="overlay"></div>
                    </div>
                    <div class="tournament__details">
                        <div class="tournament__detail">
                            <div class="tournament__title">
                                <span>Название турнира</span>
                            </div>
                            <div class="tournament__prize">
                                <span>Призовой фонд: 1000$</span>
                            </div>
                            <div class="tournament__date">
                                <span>15.09 - 01.10</span>
                            </div>
                            <div class="tournament__actions">
                                <a href="#" class="btn btn-tournament">Участвовать</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="tournament">
                    <div class="tournament__overlay">
                        <img src="https://jetton.games/tournaments/BET%20&%20WIN%20IPHONE%202023%20-%20banner.jpg" class="tournament__image" alt="">
                        <div class="overlay"></div>
                    </div>
                    <div class="tournament__details">
                        <div class="tournament__detail">
                            <div class="tournament__title">
                                <span>Название турнира</span>
                            </div>
                            <div class="tournament__prize">
                                <span>Призовой фонд: 1000$</span>
                            </div>
                            <div class="tournament__date">
                                <span>15.09 - 01.10</span>
                            </div>
                            <div class="tournament__actions">
                                <a href="#" class="btn btn-tournament">Участвовать</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="tournament">
                    <div class="tournament__overlay">
                        <img src="https://jetton.games/tournaments/BET%20&%20WIN%20IPHONE%202023%20-%20banner.jpg" class="tournament__image" alt="">
                        <div class="overlay"></div>
                    </div>
                    <div class="tournament__details">
                        <div class="tournament__detail">
                            <div class="tournament__title">
                                <span>Название турнира</span>
                            </div>
                            <div class="tournament__prize">
                                <span>Призовой фонд: 1000$</span>
                            </div>
                            <div class="tournament__date">
                                <span>15.09 - 01.10</span>
                            </div>
                            <div class="tournament__actions">
                                <a href="#" class="btn btn-tournament">Участвовать</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>            
            <div class="col-md-4">
                <div class="tournament">
                    <div class="tournament__overlay">
                        <img src="https://jetton.games/tournaments/BET%20&%20WIN%20IPHONE%202023%20-%20banner.jpg" class="tournament__image" alt="">
                        <div class="overlay"></div>
                    </div>
                    <div class="tournament__details">
                        <div class="tournament__detail">
                            <div class="tournament__title">
                                <span>Название турнира</span>
                            </div>
                            <div class="tournament__prize">
                                <span>Призовой фонд: 1000$</span>
                            </div>
                            <div class="tournament__date">
                                <span>15.09 - 01.10</span>
                            </div>
                            <div class="tournament__actions">
                                <a href="#" class="btn btn-tournament">Участвовать</a>
                            </div>
                        </div>
                    </div>
                </div>
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
    data() {
        return {
            slideToShow: 1
        }
    },
    mounted() {
        if (window.innerWidth < 768) {
            this.slideToShow = 1
        } else {
            this.slideToShow = 3
        }
    },
  }
</script> 
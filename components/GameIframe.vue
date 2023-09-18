<template>
    <div class="game-content">
        <div class="iframe-container">
            <iframe :src="game.url" frameborder="0" allowfullscreen class="game"></iframe>
            <div class="actions-back">
                <button class="btn btn-primary btn-lg btn-close-game h-100 w-100" @click="closeGame">Вернуться назад</button>
            </div>   
        </div>  
    </div>
</template>
<script>
export default {
    props: {
        game: {
            type: Object,
            required: true
        }
    },
    mounted() {
        
        // Добавьте этот код, чтобы скрыть полосу прокрутки body при открытии iframe
        const body = document.body;
        body.style.overflow = 'hidden';
    },
    methods: {
        closeGame() {
            this.$nuxt.$emit('closeGame');
        }
    },
    beforeDestroy() {
        // Возвращаем полосу прокрутки body при уничтожении компонента
        const body = document.body;
        body.style.overflow = 'auto';
    }
}
</script>
<style>
/* Добавьте стили по вашему усмотрению */
</style>

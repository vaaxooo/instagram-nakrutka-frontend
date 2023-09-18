<template>
    <div class="section">

        <!-- <Banners class="mb-3" /> -->

        <Tournaments />

        <Filters :categories="categories" :providers="providers" />

        <div class="games-list row mt-3 padding-small">
            <div class="col-6 col-md-6 col-lg-2 mb-2 px-1" v-for="game in games" :key="game.game_id">
                <div class="game-item">
                    <div class="game-item__image">
                        <img :src="game.img" alt="">
                    </div>
                    <div class="game-item__actions">
                        <div class="game-item__title">
                            <span>{{ game.name }}</span>
                        </div>
                        <div class="game-item__provider">
                            <span>{{ game.provider.name }}</span>
                        </div>
                        <div class="game-item__play">
                            <button class="btn-play d-block" @click="playGame(game.game_id)">Играть</button>
                            <button class="btn-demo d-block mt-2" @click="playDemo(game.game_id)" v-if="game.demo">Демо</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="pagination mb-5">
                <div class="pagination__count">Отображается <b>{{ games.length }}</b> из <b>{{ gamesCount }}</b> игр</div>
                <div class="pagination__button" v-if="gamesCount > 60 && games.length !== gamesCount">
                    <button type="submit" class="btn-categories btn-categories-active btn-providers" @click="showMore">
                        <span class="material-icons icon">rotate_left</span>
                        Показать ещё
                    </button>
                </div>
            </div>

        </div>

        <game-iframe :game="game" v-if="game" />

    </div>
</template>

<script>
import GameIframe from '../components/GameIframe.vue'

export default {
    components: { GameIframe },
    auth: true,
    layout: 'main',
    data() {
        return {
            games: [],
            categories: [],
            providers: [],

            gamesCount: 0,

            filters: {
                category: null,
                provider: null,
                search: ''
            },

            pagination: {
                page: 1,
                limit: 60,
            },

            game: null
        }
    },
    mounted() {
        this.getGames()

        this.$nuxt.$off('closeGame')
        this.$nuxt.$off('changeSearch')
        this.$nuxt.$off('changeCategory')
        this.$nuxt.$off('changeProvider')
        this.$nuxt.$on('changeCategory', (category) => {
            this.filters.category = category
        })
        this.$nuxt.$on('changeProvider', (provider) => {
            this.filters.provider = provider
        })
        this.$nuxt.$on('changeSearch', (search) => {
            this.filters.search = search
        })
        this.$nuxt.$on('closeGame', () => {
            this.game = null
        })
    },
    watch: {
        filters: {
            handler() {
                this.pagination.page = 1
                this.getGames()
            },
            deep: true
        }
    },
    methods: {
        async playDemo(gameId) {
            try {
                
                let mobile = window.orientation > 1;
                const { data: res } = await this.$axios.get(`/private/games/${gameId}/open?demo=1&mobile=${mobile}`)
                if(!res.success) {
                    return this.$toast.error(res.message)
                }
                if(res.data.status === 'fail') {
                    return this.$toast.error('Демо версия недоступна')
                }
                
                this.game = res.data.content.game
            } catch (error) {
                console.log(error)   
            }
        },

        async playGame(gameId) {
            try {
                let mobile = window.orientation > 1;
                const { data: res } = await this.$axios.get(`/private/games/${gameId}/open?&mobile=${mobile}`)
                if(!res.success) {
                    return this.$toast.error(res.message)
                }
                if(res.data.status === 'fail') {
                    return this.$toast.error('Демо версия недоступна')
                }
                this.game = res.data.content.game
            } catch (error) {
                console.log(error)   
            }
        },

        async getGames() {
            try {
                let query = ''
                if(this.filters.category) {
                    query += `&category=${this.filters.category}`
                }
                if(this.filters.provider) {
                    query += `&provider=${this.filters.provider}`
                }
                if(this.filters.search) {
                    query += `&search=${this.filters.search}`
                }
                const { data: res } = await this.$axios.get(`/private/games?page=${this.pagination.page}&limit=${this.pagination.limit}${query}`)
                if(!res.success) {
                    return this.$toast.error(res.message)
                }
                this.games = res.data.games.rows
                this.gamesCount = res.data.games.count
                this.categories = res.data.categories
                this.providers = res.data.providers
            } catch (error) {
                console.log(error)   
            }

        },

        async showMore() {
            try {
                this.pagination.page++
                let query = ''
                if(this.filters.category) {
                    query += `&category=${this.filters.category}`
                }
                if(this.filters.provider) {
                    query += `&provider=${this.filters.provider}`
                }
                if(this.filters.search) {
                    query += `&search=${this.filters.search}`
                }
                const { data: res } = await this.$axios.get(`/private/games?page=${this.pagination.page}&limit=${this.pagination.limit}${query}`)
                if(!res.success) {
                    return this.$toast.error(res.message)
                }
                this.games = [...this.games, ...res.data.games.rows]
                this.gamesCount = res.data.games.count
            } catch (error) {
                console.log(error)   
            }
        }

    },
}

</script>
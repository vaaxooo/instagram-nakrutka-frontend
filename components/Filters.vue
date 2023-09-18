<template>
    <div class="section-menu">
        <div class="row w-100">
            <div class="col-md-2 col-sm-12 my-1">
            <div class="dropdown">
                <button class="btn-categories btn-categories-active btn-providers px-3 dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="isDropdownCategoriesOpen = !isDropdownCategoriesOpen">
                    <span class="material-icons icon">casino</span>
                    <span>{{ category.name || 'Все' }}</span>
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" :class="{ show: isDropdownCategoriesOpen }">
                    <a class="dropdown-item" href="#" @click="changeCategory()">Все</a>
                    <a class="dropdown-item" href="#" v-for="category in categories" :key="category.id" @click="changeCategory(category.id)">{{ category.name }} <div class="game-count" v-if="+category.gameCount > 0">{{ category.gameCount }}</div></a>
                </div>
            </div>



            </div>
            <div class="col-md-7 col-sm-12 my-1">
            <form class="form">
                <label for="search">
                <input required="" autocomplete="off" placeholder="Поиск игр..." id="search" type="text" v-model="search">
                <div class="icon">
                    <svg stroke-width="2" stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="swap-on">
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-linejoin="round" stroke-linecap="round"></path>
                    </svg>
                    <svg stroke-width="2" stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="swap-off">
                        <path d="M10 19l-7-7m0 0l7-7m-7 7h18" stroke-linejoin="round" stroke-linecap="round"></path>
                    </svg>
                </div>
                </label>
            </form>
            </div>
            <div class="col-md-3 col-sm-12 my-1">
                <div class="dropdown">
                    <button class="btn-categories btn-categories-active btn-providers px-3 dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="isDropdownProvidersOpen = !isDropdownProvidersOpen">
                        <span>Провайдер: <b>{{ provider.name || 'Все' }}</b></span>
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" :class="{ show: isDropdownProvidersOpen }">
                        <a class="dropdown-item" href="#" @click="changeProvider()">Все</a>
                        <a class="dropdown-item" href="#" v-for="provider in providers" :key="provider.id" @click="changeProvider(provider.id)">{{ provider.name }} <div class="game-count" v-if="+provider.gameCount > 0">{{ provider.gameCount }}</div></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    props: {
        categories: {
            type: Array,
            required: true
        },
        providers: {
            type: Array,
            required: true
        }
    },
    data() {
        return {

            isDropdownCategoriesOpen: false,
            isDropdownProvidersOpen: false,

            search: '',
            provider: [],
            category: []
        };
    },
    watch: {
        isDropdownCategoriesOpen() {
            this.isDropdownProvidersOpen = false;
        },
        isDropdownProvidersOpen() {
            this.isDropdownCategoriesOpen = false;
        },
        search() {
            this.$nuxt.$emit('changeSearch', this.search);
        },
        provider() {
            this.isDropdownProvidersOpen = false;
            this.isDropdownCategoriesOpen = false;
        },
        category() {
            this.isDropdownProvidersOpen = false;
            this.isDropdownCategoriesOpen = false;
        }
    },
    mounted() {
        console.log(this.providers)
    },
    methods: {
        toggleDropdown() {
            this.isDropdownCategoriesOpen = !this.isDropdownCategoriesOpen;
        },

        changeCategory(category) {
            if(category === undefined) {
                this.category = [];
                this.$nuxt.$emit('changeCategory', category);
                return;
            }
            this.category = this.categories.find(item => item.id === category);
            this.$nuxt.$emit('changeCategory', category);
        },

        changeProvider(provider) {
            if(provider === undefined) {
                this.provider = [];
                this.$nuxt.$emit('changeProvider', provider);
                return;
            }
            this.provider = this.providers.find(item => item.id === provider);
            this.$nuxt.$emit('changeProvider', provider);
        }
    }
}
</script>
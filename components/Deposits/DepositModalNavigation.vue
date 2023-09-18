<template>
    <div class="navigation">
        <ul class="nav nav-pills justify-content-center">
            <li class="nav-item">
                <a class="nav-link modal-link" :class="{'active': current_page === 'deposit'}" href="#" @click="switchPage('deposit')">Пополнить</a>
            </li>
            <li class="nav-item">
                <a class="nav-link modal-link" :class="{'active': current_page === 'withdrawal'}" href="#" @click="switchPage('withdrawal')">Вывести</a>
            </li>
            <li class="nav-item">
                <a class="nav-link modal-link" :class="{'active': current_page === 'balances'}" href="#" @click="switchPage('balances')">Счета</a>
            </li>
            <li class="nav-item">
                <a class="nav-link modal-link" :class="{'active': current_page === 'history'}" href="#" @click="switchPage('history')">История</a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        current_page: {
            type: String,
            default: 'deposit'
        }
    },
    data() {
        return {

        }
    },

    methods: {
        switchPage(page) {
            this.$nuxt.$emit('switchModalPage', page);
        }
    }
}
</script>
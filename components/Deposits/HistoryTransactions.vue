<template>
    <div class="deposit-methods">
        <div class="list-group">
            <div class="method-section mb-3">
                <a href="#" class="list-group-item list-group-item-action d-flex gap-2 w-100 justify-content-between mb-1" aria-current="true" v-for="transaction in transactions" :key="transaction.id" @click="showHistory(transaction.hash)">
                    <div class="method-icon bg-failed" v-if="transaction.status !== 'completed'">
                        <span class="material-icons icon payment-icon" v-if="transaction.type === 'deposit'">arrow_downward</span>
                        <span class="material-icons icon payment-icon" v-else>arrow_upward</span>
                    </div>
                    <div class="method-icon bg-completed" v-else>
                        <span class="material-icons icon payment-icon" v-if="transaction.type === 'deposit'">arrow_downward</span>
                        <span class="material-icons icon payment-icon" v-else>arrow_upward</span>
                    </div>
                    <div class="method-details mx-auto">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-0 payment-name" v-if="transaction.type === 'deposit' && transaction.is_fiat">Пополнение с карты</h5>
                            <h5 class="mb-0 payment-name" v-else-if="transaction.type === 'deposit' && !transaction.is_fiat">Пополнение криптовалютой</h5>
                            <h5 class="mb-0 payment-name" v-else-if="transaction.type === 'withdrawal' && transaction.is_fiat">Вывод на карту</h5>
                            <h5 class="mb-0 payment-name" v-else-if="transaction.type === 'withdrawal' && !transaction.is_fiat">Вывод криптовалюты</h5>
                        </div>
                        <p class="mb-0 payment-desc">{{ formatDate(transaction.createdAt) }}</p>
                    </div>
                    <div class="history-details">
                        <div class="history-value text-nowrap text-failed" v-if="transaction.status !== 'completed'">{{ transaction.is_fiat ? (+transaction.amount).toFixed(2) : (+transaction.amount).toFixed(6) }} {{ transaction.currency_symbol }}</div>
                        <div class="history-value text-nowrap text-completed" v-if="transaction.status === 'completed'">{{ transaction.is_fiat ? (+transaction.amount).toFixed(2) : (+transaction.amount).toFixed(6) }} {{ transaction.currency_symbol }}</div>
                        <div class="history-status text-failed" v-if="transaction.status !== 'completed'">{{ transaction.status }}</div>
                        <div class="history-status text-completed" v-else>Успешно</div>
                    </div>
                </a>
                <!-- <a href="#" class="list-group-item list-group-item-action d-flex gap-2 w-100 justify-content-between mb-1" aria-current="true" @click="showHistory(2)">
                    <div class="method-icon bg-completed">
                        <span class="material-icons icon payment-icon">arrow_downward</span>
                    </div>
                    <div class="method-details mx-auto">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-0 payment-name">Пополнение с карты</h5>
                        </div>
                        <p class="mb-0 payment-desc">12 сентября в 14:20</p>
                    </div>
                    <div class="history-details">
                        <div class="history-value text-nowrap text-completed">+10000.00 ₽</div>
                        <div class="history-status text-completed">Успешно</div>
                    </div>
                </a>
                <a href="#" class="list-group-item list-group-item-action d-flex gap-2 w-100 justify-content-between mb-1" aria-current="true" @click="showHistory(3)">
                    <div class="method-icon bg-completed">
                        <span class="material-icons icon payment-icon">arrow_upward</span>
                    </div>
                    <div class="method-details mx-auto">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-0 payment-name">Вывод на карту</h5>
                        </div>
                        <p class="mb-0 payment-desc">12 сентября в 14:35</p>
                    </div>
                    <div class="history-details">
                        <div class="history-value text-nowrap text-completed">+10000.00 ₴</div>
                        <div class="history-status text-completed">Успешно</div>
                    </div>
                </a> -->
            </div>
        </div>
    </div>
</template>
<script>
import formatDate from '~/plugins/formatDate'
export default {

    data() {
        return {
            history: 0,
            transactions: [],
            count: 0,

            formatDate
        }
    },
    mounted() {
        this.fetchTransactions();
    },
    methods: {
        showHistory(hash) {
            this.history = hash;
            this.$nuxt.$emit('showHistory', hash)
        },

        async fetchTransactions() {
            try {
                const { data: res } = await this.$axios.get(`/private/wallet/transactions`)
                if(!res.success) {
                    this.$toast.error(res.message);
                }
                this.transactions = res.data.rows;
                this.count = res.data.count;
            } catch (error) {
                console.log(error);
            }
        }
    }

}
</script>
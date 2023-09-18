<template>
    <div class="section border-0">
        <div class="hdetails" v-if="isVisible">
            <div class="final-bank">
                <div class="bank-details w-100">
                    <div class="method-icon bank-icon">
                        <span class="material-icons icon payment-icon">credit_score</span>
                    </div>
                    <span class="m-auto mx-0" v-if="transaction.type === 'deposit' && transaction.is_fiat">Пополнение с карты</span>
                    <span class="m-auto mx-0" v-else-if="transaction.type === 'withdrawal' && transaction.is_fiat">Вывод на карту</span>
                    <span class="m-auto mx-0" v-else-if="transaction.type === 'deposit'">Пополнение криптовалютой</span>
                    <span class="m-auto mx-0" v-else-if="transaction.type === 'withdrawal'">Вывод криптовалюты</span>
                </div>
                <!-- <div class="timer">
                    <span class="material-icons icon">timer</span> 19:00
                </div> -->
            </div>

            <div class="history-payment-details">
                <div class="history-more">
                    <div class="history-payment-value text-completed">{{ transaction.is_fiat ? (+transaction.amount).toFixed(2) : (+transaction.amount).toFixed(6) }} {{ transaction.symbol }}</div>
                    <div class="history-date">{{ formatDate(transaction.createdAt) }}</div>
                </div>


                <div class="payment-details">
                    <div class="details">
                        <div class="payment-title">Статус</div>
                        <div class="payment-value">{{ transaction.status }}</div>
                    </div>
                    <div class="details">
                        <div class="payment-title">Номер карты</div>
                        <div class="payment-value" v-if="transaction.type === 'deposit' && transaction.is_fiat">{{ transaction.bank.card_number }}</div>
                        <div class="payment-value" v-else-if="transaction.type === 'withdrawal' && transaction.is_fiat">{{ transaction.recipient_address }}</div>
                        <div class="payment-value" v-else-if="transaction.type === 'deposit'">{{ transaction.temporary_address }}</div>
                        <div class="payment-value" v-else-if="transaction.type === 'withdrawal'">{{ transaction.recipient_address }}</div>
                    </div>
                    <div class="details" v-if="transaction.type === 'withdrawal' && transaction.is_fiat">
                        <div class="payment-title">Имя получателя</div>
                        <div class="payment-value">{{ transaction.card_holder }}</div>
                    </div>
                </div>

                <div class="payment-support text-white">
                    Если вы уверены, что совершили перевод, напишите нам в поддержку.
                    <a href="#" class="d-block">@support</a>
                </div>
            </div>
        </div>
        <div class="hdetails" v-else>
            <ActiveHistory :transaction="transaction" />
        </div>
    </div>
</template>
<script>
import formatDate from "~/plugins/formatDate";
import ActiveHistory from "./ActiveHistory.vue";

export default {
    components: {
        ActiveHistory
    },
    props: {
        history_hash: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            isVisible: true,
            transaction: [],
            formatDate
        }
    },
    mounted() {
        this.fetchTransaction();
    },
    methods: {
        async fetchTransaction() {
            try {
                const { data: res } = await this.$axios.get(`/private/wallet/transactions/${this.history_hash}`);
                if(!res.success) {
                    this.$toast.error(res.message);
                    return
                }
                this.transaction = res.data;
                console.log(this.transaction.status);
                if(this.transaction.status === 'pending' && this.transaction.type === 'deposit') {
                    this.isVisible = false;
                }
            } catch (e) {
                console.log(e);
            }
        }
    },
}
</script>
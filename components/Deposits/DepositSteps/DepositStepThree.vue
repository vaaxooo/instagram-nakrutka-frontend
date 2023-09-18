<template>
    <div class="section">

    <div class="section">
        <div class="balance">
            <div class="balance-title">Сумма к зачислению:</div>
            <div class="balance-value label-value">
                {{ deposit.amount }}
                <div class="balance-currency">{{ this.$auth.user.active_currency.symbol }}</div>
            </div>
        </div>

    </div>


        <div class="method-section mt-5">
            <div class="method-title">Выберите банк для перевода</div>
            <div class="list">
                <a href="#" class="list-group-item list-group-item-action d-inline-block mb-1" aria-current="true" v-for="bank in banks" :key="bank.id" @click="selectBank(bank.id)">
                    <div class="method-icon" :style="`background: ${ bank.form_background_color }`">
                        <img :src="bank.icon" :alt="bank.name" class="payment-icon bank-icon-size">
                    </div>
                    <div class="method-details mx-auto">
                        <div class="d-flex w-100 justify-content-between currency-info">
                            <h5 class="mb-0 payment-name">
                                {{ bank.name }}
                            </h5>
                        </div>
                    </div>
                </a>
            </div>
        </div>


    </div>
</template>

<script>
export default {
    props: {
        deposit: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            banks: [],
        }
    },
    mounted() {
        this.fetchBanks();
    },
    methods: {
        async fetchBanks() {
            try {
                const { data: res } = await this.$axios.get(`/private/wallet/currencies/${this.$auth.user.active_currency_id}/banks`)
                if(!res.success) {
                    this.$toast.error(res.message);
                }
                this.banks = res.data;
            } catch (error) {
                console.log(error);
            }
        },

        selectBank(id) {
            this.$nuxt.$emit('selectBank', id);
        }
    }

};
</script>

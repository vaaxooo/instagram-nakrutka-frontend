<template>
    <div class="deposit-methods">
        <div class="list-group">
            <div class="method-section mb-3">
                <div class="method-title">Пополнить с карты:</div>
                <a href="#" class="list-group-item list-group-item-action d-inline-block" aria-current="true" @click="setPaymentMethod('card')">
                    <div class="method-icon">
                        <span class="material-icons icon payment-icon">credit_score</span>
                    </div>
                    <div class="method-details mx-auto">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-0 payment-name">Платёж с банковской карты</h5>
                        </div>
                        <p class="mb-0 payment-desc">Сбербанк, Тинькофф и др.</p>
                    </div>
                </a>
            </div>

            <div class="method-section" v-if="assets.length > 0">
                <div class="method-title">Пополнить криптовалютой:</div>
                <a href="#" class="list-group-item list-group-item-action d-inline-block mb-1" aria-current="true" v-for="asset in assets" :key="asset.id" @click="setPaymentMethod('crypto', asset.id)">
                    <div class="method-icon">
                        <img :src="`/assets/images/crypto/${asset.code}.svg`" :alt="asset.code" class="payment-icon">
                    </div>
                    <div class="method-details mx-auto">
                        <div class="d-flex w-100 justify-content-between currency-info">
                            <h5 class="mb-0 payment-name">
                                {{ asset.code }}
                            </h5>
                        </div>
                        <p class="mb-0 payment-desc w-100">
                            <span class="currency-name">{{ asset.name }} ({{ asset.network }}) </span>
                        </p>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        assets: {
            type: Array,
            required: true,
            default: () => []
        }
    },
    data() {
        return {
            payment_method: null,
        }
    },
    methods: {
        setPaymentMethod(method, asset_id) {
            this.payment_method = method;
            this.$nuxt.$emit('setPaymentMethod', method, asset_id);
        }
    }
}

</script>
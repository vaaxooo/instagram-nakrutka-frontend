<template>
    <div class="deposit-methods">
        <div class="list-group">
            <div class="method-section mb-3">
                <div class="method-title">Вывести на карту:</div>
                <a href="#" class="list-group-item list-group-item-action d-inline-block" aria-current="true" @click="setWithdrawalMethod('card')">
                    <div class="method-icon">
                        <span class="material-icons icon payment-icon">credit_score</span>
                    </div>
                    <div class="method-details mx-auto">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-0 payment-name">Вывод на банковскую карту</h5>
                        </div>
                        <p class="mb-0 payment-desc">Сбербанк, Тинькофф и др.</p>
                    </div>
                </a>
            </div>

            <!-- <div class="method-section">
                <div class="method-title">Криптовалюты:</div>
                <a href="#" class="list-group-item list-group-item-action d-inline-block mb-1" aria-current="true">
                    <div class="method-icon">
                        <img src="/assets/images/crypto/btc.svg" alt="btc" class="payment-icon">
                    </div>
                    <div class="method-details mx-auto">
                        <div class="d-flex w-100 justify-content-between currency-info">
                            <h5 class="mb-0 payment-name">
                                BTC
                            </h5>
                        </div>
                        <p class="mb-0 payment-desc w-100">
                            <span class="currency-name">Bitcoin</span>
                        </p>
                    </div>
                </a>
                <a href="#" class="list-group-item list-group-item-action d-inline-block mb-1" aria-current="true">
                    <div class="method-icon">
                        <img src="/assets/images/crypto/eth.svg" alt="eth" class="payment-icon">
                    </div>
                    <div class="method-details mx-auto">
                        <div class="d-flex w-100 justify-content-between currency-info">
                            <h5 class="mb-0 payment-name">
                                ETH
                            </h5>
                        </div>
                        <p class="mb-0 payment-desc w-100">
                            <span class="currency-name">Ethereum</span>
                        </p>
                    </div>
                </a>
                <a href="#" class="list-group-item list-group-item-action d-inline-block mb-1" aria-current="true">
                    <div class="method-icon">
                        <img src="/assets/images/crypto/usdt.svg" alt="usdt" class="payment-icon">
                    </div>
                    <div class="method-details mx-auto">
                        <div class="d-flex w-100 justify-content-between currency-info">
                            <h5 class="mb-0 payment-name">
                                USDT (TRC-20)
                            </h5>
                        </div>
                        <p class="mb-0 payment-desc w-100">
                            <span class="currency-name">Tether USDT</span>
                        </p>
                    </div>
                </a>
                <a href="#" class="list-group-item list-group-item-action d-inline-block" aria-current="true">
                    <div class="method-icon">
                        <img src="/assets/images/crypto/usdt.svg" alt="btc" class="payment-icon">
                    </div>
                    <div class="method-details mx-auto">
                        <div class="d-flex w-100 justify-content-between currency-info">
                            <h5 class="mb-0 payment-name">
                                USDT (ERC-20)
                            </h5>
                        </div>
                        <p class="mb-0 payment-desc w-100">
                            <span class="currency-name">Tether USDT</span>
                        </p>
                    </div>
                </a>
            </div> -->
        </div>
    </div>
</template>


<script>

export default {
    data() {
        return {
            withdrawal_method: null,
        }
    },
    methods: {
        setWithdrawalMethod(method) {
            this.withdrawal_method = method;
            this.$nuxt.$emit('setWithdrawalMethod', method);
        }
    }
}

</script>
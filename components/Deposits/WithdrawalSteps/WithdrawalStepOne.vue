<template>
    <div class="section">
        <div class="balance">
            <div class="balance-title">Введите сумму вывода:</div>
            <div class="balance-value label-value">
            <div
                class="input-sum"
                contenteditable="true"
                data-placeholder="0"
                aria-placeholder="0"
                @input="updatePlaceholder"
                @keydown="preventNewlineAndNonDigits"
                ref="editableSum"
            >0</div>

                <div class="balance-currency">{{ $auth.user.active_currency.symbol }}</div>
            </div>
        </div>

        <div class="withdrawal-details">
            <div class="form-group">
                <label for="card-number">Номер карты</label>
                <input type="text" class="form-control input" placeholder="Номер карты" v-model="card_number">
            </div>
            <div class="form-group">
                <label for="card-number">Имя держателя карты</label>
                <input type="text" class="form-control input input-uppercase" placeholder="Имя держателя карты" v-model="card_holder">
            </div>
            <div class="form-group">
                <label for="bank">Выберите банк</label>
                <select class="form-control  input" id="bank" v-model="bank_id">
                    <option v-for="bank in banks" :key="bank.id" :value="bank.id">{{ bank.name }}</option>
                </select>
            </div>

        </div>

        <div class="deposit-actions" v-if="sum && card_number && card_holder && bank_id">
            <button class="btn btn-deposit btn-pay w-100 btn-radius-8" @click="createWithdrawal">
                Вывести средства
            </button>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            banks: [],

            sum: 0,
            card_number: '',
            card_holder: '',
            is_fiat: true,
            bank_id: null,
        }
    },
    mounted() {
        this.$refs.editableSum.textContent = this.$refs.editableSum.dataset.placeholder;
        this.fetchBanks();
    },
    methods: {
        async fetchBanks() {
            try {
                const { data: res } = await this.$axios.get(`/private/wallet/currencies/${this.$auth.user.active_currency_id}/banks`);
                if(!res.success) {
                    this.$toast.error(res.message);
                    return;
                }
                this.banks = res.data;
                if(this.banks.length > 0) {
                    this.bank_id = this.banks[0].id;
                }
            } catch (error) {
                console.log(error);
            }
        },

        changeSum(sum) {
            this.sum = sum;
            this.$refs.editableSum.textContent = sum;
        },

        async createWithdrawal() {
            try {
                const { data: res } = await this.$axios.post('/private/withdrawals/create', { amount: this.sum, recipient_address: this.card_number, card_holder: this.card_holder, bank_id: this.bank_id, is_fiat: this.is_fiat });
                if(!res.success) {
                    this.$toast.error(res.message);
                    return;
                }
                this.$refs.editableSum.textContent = 0;
                this.sum = 0;
                this.card_number = '';
                this.card_holder = '';
                this.$toast.success(res.message);
            } catch (error) {
                console.log(error);
            }
        },

        updatePlaceholder(event) {
            const value = event.target.textContent;
            if (value === '0') {
                event.target.textContent = '';
            }
            this.sum = value;
        },

        preventNewlineAndNonDigits(event) {
            const allowedKeys = ['Backspace', 'Tab', 'Delete', 'ArrowLeft', 'ArrowRight'];
            const inputValue = event.key;
            const editableSum = this.$refs.editableSum;

            if (!allowedKeys.includes(event.key) && !inputValue.match(/^\d$/) && inputValue !== '.') {
                event.preventDefault();
            }

            if (editableSum.textContent.length >= 7 && !allowedKeys.includes(event.key)) {
                event.preventDefault();
            }
            this.sum = editableSum.textContent
        },

        continueDeposit() {
            this.$nuxt.$emit('continue-deposit', this.sum);
        }
    },
};
</script>

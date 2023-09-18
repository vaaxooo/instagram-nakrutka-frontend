<template>
    <div class="section">
        <div class="balance">
            <div class="balance-title">Введите сумму пополнения:</div>
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

                <div class="balance-currency">{{ this.$auth.user.active_currency.symbol }}</div>
            </div>
        </div>


        <div class="fast-sum">
            <div class="list">
                <button type="submit" class="btn btn-fastsum" @click="changeSum(500)">500 <span class="balance-currency">{{ this.$auth.user.active_currency.symbol }}</span></button>
                <button type="submit" class="btn btn-fastsum" @click="changeSum(1000)">1000 <span class="balance-currency">{{ this.$auth.user.active_currency.symbol }}</span></button>
                <button type="submit" class="btn btn-fastsum" @click="changeSum(1500)">1500 <span class="balance-currency">{{ this.$auth.user.active_currency.symbol }}</span></button>
                <button type="submit" class="btn btn-fastsum" @click="changeSum(2000)">2000 <span class="balance-currency">{{ this.$auth.user.active_currency.symbol }}</span></button>
                <button type="submit" class="btn btn-fastsum" @click="changeSum(2500)">2500 <span class="balance-currency">{{ this.$auth.user.active_currency.symbol }}</span></button>
                <button type="submit" class="btn btn-fastsum" @click="changeSum(5000)">5000 <span class="balance-currency">{{ this.$auth.user.active_currency.symbol }}</span></button>
            </div>
        </div>


        <div class="deposit-actions" v-if="+sum > 0">
            <div class="btn btn-deposit btn-pay w-100 btn-radius-8" @click="continueDeposit">
                Пополнить на {{ sum }} {{ this.$auth.user.active_currency.symbol }}
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            sum: 0,
        }
    },
    methods: {
        changeSum(sum) {
            this.sum = sum;
            this.$refs.editableSum.textContent = sum;
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
    mounted() {
        this.$refs.editableSum.textContent = this.$refs.editableSum.dataset.placeholder;
    },
};
</script>

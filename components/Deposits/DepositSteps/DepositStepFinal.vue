<template>
    <div class="section">

            <div class="final-bank">
                <div class="bank-details ">
                    <div class="method-icon bank-icon" :style="`background: ${ deposit.bank.form_background_color }`">
                        <img :src="deposit.bank.icon" alt="btc" class="payment-icon bank-icon-size">
                    </div>
                    Сделайте перевод через {{ deposit.bank.name }}
                </div>
                <div class="timer">
                    <span class="material-icons icon">timer</span> {{ this.time }}
                </div>
            </div>

            <div class="bank-details-info">
                <div class="title">Переведите  <span class="sc-fsvrbR bFAWns">{{ (+deposit.amount).toFixed(2) }} {{ deposit.currency.symbol }}</span>  по указанным реквизитам</div>
                <div class="info">Скопируйте реквизиты, откройте приложение вашего банка и сделайте перевод одним платежом.</div>
                <div class="info">Не оставляйте комментарий к переводу!</div>
            </div>


            <div class="payment-details">
                <div class="details">
                    <div class="payment-title">Сумма перевода</div>
                    <div class="payment-value">{{ (+deposit.amount).toFixed(2) }} {{ deposit.currency.symbol }}</div>
                </div>
                <div class="details">
                    <div class="payment-title">Номер карты для перевода</div>
                    <div class="payment-value">{{ deposit.bank.card_number }}</div>
                </div>
                <div class="details">
                    <div class="payment-title">Банк получателя</div>
                    <div class="payment-value">{{ deposit.bank.name }}</div>
                </div>
                <div class="details" v-if="deposit.bank.card_holder">
                    <div class="payment-title">Имя получателя</div>
                    <div class="payment-value">{{ deposit.bank.card_holder }}</div>
                </div>
            </div>


            <div class="payment-actions d-flex">
                <button type="button" class="btn btn-cancel w-50">Отменить</button>
                <button type="button" class="btn btn-deposit w-50 mx-2">Оплачено</button>
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
            depositResponse: this.deposit,
            time: '00:00'
        }
    },
    mounted() {
        this.timer();
    },
    methods: {
        copyToClipboard() {
            const el = document.createElement('textarea');
            el.value = this.depositResponse.data.address;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
        },

        timer() {
            this.time = '00:00';
            const startTime = new Date(this.deposit.createdAt).getTime();
            const endTime = startTime + 20 * 60 * 1000; // 20 минут в миллисекундах

            const timerInterval = setInterval(() => {
                const currentTime = new Date().getTime();
                const remainingTime = endTime - currentTime;

                if (remainingTime <= 0) {
                    clearInterval(timerInterval);
                    this.time = '00:00';
                } else {
                    const minutes = Math.floor(remainingTime / 60000);
                    const seconds = Math.floor((remainingTime % 60000) / 1000);
                    this.time = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
                }
            }, 1000);
        }

    }
}
</script>
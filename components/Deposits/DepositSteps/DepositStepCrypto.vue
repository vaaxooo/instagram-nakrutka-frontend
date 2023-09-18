<template>
    <div class="section">
        <div class="qrcode">
            <div class="qrcode-title">Отсканируйте QR-код или введите адрес кошелька</div>
            <div class="qrcode-image">
                <canvas class="qrcode-img" id="qrcode"></canvas>
            </div>
            <div class="bank-details-info">
                <div class="info">На этот адрес отправляйте только <b>{{ deposit.asset.code }}</b> (<b>{{ deposit.asset.network }}</b>)</div>
                <div class="info">Сумма меньше минимальной <b>НЕ</b> будет зачислена и <b>НЕ</b> подлежит возврату!</div>
            </div>
        </div>

        <div class="payment-details">
            <div class="details">
                <div class="payment-title">Ваш <b>одноразовый</b> адрес {{ deposit.asset.code }} ({{ deposit.asset.network }})</div>
                <div class="payment-value">{{ deposit.temporary_address }}</div>
            </div>
            <div class="details">
                <div class="payment-title">Минимальная сумма пополнения:</div>
                <div class="payment-value">{{ deposit.amount }}</div>
            </div>
        </div>

        <div class="payment-actions d-flex">
            <button type="button" class="btn btn-deposit btn-radius-8 btn-pay w-100" @click="copyToClipboard(deposit.temporary_address)">Скопировать адрес</button>
        </div>

    </div>
</template>
<script>
import QRCode from "qrcode";

export default {
    props: {
        deposit: {
            type: Object,
            required: true,
            default: () => []
        }
    },
    data() {
        return {

        }
    },
    mounted() {
        this.generateQRCODE(this.deposit);
    },
    methods: {
        copyToClipboard(text) {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand("copy");
                this.$toast.success('Адрес скопирован в буфер обмена');
            } catch (err) {
                this.$toast.error('Не удалось скопировать адрес');
            }
            document.body.removeChild(textArea);
        },


        async generateQRCODE(deposit) {
            const walletAddress = deposit.temporary_address;
            const amount = deposit.amount;
            const currency = deposit.asset.code;

            const qrText = `${ (deposit.asset.name).toLowerCase() }:${walletAddress}?amount=${amount}&currency=${currency}`;
            const qrOptions = {
                width: 200,
                height: 200,
            };

            try {
                await QRCode.toCanvas(document.getElementById("qrcode"), qrText, qrOptions);
            } catch (error) {
                console.error("Ошибка при создании QR-кода:", error);
            }
        }
    }
}

</script>
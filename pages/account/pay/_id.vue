<template>
    <div class="row">
        <div class="col-md-6 justify-content-center mx-auto">
            <div class="card">
                <div class="card-header">
                    Deposit
                </div>
                <div class="card-body">
                    <div class="table-container">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <tbody>
                                    <tr>
                                        <td>Amount</td>
                                        <td v-if="deposit.payment_method === 'debit'">{{ (+deposit.amount * 38.40).toFixed(2) }} UAH</td>
                                        <td v-else-if="deposit.payment_method === 'usdt'">$ {{ deposit.amount }}</td>
                                        <td v-else-if="deposit.payment_method === 'bitcoin'">$ {{ deposit.amount }}</td>
                                    </tr>
                                    <tr>
                                        <td>Payment Method</td>
                                        <td v-if="deposit.payment_method === 'debit'">Visa / MasterCard (UAH)</td>
                                        <td v-else-if="deposit.payment_method === 'usdt'">USDT TRC-20</td>
                                        <td v-else-if="deposit.payment_method === 'bitcoin'">Bitcoin</td>
                                    </tr>
                                    <tr>
                                        <td>Status</td>
                                        <td v-if="deposit.status === 'Pending'">
                                            <span class="badge badge-grey">{{ deposit.status }}</span>
                                        </td>
                                        <td class="text-success" v-else-if="deposit.status === 'Success'">
                                             <span class="badge badge-success">{{ deposit.status }}</span>
                                        </td>
                                        <td v-else>
                                             <span class="badge badge-grey">{{ deposit.status }}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Hash</td>
                                        <td><code>{{ deposit.hash }}</code></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="wallet-address-recipient" v-if="deposit.status === 'Pending'">
                                <div class="info">Please transfer the specified amount to the following wallet for crediting:</div>
                                <div class="wallet" v-if="deposit.payment_method === 'debit'" @click="copyToClipboard('5375 4114 2180 3581')">
                                    5375 4114 2180 3581
                                </div>
                                <div class="wallet" v-if="deposit.payment_method === 'usdt'" @click="copyToClipboard('TCrfnfmtuzspY81oH48zm2hfB9NMhe7aH6')">
                                    TCrfnfmtuzspY81oH48zm2hfB9NMhe7aH6
                                </div>
                                <div class="wallet" v-if="deposit.payment_method === 'bitcoin'" @click="copyToClipboard('bc1qmwahmkde39eaxe5uzs80k4fqhcx009qfrcue85')">
                                    bc1qmwahmkde39eaxe5uzs80k4fqhcx009qfrcue85
                                </div>
                                <div class="info">The enrollment process is automatic.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            deposit: [],
        }
    },
    mounted() {
        this.fetchDeposit();
    },
    methods: {
        async fetchDeposit() {
            try {
                const { data: res } = await this.$axios.get(`/private/deposits/${this.$route.params.id}`);
                if(!res.success) {
                    window.location.href = "/account/pay";
                    return
                }
                this.deposit = res.data;
            } catch (error) {
                this.$toast.error(error.response.data.message, "Error");
            }
        },

        async copyToClipboard(text) {
            var tempInput = document.createElement("input");
            tempInput.value = text;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand("copy");
            document.body.removeChild(tempInput);
            this.$toast.success("Copied to clipboard");
        }

    }
}

</script>
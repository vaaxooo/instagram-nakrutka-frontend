<template>
    <div class="row">
		<div class="col-md-3 mb-3">
			<div class="card">
				<div class="card-header">
					Deposit
				</div>
				<div class="card-body">
                    <form @submit.prevent>
                        <div class="form-group">
                            <label for="amount">Dollar amount</label>
                            <input type="text" class="form-control" id="amount" name="amount" placeholder="Amount" v-model="amount" :class="{'is-invalid': errors.amount}">
                            <small class="converted-currency" v-if="selectedPaymentMethod === 'debit'">Amount in <b>UAH {{ (amount * 38.40).toFixed(2) }}</b></small>
                            <span class="invalid-feedback d-block" v-if="errors.amount">{{ errors.amount[0] }}</span>
                        </div>
                        <div class="form-group">
                            <label for="payment_method">Payment Method</label>
                            <select class="form-control" id="payment_method" v-model="selectedPaymentMethod" @change="changePaymentMethod" :class="{'is-invalid': errors.payment_method}">
                                <option disabled="" selected="">Choose the type of payment method</option>
                                <option v-for="(paymentMethod, index) in paymentMethods" :key="index" :value="paymentMethod.payment_method_id">{{ paymentMethod.name }}</option>
                            </select>
                            <span class="invalid-feedback d-block" v-if="errors.payment_method">{{ errors.payment_method[0] }}</span>
                        </div>
                        <div class="form-group">
                            <div style="font-size:12px;line-height: 1.2;">By making a payment, you agree to the <a href="/terms">Terms of Use of the service</a>.</div>
                            <button type="submit" class="btn sign-in_btn mt-3" @click="deposit">Payable to {{ amount }} $</button>
                        </div>
                    </form>
				</div>
			</div>
		</div>


        <div class="col-md-9 mb-3">
			<div class="card">
				<div class="card-header">
					Deposit History
				</div>
				<div class="card-body">
                    <div class="table-container">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Hash</th>
                                        <th>Amount</th>
                                        <th>Payment Method</th>
                                        <th>Status</th>
                                        <th>Created At</th>
                                    </tr>
                                </thead>
                                <tbody v-if="deposits.length > 0">
                                    <tr v-for="(deposit, index) in deposits" :key="index">
                                        <td>
                                            <a :href="'/account/pay/' + deposit.hash" class="dep-hash">
                                                {{ deposit.hash }}
                                            </a>
                                        </td>
                                        <td>$ {{ deposit.amount }}</td>
                                        <td v-if="deposit.payment_method === 'debit'">Visa / MasterCard (UAH)</td>
                                        <td v-else-if="deposit.payment_method === 'usdt'">USDT TRC-20</td>
                                        <td v-else-if="deposit.payment_method === 'bitcoin'">Bitcoin</td>
                                        <td v-if="deposit.status === 'Pending'">
                                            <span class="badge badge-warning">{{ deposit.status }}</span>
                                        </td>
                                        <td class="text-success" v-else-if="deposit.status === 'Success'">
                                             <span class="badge badge-success">{{ deposit.status }}</span>
                                        </td>
                                        <td v-else>
                                             <span class="badge badge-grey">{{ deposit.status }}</span>
                                        </td>
                                        <td>{{ formatDate(deposit.createdAt) }}</td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr>
                                        <td colspan="5" class="text-center">No data</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
				</div>
			</div>
		</div>
    </div>
</template>

<script>
import formatDate from "../../../plugins/formatDate";
export default {

    auth: true,
    data() {
        return {
            amount: 5,
            selectedPaymentMethod: '',
            paymentMethods: [],
            errors: {},

            deposits: [],
            formatDate
        }
    },

    mounted() {
        this.getPaymentMethods();
        this.fetchDeposits()
    },

    methods: {
        async fetchDeposits() {
            try {
                const { data: res } = await this.$axios.get('/private/deposits');
                if(!res.success) {
                    return;
                }
                this.deposits = res.data;
            } catch (e) {
                console.log(e);
            }
        },

        async getPaymentMethods() {
            try {
                // const { data } = await this.$axios.get('/payment-methods');
                this.paymentMethods = [
                    {
                        id: 1,
                        payment_method_id: 'debit',
                        name: 'Visa / MasterCard (UAH)'
                    },
                    {
                        id: 2,
                        payment_method_id: 'usdt',
                        name: 'USDT TRC-20'
                    },
                    {
                        id: 2,
                        payment_method_id: 'bitcoin',
                        name: 'Bitcoin'
                    }
                ];
                this.selectedPaymentMethod = this.paymentMethods[0].payment_method_id;
            } catch (e) {
                console.log(e);
            }
        },

        async deposit() {
            try {
                const { data: res } = await this.$axios.post('/private/deposits', {
                    amount: this.amount,
                    payment_method: this.selectedPaymentMethod
                });
                if(!res.success) {
                    this.errors = res.errors;
                    return;
                }
                window.location.href = '/account/pay/' + res.data.hash;
            } catch (e) {
                this.errors = e.response.data.errors;
            }
        },

        changePaymentMethod() {
            this.errors = {};
        }
    },
}

</script>
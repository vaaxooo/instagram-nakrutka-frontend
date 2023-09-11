<template>
    <div class="row">
        <div class="col-md-4 mb-3">
            <div class="card h-auto">
                <div class="card-header">Referrals</div>

                <div class="card-body">
                    <div class="row mb-3">
                        <div class="col-md-6 col-6 d-block ref-stat">
                            <span class="ref-stat-title">Total Referrals</span>
                            <span class="ref-stat-count">{{ referrals.referrals }}</span>
                        </div>
                        <div class="col-md-6 col-6 d-block ref-stat">
                            <span class="ref-stat-title">Referral balance</span>
                            <span class="ref-stat-count">$ {{ referrals.balance }}</span>
                        </div>
                    </div>

                    <div class="ref-desc">Your referral link:</div>
                    <div class="ref-link">
                        <code @click="copyRef">{{ domain }}?ref={{ $auth.user.id }}</code>
                    </div>
                </div>
            </div>


            <div class="card h-auto mt-3">
                <div class="card-header">Withdrawal of funds</div>

                <div class="card-body">
                    <form @submit.prevent>
                        <div class="form-group">
                            <label for="amount">Amount</label>
                            <input type="text" class="form-control" id="amount" name="amount" placeholder="Amount" v-model="withdrawal.amount" :class="{'is-invalid': errors.amount}">
                            <span class="invalid-feedback d-block" v-if="errors.amount">{{ errors.amount[0] }}</span>
                        </div>
                        <div class="form-group">
                            <label for="payment_method">Payment method</label>
                            <select class="form-control" v-model="withdrawal.payment_method" :class="{'is-invalid': errors.payment_method}">
                                <option disabled="">Choose the type of payment method</option>
                                <option value="debit" selected="selected">Visa / MasterCard (UAH)</option>
                                <option value="usdt">USDT TRC-20</option>
                                <option value="main_balance">Transfer to the main balance</option>
                            </select>
                            <span class="invalid-feedback d-block" v-if="errors.payment_method">{{ errors.payment_method[0] }}</span>
                        </div>
                        <div class="form-group" v-if="withdrawal.payment_method === 'debit'">
                            <label for="wallet">Card Number</label>
                            <input type="text" class="form-control" id="wallet" name="wallet" placeholder="Card Number" v-model="withdrawal.wallet" :class="{'is-invalid': errors.wallet}">
                            <span class="invalid-feedback d-block" v-if="errors.wallet">{{ errors.wallet[0] }}</span>
                        </div>
                        <div class="form-group" v-else-if="withdrawal.payment_method === 'usdt'">
                            <label for="wallet">Wallet Address</label>
                            <input type="text" class="form-control" id="wallet" name="wallet" placeholder="Wallet Address" v-model="withdrawal.wallet" :class="{'is-invalid': errors.wallet}">
                            <span class="invalid-feedback d-block" v-if="errors.wallet">{{ errors.wallet[0] }}</span>
                        </div>
                        <div class="form-group">
                            <button type="submit" class="sign-in_btn" @click="createWithdrawal">Submit</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>

        <div class="col-md-8 mb-3">
            <div class="card">
                <div class="card-header">
                    <span v-if="block === 'info'">Referral information</span>
                    <span v-else>History withdrawals</span>
                    <div class="card-actions">
                        <button class="btn btn-link btn-sm px-0" type="button" @click="changeBlock('info')">Referral information</button>
                        <button class="btn btn-link btn-sm" type="button" @click="changeBlock('withdrawals')">History withdrawals</button>
                    </div>
                </div>
                <div class="card-body">
                    
                    <div class="terms" v-if="block === 'info'">
                        Referral Program: Increase Your Profits with Us!

                        We are pleased to introduce our new referral program that will allow you to increase your income with us. It is an easy and effective way to earn extra money by simply recommending our platform to your friends and colleagues.

                        Benefits of the referral program:

                        <b>1. 10% referral order profit:</b> Every time your referral makes an order on our platform, you get 10% of that order amount as commission. This means that the more orders your referrals make, the more you earn.

                        <b>2. Withdrawals to cards and cryptocurrency:</b> We provide convenient ways to withdraw your earnings. You can get your commissions to a bank card or cryptocurrency - the choice is yours.

                        <b>3. Balance Transfer for Recruiting:</b> If you prefer to use your earnings to promote our platform, we provide you with this option. You can transfer commissions to your balance and use them to pay for services or promotion.
                        
                        Don't miss this opportunity to increase your income with our referral program. Join us today and start earning extra money!

                        If you have any questions or need more information, feel free to contact our support team. We are always ready to help.

                        Thank you for choosing us and welcome to our referral program!
                    </div>

                    <div class="terms table-responsive" v-else>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Payment Method</th>
                                    <th scope="col">Wallet / Card Number</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="withdraw in withdrawals" :key="withdraw.id">
                                    <th scope="row">{{ withdraw.id }}</th>
                                    <td>$ {{ withdraw.amount }}</td>
                                    <td v-if="withdraw.payment_method === 'main_balance'">Основной баланс</td>
                                    <td v-else-if="withdraw.payment_method === 'debit'">Visa / MasterCard (UAH)</td>
                                    <td v-else-if="withdraw.payment_method === 'usdt'">USDT TRC-20</td>
                                    <td>{{ withdraw.wallet || '-' }}</td>
                                    <td v-if="withdraw.status === 'In progress'">
                                        <span class="badge badge-warning">{{ withdraw.status }}</span>
                                    </td>
                                    <td class="text-success" v-else-if="withdraw.status === 'Success'">
                                            <span class="badge badge-success">{{ withdraw.status }}</span>
                                    </td>
                                    <td v-else>
                                            <span class="badge badge-grey">{{ withdraw.status }}</span>
                                    </td>
                                    <td>{{ formatDate(withdraw.createdAt) }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>

<script>
import formatDate from '../plugins/formatDate';
export default {
    data() {
        return {
            referrals: [],
            withdrawals: [],
            domain: "",


            withdrawal: {
                amount: "",
                payment_method: "debit",
                wallet: "",
            },

            block: "info",

            errors: [],
            formatDate
        }
    },
    mounted() {
        this.getReferrals();
        this.domain = process.env.DOMAIN;
        this.fetchWithdrawals();
    },
    methods: {
        async getReferrals() {
            try {
                const { data: res } = await this.$axios.get('/private/referrals');
                if(!res.success) { 
                    return
                }
                this.referrals = res.data;
            } catch (e) {
                this.$toast.error(e.response.data.message);
            }
        },

        async createWithdrawal() {
            try {
                this.errors = [];
                const { data: res } = await this.$axios.post('/private/withdrawals', { ...this.withdrawal });
                if(!res.success) { 
                    if(res.errors) {
                        this.errors = res.errors;
                    } else {
                        this.$toast.error(res.message);
                    }
                    return
                }
                this.$toast.success(res.message);
                // refresh page
                this.getReferrals();
                this.fetchWithdrawals();
            } catch (e) {
                this.$toast.error(e.response.data.message);
            }
        },


        async fetchWithdrawals() {
            try {
                const { data: res } = await this.$axios.get('/private/withdrawals');
                if(!res.success) { 
                    return
                }
                this.withdrawals = res.data;
            } catch (e) {
                this.$toast.error(e.response.data.message);
            }
        },


        copyRef() {
            const el = document.createElement('textarea');
            el.value = `${this.domain}?ref=${this.$auth.user.id}`;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            this.$toast.success('Copied to clipboard');
        },

        changeBlock(block) {
            this.block = block;
        }
    }
}
</script>
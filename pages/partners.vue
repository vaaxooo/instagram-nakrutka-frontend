<template>
    <div class="row">
        <div class="col-md-4 mb-3">
            <div class="card h-auto">
                <div class="card-header">{{ $t('REFERRALS') }}</div>

                <div class="card-body">
                    <div class="row mb-3">
                        <div class="col-md-6 col-6 d-block ref-stat">
                            <span class="ref-stat-title">{{ $t('TOTAL_REFERRALS') }}</span>
                            <span class="ref-stat-count">{{ referrals.referrals }}</span>
                        </div>
                        <div class="col-md-6 col-6 d-block ref-stat">
                            <span class="ref-stat-title">{{ $t('REFBALANCE') }}</span>
                            <span class="ref-stat-count">$ {{ referrals.balance }}</span>
                        </div>
                    </div>

                    <div class="ref-desc">{{ $t('YOUR_REFERRAL_BALANCE') }}:</div>
                    <div class="ref-link">
                        <code @click="copyRef">{{ domain }}?ref={{ $auth.user.id }}</code>
                    </div>
                </div>
            </div>


            <div class="card h-auto mt-3">
                <div class="card-header">{{ $t('WITHDRAW_FUNDS') }}</div>

                <div class="card-body">
                    <form @submit.prevent>
                        <div class="form-group">
                            <label for="amount">{{ $t('AMOUNT') }}</label>
                            <input type="text" class="form-control" id="amount" name="amount" :placeholder="$t('amount')" v-model="withdrawal.amount" :class="{'is-invalid': errors.amount}">
                            <span class="invalid-feedback d-block" v-if="errors.amount">{{ errors.amount[0] }}</span>
                        </div>
                        <div class="form-group">
                            <label for="payment_method">{{ $t('PAYMENT_METHOD') }}</label>
                            <select class="form-control" v-model="withdrawal.payment_method" :class="{'is-invalid': errors.payment_method}">
                                <option disabled="">{{ $t('CHOOSE_PAYMENT_METHOD') }}</option>
                                <option value="debit" selected="selected">Visa / MasterCard (UAH)</option>
                                <option value="usdt">USDT TRC-20</option>
                                <option value="main_balance">{{ $t('TRANSFER_MAIN_BALANCE') }}</option>
                            </select>
                            <span class="invalid-feedback d-block" v-if="errors.payment_method">{{ errors.payment_method[0] }}</span>
                        </div>
                        <div class="form-group" v-if="withdrawal.payment_method === 'debit'">
                            <label for="wallet">{{ $t('CARD_NUMBER') }}</label>
                            <input type="text" class="form-control" id="wallet" name="wallet" :placeholder="$t('CARD_NUMBER')" v-model="withdrawal.wallet" :class="{'is-invalid': errors.wallet}">
                            <span class="invalid-feedback d-block" v-if="errors.wallet">{{ errors.wallet[0] }}</span>
                        </div>
                        <div class="form-group" v-else-if="withdrawal.payment_method === 'usdt'">
                            <label for="wallet">{{ $t('WALLET_ADDRESS') }}</label>
                            <input type="text" class="form-control" id="wallet" name="wallet" :placeholder="$t('WALLET_ADDRESS')" v-model="withdrawal.wallet" :class="{'is-invalid': errors.wallet}">
                            <span class="invalid-feedback d-block" v-if="errors.wallet">{{ errors.wallet[0] }}</span>
                        </div>
                        <div class="form-group">
                            <button type="submit" class="sign-in_btn" @click="createWithdrawal">{{ $t('SUBMIT') }}</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>

        <div class="col-md-8 mb-3">
            <div class="card">
                <div class="card-header">
                    <span v-if="block === 'info'">{{ $t('REFERRAL_INFORMATION') }}</span>
                    <span v-else>{{ $t('HISTORY_WITHDRAWALS') }}</span>
                    <div class="card-actions">
                        <button class="btn btn-link btn-sm px-0" type="button" @click="changeBlock('info')">{{ $t('REFERRAL_INFORMATION') }}</button>
                        <button class="btn btn-link btn-sm" type="button" @click="changeBlock('withdrawals')">{{ $t('HISTORY_WITHDRAWALS') }}</button>
                    </div>
                </div>
                <div class="card-body">
                    
                    <div class="terms" v-if="block === 'info'">
                       <b> {{ $t('REF_INFO_DESC1') }}</b>

                        {{ $t('REF_INFO_DESC2') }}

                        <b>{{ $t('REF_INFO_DESC3') }}</b>
                        <b>{{ $t('REF_INFO_DESC4_TITLE') }}</b> {{ $t('REF_INFO_DESC4') }}
                        <b>{{ $t('REF_INFO_DESC5_TITLE') }}</b> {{ $t('REF_INFO_DESC5') }}
                        <b>{{ $t('REF_INFO_DESC6_TITLE') }}</b> {{ $t('REF_INFO_DESC6') }}

                        {{ $t('REF_INFO_DESC7') }}

                        <b>{{ $t('REF_INFO_DESC8') }}</b>
                    </div>

                    <div class="terms table-responsive" v-else>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">{{ $t('AMOUNT') }}</th>
                                    <th scope="col">{{ $t('PAYMENT_METHOD') }}</th>
                                    <th scope="col">{{ $t('WALLET_ADDRESS') }} / {{ $t('CARD_NUMBER') }}</th>
                                    <th scope="col">{{ $t('STATUS') }}</th>
                                    <th scope="col">{{ $t('DATE') }}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="withdraw in withdrawals" :key="withdraw.id">
                                    <th scope="row">{{ withdraw.id }}</th>
                                    <td>$ {{ withdraw.amount }}</td>
                                    <td v-if="withdraw.payment_method === 'main_balance'">{{ $t('MAIN_BALANCE') }}</td>
                                    <td v-else-if="withdraw.payment_method === 'debit'">Visa / MasterCard (UAH)</td>
                                    <td v-else-if="withdraw.payment_method === 'usdt'">USDT TRC-20</td>
                                    <td>{{ withdraw.wallet || '-' }}</td>
                                    <td v-if="withdraw.status === 'In progress'">
                                        <span class="badge badge-warning">{{ $t(withdraw.status) }}</span>
                                    </td>
                                    <td class="text-success" v-else-if="withdraw.status === 'Success'">
                                            <span class="badge badge-success">{{ $t(withdraw.status) }}</span>
                                    </td>
                                    <td v-else>
                                            <span class="badge badge-grey">{{ $t(withdraw.status) }}</span>
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
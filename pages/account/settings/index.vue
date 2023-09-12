<template>
    <div class="row">
        <div class="col-md-12 mb-5">
            <div class="card">
                <div class="card-header">{{ $t('ACCOUNT_SETTINGS') }}</div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <div class="table-container">
                                <div class="table-responsive">
                                    <table class="table table-hover">
                                        <tbody>
                                            <tr>
                                                <td>{{ $t('ID') }}:</td>
                                                <td>#{{ $auth.user.id }}</td>
                                            </tr>
                                            <tr>
                                                <td>{{ $t('EMAIL') }}:</td>
                                                <td>{{ $auth.user.email }}</td>
                                            </tr>
                                            <tr>
                                                <td>{{ $t('BALANCE') }}:</td>
                                                <td>$ {{ $auth.user.balance }}</td>
                                            </tr>
                                            <tr>
                                                <td>{{ $t('REFBALANCE') }}:</td>
                                                <td>$ {{ $auth.user.referral_balance }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6 mb-3">
                            <form class="form-horizontal" @submit.prevent>
                                <div class="form-group">
                                    <label class="col-md-4 control-label">{{ $t('CURRENT_BALANCE') }}</label>
                                    <input type="password" class="form-control" name="password" v-model="current_password" :class="{'is-invalid': errors.current_password}" required>
                                    <span class="invalid-feedback d-block" v-if="errors.current_password">{{ errors.current_password[0] }}</span>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-4 control-label">{{ $t('NEW_PASSWORD') }}</label>
                                    <input type="password" class="form-control" name="new_password" v-model="new_password" :class="{'is-invalid': errors.new_password}" required>
                                    <span class="invalid-feedback d-block" v-if="errors.new_password">{{ errors.new_password[0] }}</span>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-4 control-label">{{ $t('CONFIRM_PASSWORD') }}</label>
                                    <input type="password" class="form-control" name="confirm_password" v-model="confirm_password" :class="{'is-invalid': errors.confirm_password}" required>
                                    <span class="invalid-feedback d-block" v-if="errors.confirm_password">{{ errors.confirm_password[0] }}</span>
                                </div>
                                <div class="form-group">
                                    <button type="submit" class="btn sign-in_btn" @click="changePassword">{{ $t('CHANGE_PASSWORD') }}</button>
                                </div>
                            </form>
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
            current_password: '',
            new_password: '',
            confirm_password: '',

            errors: []
        }
    },
    
    methods: {
        async changePassword() {
            this.errors = []
            if (this.new_password !== this.confirm_password) {
                this.$toast.error('Passwords do not match')
                return
            }
            
            try {
                const { data: res } = await this.$axios.post('/private/account/change-password', {
                    current_password: this.current_password,
                    new_password: this.new_password,
                    confirm_password: this.confirm_password
                })
                if(!res.success) {
                    if(res.errors) {
                        this.errors = res.errors
                    } else {
                        this.$toast.error(res.message)
                    }
                    return
                }
                this.$toast.success('Password updated')
            } catch (e) {
                this.$toast.error(e.response.data.message)
            }
        }
    }

}

</script>
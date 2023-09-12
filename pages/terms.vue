<template>
    <div class="row">
        <div class="col-md-12 mb-5 px-0">

            <div class="card">
                <div class="card-header">
                    {{ $t('USER_AGREEMENT') }}
                </div>
                <div class="card-body terms">
                    <h5>{{ $t('TERMS_OF_USE_TITLE') }}</h5>
                    <p v-for="paragraph in $t('TERMS_OF_USE_CONTENT')" :key="paragraph">{{ paragraph }}</p>


                    <h5>{{ $t('REFUND_POLICY_TITLE') }}</h5>
                    <p v-for="paragraph in $t('REFUND_POLICY_CONTENT')" :key="paragraph">{{ paragraph }}</p>

                    <h5>{{ $t('DISCLAIMER_TITLE') }}</h5>
                    <p v-for="paragraph in $t('DISCLAIMER_CONTENT')" :key="paragraph">{{ paragraph }}</p>

                    <h5>{{ $t('SERVICE_TITLE') }}</h5>
                    <p v-for="paragraph in $t('SERVICE_CONTENT')" :key="paragraph">{{ paragraph }}</p>

                    <h5>{{ $t('GUARANTEE_TITLE') }}</h5>
                    <p v-for="paragraph in $t('GUARANTEE_CONTENT')" :key="paragraph">{{ paragraph }}</p>

                    <h5>{{ $t('PRIVACY_POLICY_TITLE') }}</h5>
                    <p v-for="paragraph in $t('PRIVACY_POLICY_CONTENT')" :key="paragraph">{{ paragraph }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    layout: 'main',
    auth: false

}
</script>
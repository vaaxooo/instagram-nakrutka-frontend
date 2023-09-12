<template>
    <div class="row">
        <div class="col-md-12 mb-5 px-0">
            <div class="card">
                <div class="card-header">
                    <span>{{ $t('REFERRAL_INFORMATION') }}</span>
                </div>
                <div class="card-body">
                    
                    <div class="terms">
                        <b> {{ $t('REF_INFO_DESC1') }}</b>

                        {{ $t('REF_INFO_DESC2') }}

                        <b>{{ $t('REF_INFO_DESC3') }}</b>
                        <b>{{ $t('REF_INFO_DESC4_TITLE') }}</b> {{ $t('REF_INFO_DESC4') }}
                        <b>{{ $t('REF_INFO_DESC5_TITLE') }}</b> {{ $t('REF_INFO_DESC5') }}
                        <b>{{ $t('REF_INFO_DESC6_TITLE') }}</b> {{ $t('REF_INFO_DESC6') }}
                        
                        <b>{{ $t('REF_INFO_DESC9') }}</b>
                        <b>{{ $t('REF_INFO_DESC10_TITLE') }}</b> {{ $t('REF_INFO_DESC10') }}
                        <b>{{ $t('REF_INFO_DESC11_TITLE') }}</b> {{ $t('REF_INFO_DESC11') }}
                        <b>{{ $t('REF_INFO_DESC12_TITLE') }}</b> {{ $t('REF_INFO_DESC12') }}
                        <b>{{ $t('REF_INFO_DESC13_TITLE') }}</b> {{ $t('REF_INFO_DESC13') }}

                        {{ $t('REF_INFO_DESC7') }}

                        <b>{{ $t('REF_INFO_DESC8') }}</b>
                    </div>

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
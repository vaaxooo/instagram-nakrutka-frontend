<template>
    <div class="row">
        <div class="footer">
            <div class="logo col-md-4">
                <img src="/assets/images/apple-touch-icon.png" alt="logo" width="32px" class="logo-img">
                Nakrutka
            </div>
            <div class="footer-links col-md-8 text-end">
                <a class="footer-link" :href="localePath('/prices')">{{ $t('PRICES') }}</a>
                <a class="footer-link" :href="localePath('/terms')">{{ $t('TERMS_OF_USE') }}</a>
                <a class="footer-link" :href="localePath('/partners-about')">{{ $t('MENU_REFERRAL_LINK') }}</a>
                <a class="footer-link" href="https://t.me/instaboost_official" target="_blank">Telegram</a>
            </div>
        </div>
    </div>
</template>
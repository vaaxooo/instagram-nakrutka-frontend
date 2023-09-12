<template>
    <header class="bg-main-header mb-5 py-3">
        <div class="container">
          <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start container">
            <a :href="localePath('/')" class="logo-holder logo-4">
                <img src="/assets/images/apple-touch-icon.png" alt="logo" width="32px" class="logo-img">
                Nakrutka
            </a>
    
            <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 mx-5">
                <li>
                  	<a :href="localePath('/prices')" class="nav-link px-1">{{ $t('MENU_PRICES_LINK') }}</a>
                </li>
                <li>
                  	<a :href="localePath('/terms')" class="nav-link px-1">{{ $t('TERMS_OF_USE') }}</a>
                </li>
                <li>
                  	<a :href="localePath('/partners-about')" class="nav-link px-1">{{ $t('MENU_REFERRAL_LINK') }}</a>
                </li>
                <li>
                  	<a href="https://t.me/instaboost_official" class="nav-link px-1" target="_blank">Telegram</a>
                </li>
            </ul>
    
            <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3 text-center" role="search">
                <nuxt-link :to="switchLocalePath('en')" class="swith-language" v-if="$i18n.locale !== 'en'">English</nuxt-link>
                <nuxt-link :to="switchLocalePath('ru')" class="swith-language" v-if="$i18n.locale !== 'ru'">Русский</nuxt-link>
            </form>

            <div class="text-end" v-if="$auth.user">
              	<a :href="localePath('/account/pay')" class="btn btn-orange">{{ $t('BALANCE') }}: $ {{ $auth.user.balance }}</a>
				<button type="button" class="btn btn-text" @click="logoutUser">{{ $t('LOGOUT') }}</button>
            </div>
			<div class="text-end" v-else>
			  	<a :href="localePath('/account/login')" class="btn btn-orange me-2">{{ $t('MENU_LOGIN_LINK') }}</a>
			  	<a :href="localePath('/account/register')" class="btn btn-outline-dark">{{ $t('MENU_SIGNUP_LINK') }}</a>
			</div>
          </div>
        </div>
    </header>
</template>

<script>

export default {
	methods: {
		async logoutUser() {
			this.$toast.success(this.$t('YOU_HAVE_SUCCESSFULLY_LOGGED_OUT'))
			await this.$auth.logout();
			window.location = '/';
		}
	},
}

</script>
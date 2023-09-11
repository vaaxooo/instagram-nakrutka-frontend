<template>
    <header class="bg-main-header mb-5 py-3">
        <div class="container">
          <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start container">
            <a href="/" class="logo-holder logo-4">
                <img src="/assets/images/apple-touch-icon.png" alt="logo" width="32px" class="logo-img">
                Nakrutka
            </a>
    
            <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 mx-5">
                <li>
                  	<a href="/prices" class="nav-link px-1">Prices</a>
                </li>
                <li>
                  	<a href="/terms" class="nav-link px-1">Terms of Use</a>
                </li>
                <li>
                  	<a href="#" class="nav-link px-1">Telegram</a>
                </li>
            </ul>
    
            <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">

            </form>
    
            <div class="text-end" v-if="$auth.user">
              	<a href="/account/pay" class="btn btn-orange">Balance: $ {{ $auth.user.balance }}</a>
				<button type="button" class="btn btn-text" @click="logoutUser">Logout</button>
            </div>
			<div class="text-end" v-else>
			  	<a href="/account/login" class="btn btn-orange me-2">Login</a>
			  	<a href="/account/register" class="btn btn-outline-dark">Sign-up</a>
			</div>
          </div>
        </div>
    </header>
</template>

<script>

export default {
	methods: {
		async logoutUser() {
			this.$toast.success('You have been logged out')
			await this.$auth.logout();
			window.location = '/';
		}	
	},
}

</script>
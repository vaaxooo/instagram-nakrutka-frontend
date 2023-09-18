<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark" aria-label="Second navbar example">
        <div class="container">
          <a class="navbar-brand" href="#">Casino</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample02" aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
    
          <div class="collapse navbar-collapse" id="navbarsExample02">
            <ul class="navbar-nav me-auto">

            </ul>
            <div class="text-end">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item mx-2">
                        <a class="nav-link btn-deposit" aria-current="page" href="#" @click="openDepositModal">
                            <span class="material-icons icon-deposit">account_balance_wallet</span>
                            <span>Пополнить счёт</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link btn-providers btn-logout" aria-current="page" href="#">
                            <span class="material-icons icon-deposit">logout</span>
                        </a>
                    </li>
                </ul>
            </div>
          </div>
        </div>
    </nav>
</template>

<script>

export default {
    data() {
        return {
            isVisible: false,
        }
    },
	methods: {
		async logoutUser() {
			await this.$auth.logout();
			window.location = this.localePath('/auth');
		},

        openDepositModal() {
            this.isVisible = !this.isVisible;
            this.$nuxt.$emit('openDepositModal', this.isVisible);
        }
	},
}

</script>
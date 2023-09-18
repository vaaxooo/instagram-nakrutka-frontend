<template>
  <div class="deposit-methods">
    <div class="list-group">
      <div class="method-section" v-if="activeBalance">
        <div class="method-title">Выберите валюту для игры:</div>
        <a
          href="#"
          class="list-group-item list-group-item-action d-inline-block mb-1"
          aria-current="true"
          v-for="balanceData in balances"
          :key="balanceData.id"
          @click="setActiveBalance(balanceData)"
        >
          <div
            class="method-icon currency"
            :style="'background: ' + balanceData.currency.form_background_color"
          >
            {{ balanceData.currency.symbol }}
          </div>
          <div class="method-details mx-auto">
            <div class="d-flex w-100 justify-content-between currency-info">
              <h5 class="mb-0 payment-name">
                {{ balanceData.currency.name }}
                <span class="active-currency" v-if="activeBalance && balanceData.currency.id === activeBalance.id"
                  >В игре</span
                >
              </h5>
            </div>
            <p class="mb-0 payment-desc w-100">
              <span class="currency-name"
                >{{ balanceData.balance }} {{ balanceData.currency.symbol }}</span
              >
            </p>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    balances: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      	activeBalance: null
    };
  },
  mounted() {
    	this.activeBalance = this.$auth.user.active_currency;
  },

  methods: {
    setActiveBalance(balance) {
		this.activeBalance = balance.currency;
        this.$nuxt.$emit('setActiveBalance', balance);
		const userToUpdate = {...this.$auth.user}
		userToUpdate.active_currency_id = balance.currency.id;
		userToUpdate.active_currency = balance.currency;
		this.$auth.setUser(userToUpdate)
    },
  },
};
</script>

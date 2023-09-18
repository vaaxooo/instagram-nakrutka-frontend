// store/user.js
export const state = () => ({
    user: {
        active_currency_id: null,
        active_currency: null,
    },
});

export const mutations = {
    setActiveCurrency(state, balance) {
            state.user.active_currency_id = balance.currency.id;
            state.user.active_currency = balance.currency;
    },
};

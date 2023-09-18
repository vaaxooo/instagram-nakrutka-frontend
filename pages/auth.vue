<template>
    <div class="auth-content">
        <img alt="jetton" src="/assets/images/logo.webp" class="auth-logo">
        <div class="auth-text">Для входа в казино необходимо зарегистрироваться через Telegram.</div>
        <div><script async src="https://telegram.org/js/telegram-widget.js?22" data-telegram-login="golden_gambit_bot" data-size="large" data-onauth="onTelegramAuth(user)" data-request-access="write"></script></div>
    </div>
</template>

<script>
export default {
    auth: 'guest',
    layout: 'auth',
}
</script>
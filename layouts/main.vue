<template>
    <div class="content">
        <Layouts-Header v-if="$auth.user" />
        <layouts-main-header v-else />
        <div class="container">
            <Nuxt />
            <layouts-main-footer />
        </div>
    </div>
</template>
<template>
    <div class="row">
        <div class="hero col-md-12">
            <div class="row d-mobile">
                <div class="col-md-7 px-5 mx-auto m-auto">
                    <div class="">
                        <h1 class="display-5">{{ $t('NAKRUTKA') }} <span class="text-orange">INSTAGRAM</span></h1>
                        <p class="lead">{{ $t('MAIN_SUBTITLE_DESC') }}</p>
                        <div class="mt-5">
                            <a :href="localePath('/account/login')" class="btn btn-orange btn-lg">{{ $t('CONTINUE') }}</a>
                            <a href="https://instagram.com/nikita.aleksandr0vich" class="btn btn-dark btn-lg mx-3">{{ $t('DEMO') }}</a>
                        </div>
                    </div>
                </div>

                <div class="col-md-5 px-5 mx-auto m-auto">
                    <div class="mocup-content ">
                        <img src="/assets/images/mocup.webp" alt="Mockup" class="img-fluid mocup" width="100%" height="50%">
                    </div>
                </div>
            </div>
        </div>

        <div class="section col-md-12">
            <div class="marketing">

                <div class="row featurette mb-5">
                    <div class="col-md-7 mx-auto m-auto">
                        <h2 class="featurette-heading text-orange">{{ $t('SERVICE_LIKES_TITLE') }}</h2>
                        <p class="lead">{{ $t('SERVICE_LIKES_DESC_ONE') }}</p>
                        <p class="lead">{{ $t('SERVICE_LIKES_DESC_TWO') }}</p>
                    </div>
                    <div class="col-md-5 mx-auto m-auto text-center">
                        <img class="featurette-image img-fluid mx-auto" data-src="holder.js/500x500/auto" alt="500x500" style="width: 300px" src="/assets/images/likes.png" data-holder-rendered="true">
                    </div>
                </div>



                <div class="row featurette mb-5">
                    <div class="col-md-7 mx-auto m-auto order-md-2">
                        <h2 class="featurette-heading text-orange">{{ $t('SERVICE_SUBSCRIBERS_TITLE') }}</h2>
                        <p class="lead">{{ $t('SERVICE_SUBSCRIBERS_DESC_ONE') }}</p>
                        <p class="lead">{{ $t('SERVICE_SUBSCRIBERS_DESC_TWO') }}</p>
                    </div>
                    <div class="col-md-5 mx-auto m-auto text-center order-md-1">
                        <img class="featurette-image img-fluid mx-auto" data-src="holder.js/500x500/auto" alt="500x500" src="/assets/images/followers.png" data-holder-rendered="true" style="width: 300px">
                    </div>
                </div>



                <div class="row featurette mb-5">
                    <div class="col-md-7 mx-auto m-auto">
                        <h2 class="featurette-heading text-orange">{{ $t('SERVICE_VIEWS_TITLE') }}</h2>
                        <p class="lead">{{ $t('SERVICE_VIEWS_DESC_ONE') }}</p>
                        <p class="lead">{{ $t('SERVICE_VIEWS_DESC_TWO') }}</p>
                    </div>
                    <div class="col-md-5 mx-auto text-center m-auto">
                        <img class="featurette-image img-fluid mx-auto" data-src="holder.js/500x500/auto" alt="500x500" src="/assets/images/views.png" data-holder-rendered="true" style="width: 300px;">
                    </div>
                </div>

                <div class="row featurette">
                    <div class="col-md-7 mx-auto m-auto order-md-2">
                        <h2 class="featurette-heading text-orange">{{ $t('SERVICE_COMMENTS_TITLE') }}</h2>
                        <p class="lead">{{ $t('SERVICE_COMMENTS_DESC_ONE') }}</p>
                        <p class="lead">{{ $t('SERVICE_COMMENTS_DESC_TWO') }}</p>
                    </div>
                    <div class="col-md-5 mx-auto m-auto text-center order-md-1">
                        <img class="featurette-image img-fluid mx-auto" data-src="holder.js/500x500/auto" alt="500x500" src="/assets/images/comments.png" data-holder-rendered="true" style="width: 300px;">
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>

export default {
    auth: false,
    layout: 'main',
}

</script>


<style scoped>
@media screen and (max-width: 570px) {
    .row.d-mobile {
        display: block;
        flex: none;
        margin: 0;
    }
}
</style>
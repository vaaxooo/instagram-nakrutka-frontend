<template>
    <div class="row">
        <div class="col-md-12 mb-3 px-0">
            <div class="card">
                <div class="card-header">
                    {{ $t('PRICES') }}
                </div>
                <div class="card-body">

                    <div class="service-category mb-3" v-for="category in categories" :key="category.id">
                        <div class="service-category-title">{{ category.name }}</div>
                            <div class="row">
                            <div class="service-details col-md-6" v-for="service in category.services" :key="service.id">
                                <div class="service-title d-flex">{{ service.service_id }}. {{ service.name }}</div>
                                <div class="service-desc">
                                    <div class="service-subtitle">$ {{ service.dirty_rate }} / <span>{{ $t('PER') }} 1000</span> </div>
                                    <div class="card-text">
                                        <ul class="m-0 my-1">
                                            <li><img src="/assets/images/fire.svg" width="16px" class="mr-2">{{ $t('DROPS') }}: 1-10%</li>
                                            <li><img src="/assets/images/clock.svg" width="16px" class="mr-2">{{ $t('QUEUE') }}: {{ $t('NO') }}</li>
                                            <li><img src="/assets/images/circle-o.svg" width="16px" class="mr-2">{{ $t('ORDER_LIMIT') }}: {{ service.min }} − {{ service.max }}</li>
                                            <li><img src="/assets/images/circle-info.svg" width="16px" class="mr-2">{{ service.description || '-' }}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>



            </div>
        </div>
    </div>
</template>

<script>
export default {
    layout: 'main',
    auth: false,
    data() {
        return {
            services: [],
            categories: []
        }
    },
    mounted() {
        this.fetchServices()
    },
    methods: {
        async fetchServices() {
            try {
                const [services, categories] = await Promise.all([
                    this.fetchData.call(this, '/public/services'),
                    this.fetchData.call(this, '/public/categories')
                ]);

                if (services && categories) {
                    const grouped = services.reduce((r, a) => {
                        r[a.category_id] = [...r[a.category_id] || [], a];
                        return r;
                    }, {});

                    categories.forEach(category => {
                        category.services = grouped[category.category_id] || [];
                    });

                    this.categories = categories;
                }

            } catch (e) {
                console.log(e)
            }
        },


        async fetchData(endpoint) {
            const { data } = await this.$axios.get(endpoint);
            if (!data.success) {
                window.location.href = '/';
                return null;
            }
            return data.data;
        }
    }
}

</script>
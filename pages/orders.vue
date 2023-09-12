<template>
    <div class="row">
        <div class="col-md-12 mb-3">
            <div class="card">
                <div class="card-header">
                    {{ $t('ORDERS_HISTORY') }}
                </div>
                <div class="card-body">


                    <div class="table-container">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">{{ $t('ORDER') }}</th>
                                        <th scope="col">{{ $t('ORDER_DETAILS') }}</th>
                                        <th scope="col">{{ $t('OTHER_DETAILS') }}</th>
                                        <th scope="col">{{ $t('STATUS') }}</th>
                                        <th scope="col">{{ $t('DATE') }}</th>
                                        <th scope="col">{{ $t('LINK') }}</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody v-if="orders.length > 0">
                                    <tr v-for="order in orders" :key="order.id">
                                        <td>
                                            <span class="currency-name"> ⁠I⁠D {{ order.order_id }}</span>
                                            <span class="currency-symbol d-block">{{ order.service.service_id }}. {{ order.service.name }}</span>
                                        </td>
                                        <td>
                                            <span class="balance-coin">{{ $t('COST') }}: $ {{ order.cost }}</span>
                                            <span class="balance-fiat d-block">{{ $t('QUANTITY') }}: {{ order.quantity }}</span>
                                        </td>
                                        <td>
                                            <span class="balance-coin">{{ $t('QUANTITY') }}: {{ order.remains }}</span>
                                            <span class="balance-fiat d-block">{{ $t('START') }}: {{ order.start_count }}</span>
                                        </td>
                                        <td>
                                            <span class="badge badge-success" v-if="order.status === 'Completed'">{{ $t(order.status) }}</span>
                                            <span class="badge badge-warning" v-else-if="order.status === 'In progress'">{{ $t(order.status) }}</span>
                                            <span class="badge badge-grey" v-else>{{ $t(order.status) }}</span>
                                        </td>
                                        <td>
                                            {{ formatDate(order.createdAt) }}
                                        </td>
                                        <td>
                                            {{ order.link }}
                                        </td>
                                        <td>
                                            <button type="button" class="btn btn-sm btn-light" v-if="order.service.cancel && order.status === 'In progress'" @click="cancelOrder(order.id)">{{ $t('CANCEL') }}</button>
                                            <!-- <a :href="`/?category_id=${order.service.category_id}&service_id=${order.service.service_id}&link=${order.link}&quantity=${order.quantity}`" class="btn btn-sm btn-success" v-if="order.service.refill && order.status === 'Completed'">Refill</a> -->
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr>
                                        <td colspan="7" class="text-center">{{ $t('NO_ORDERS_FOUND') }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import formatDate from '../plugins/formatDate';
export default {
    auth: true,
    data() {
        return {
            orders: [],
            formatDate
        }
    },
    mounted() {
        this.fetchOrders();
    },
    methods: {
        async fetchOrders() {
            const { data: res } = await this.$axios.get('/private/orders');
            if(!res.success) {
                window.location.href = '/account/login';
            }
            this.orders = res.data;
        },

        async cancelOrder(order_id) {
            const { data: res } = await this.$axios.post('/private/orders/cancel', { order_id });
            if(res.success) {
                this.$toast.success(res.message);
                this.fetchOrders();
            } else {
                this.$toast.error(res.message);
            }
        }
    }
}

</script>
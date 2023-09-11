<template>
    <div class="row">
        <div class="col-md-12 mb-3">
            <div class="card">
                <div class="card-header">
                    Orders History
                </div>
                <div class="card-body">


                    <div class="table-container">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Order</th>
                                        <th scope="col">Order Details</th>
                                        <th scope="col">Other Details</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Created At</th>
                                        <th scope="col">Link</th>
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
                                            <span class="balance-coin">Cost: $ {{ order.cost }}</span>
                                            <span class="balance-fiat d-block">Quantity: {{ order.quantity }}</span>
                                        </td>
                                        <td>
                                            <span class="balance-coin">Remains: {{ order.remains }}</span>
                                            <span class="balance-fiat d-block">Start: {{ order.start_count }}</span>
                                        </td>
                                        <td>
                                            <span class="badge badge-success" v-if="order.status === 'Completed'">{{ order.status }}</span>
                                            <span class="badge badge-warning" v-else-if="order.status === 'In progress'">{{ order.status }}</span>
                                            <span class="badge badge-grey" v-else>{{ order.status }}</span>
                                        </td>
                                        <td>
                                            {{ formatDate(order.createdAt) }}
                                        </td>
                                        <td>
                                            {{ order.link }}
                                        </td>
                                        <td>
                                            <button type="button" class="btn btn-sm btn-light" v-if="order.service.cancel && order.status === 'In progress'" @click="cancelOrder(order.id)">Cancel</button>
                                            <!-- <a :href="`/?category_id=${order.service.category_id}&service_id=${order.service.service_id}&link=${order.link}&quantity=${order.quantity}`" class="btn btn-sm btn-success" v-if="order.service.refill && order.status === 'Completed'">Refill</a> -->
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr>
                                        <td colspan="7" class="text-center">No orders found</td>
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
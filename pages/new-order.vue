<template>
	<div class="row">
		<div class="col-md-5 mb-3">
			<div class="card">
				<div class="card-header">
					{{ $t('NEW_ORDER') }}
				</div>
				<div class="card-body">
					<form @submit.prevent>
						<div class="mb-3">
							<label for="category" class="form-label">{{ $t('CATEGORY') }}</label>
							<select class="form-select" id="category" v-model="selectedCategory">
								<option disabled="" selected="">{{ $t('CHOOSE_CATEGORY') }}</option>
								<option v-for="category in categories" :key="category.id" :value="category.category_id">{{ category.name }}</option>
							</select>
						</div>
						<div class="mb-3">
							<label for="service" class="form-label">{{ $t('SERVICE') }}</label>
							<select class="form-select" id="service" v-model="selectedService" @change="changeService" :class="{'is-invalid': errors.service_id}">
								<option disabled="" selected="">{{ $t('CHOOSE_SERVICE') }}</option>
								<option v-for="service in services" :key="service.id" :value="service.service_id">{{ service.service_id }}. {{ service.name }} - $ {{ +(+service.dirty_rate).toFixed(2) }}</option>
							</select>
							<span class="invalid-feedback d-block" v-if="errors.service_id">{{ errors.service_id[0] }}</span>
						</div>
						<div class="mb-3">
							<label for="link" class="form-label">{{ $t('LINK') }}</label>
							<input type="text" class="form-control" id="link" name="link" :placeholder="$t('LINK')" v-model="link" :class="{'is-invalid': errors.link}">
							<span class="invalid-feedback d-block" v-if="errors.link">{{ errors.link[0] }}</span>
						</div>
						<div class="mb-3">
							<label for="quantity" class="form-label">{{ $t('QUANTITY') }}</label>
							<input type="text" class="form-control" id="quantity" name="quantity" :placeholder="$t('QUANTITY')" v-model="quantity" :class="{'is-invalid': errors.quantity}">
							<span class="invalid-feedback d-block" v-if="errors.quantity">{{ errors.quantity[0] }}</span>
						</div>
						<button type="submit" class="sign-in_btn btn-block" @click="createOrder">{{ $t('SUBMIT') }}</button>
					</form>
				</div>
			</div>
		</div>
		<div class="col-md-7 mb-3">
			<div class="card">
				<div class="card-header">
					{{ $t('INFORMATION') }}
				</div>
				<div class="card-body">
					<h5 class="card-title">{{ $t('BALANCE') }}: $ <span id="current-balance">{{ $auth.user.balance }}</span></h5>
					<hr>
					<h5 class="card-title">{{ $t('ORDER_COST') }}: $ <span id="price">{{ cost }}</span></h5>
					<hr>
					<h5 class="card-title">{{ $t('DESC_SELECTED_SERVICE') }}:</h5>
					<div class="card-text">
						<ul class="m-0 my-1">
							<li><img src="/assets/images/fire.svg" width="16px" class="mr-2">{{ $t('DROPS') }}: 1-10%</li>
							<li><img src="/assets/images/clock.svg" width="16px" class="mr-2">{{ $t('QUEUE') }}: {{ $t('NO') }}</li>
							<li><img src="/assets/images/circle-o.svg" width="16px" class="mr-2">{{ $t('ORDER_LIMIT') }}: {{ selectedServiceData.min }} − {{ selectedServiceData.max }}</li>
							<li><img src="/assets/images/circle-info.svg" width="16px" class="mr-2">{{ selectedServiceData.description || '-' }}</li>
						</ul>
						<a :href="localePath('/prices')" style="color: #249EC7; text-decoration: none;">{{ $t('INFORMATION_ABOUT_ALL_SERVICES') }}</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import formatDate from '../plugins/formatDate'

export default {
	name: 'IndexPage',
	data() {
		return {
			categories: [],
			services: [],

			selectedCategory: null,
			selectedService: null,
			selectedServiceData: [],
			quantity: 0,
			link: '',
			additional_field: '',

			cost: 10,


			errors: []
		}
	},
	async mounted() {
		this.fetchCategories()
	},
	watch: {
		selectedCategory() {
			this.fetchServices()
		},

		quantity() {
			this.cost = (this.selectedServiceData.dirty_rate * this.quantity / 1000).toFixed(2)
		}
	},
	methods: {

		async createOrder() {
			try {
				this.errors = []
				const { data: res } = await this.$axios.post('/private/orders', {
					service_id: this.selectedService,
					quantity: this.quantity,
					link: this.link,
					additional_field: this.additional_field
				})
				if(!res.success) {
					if(res.errors) {
						this.errors = res.errors
					}
					return this.$toast.error(res.message)
				}
				this.$toast.success(res.message)
				window.location.href = '/orders'
			} catch(error) {
				console.log(error)
			}
		},

		async fetchCategories() {
			try {
				const { data: res } = await this.$axios.get('/public/categories')
				if(!res.success) {
					return this.$toast.error(res.message)
				}
				this.categories = res.data
				this.selectedCategory = res.data[0].category_id
			} catch (e) {
				console.log(e)
			}
		},


		async fetchServices() {
			try {
				const { data: res } = await this.$axios.get(`/public/categories/${this.selectedCategory}/services`)
				if(!res.success) {
					return this.$toast.error(res.message)
				}
				this.services = res.data
				this.selectedService = res.data[0].service_id
				this.changeService()
			} catch (e) {
				console.log(e)
			}
		},

		async changeService() {
			this.selectedServiceData = this.services.find(service => service.service_id === this.selectedService)
			this.quantity = this.selectedServiceData.min
		}

	}
}
</script>
<template>
	<div class="loginsignup-navbar-mobile">
		<div class="loginsignup-navbar-mobile-header">Customer Account</div>
		<div class="loginsignup-navbar-menu d-flex flex-column">
			<template v-if="authenticated">
				<a class="loginsignup-navbar-menu-item" @click.prevent="signOut">Logout</a>
            </template>
            <template v-else>
            	<router-link event="" to="/b" @click.native="toggleMobileUserMenu(),openLoginModal()" class="loginsignup-navbar-menu-item">Login</router-link>
				<router-link :to="{ name: 'page-register' }" @click.native="toggleMobileUserMenu" class="loginsignup-navbar-menu-item">Register</router-link>
            </template>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	import axios from 'axios'
	export default {
		data() {
			return {
				hover: false,
				collapsed: false,
				collapsed2: false,
				inboxCount: ''
			}
		},
		methods: {
			...mapActions({
				signOutAction: 'auth/signOut'
			}),
			signOut() {
				this.signOutAction().then(() => {
					this.$router.replace({
						name: 'event-list'
					})
					this.$swal({
						// title: 'Error!',
						text: 'You have been signed out. See you again soon!',
						// icon: 'success',
						// confirmButtonText: 'Try Again',
						toast: true,
						position: 'top-end',
						timer: 2200,
						timerProgressBar: true,
						padding: '15px',
						showConfirmButton: false
					})
					this.hover = !this.hover
				})
			},

			/*toggleMenu() {
				this.hover = !this.hover
			},
			toggleMobileMenu() {
				this.collapsed2 = !this.collapsed2
			},
			toggleMobileUserMenu() {
				this.collapsed = !this.collapsed
			},
			closeNav() {
				alert('closing nav')
			},*/
			openLoginModal() {
				this.$store.commit('auth/SET_LOGIN_MODAL', true)
			}
		},
		computed: {
			...mapGetters({
				authenticated: 'auth/authenticated',
				user: 'auth/user'
			})
		},
		created() {
			if (this.authenticated) {
				axios
				.get('/showUnreadCount/' + this.user.id)
				.then(response => {
					this.inboxCount = response.data
				})
				.catch(error => {
					console.log('There was an error:', error.response)
				})
			}
		}
	}
</script>
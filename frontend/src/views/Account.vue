<template>
    <div class="account">
        <section class="container-fluid past-experience">
            <div class="row">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                        <h2>My Account</h2>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-3">
                            <ul class="list-group">
                                <li class="list-group-item" v-on:click="setActive('details')" :class="{ active: isActive('details') }">
                                    My Details
                                </li>
                                <!-- <li class="list-group-item"  v-on:click="setActive('comms')" :class="{ active: isActive('comms') }">
                                    Communication Preferences
                                </li>
                                <li class="list-group-item" v-on:click="setActive('notifications')" :class="{ active: isActive('notifications') }">
                                    Notifications
                                </li> -->
                                <li class="list-group-item" v-on:click="setActive('delete')" :class="{ active: isActive('delete') }">
                                    Close Account
                                </li>
                       
                            </ul>
                        </div>
                        <div class="col-sm-9">
                            <div class="box">
                                <div class="box-item my-details" :class="{ 'active show': isActive('details') }">
                                    <h4>My Details</h4>
                                    <form @submit.prevent="updateUser">
                                        <div class="row">
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <label for="name">Name</label>
                                                    <input type="text" name="name" class="form-control" id="name" required placeholder="Enter Name" v-model="details.name">
                                                </div>
                                            </div> 
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <label for="email">Email</label>
                                                    <input type="email" name="email" class="form-control" id="email" required placeholder="Enter Email" v-model="details.email">
                                                </div>
                                            </div>
                                            <div class="col-12 text-right">
                                                <button type="submit" class="btn btn-success">Update Details</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div class="box-item comms" :class="{ 'active show': isActive('comms') }">
                                    <h4>Communication Preferences</h4>
                                    <p>From time to time we would like to send you emails about the following items. We promise never to spam you!</p>
                                    <form action="">
                                        <div class="row">
                                            <div class="col-sm-12">
                                                <div class="form-group">
                                                    <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" class="custom-control-input" id="news-events">
                                                        <label name="news-events" class="custom-control-label" for="news-events">News &amp; Updates</label>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" class="custom-control-input" id="featured-events">
                                                        <label name="featured-events" class="custom-control-label" for="featured-events">Featured Events</label>
                                                    </div>
                                                </div>
                                            </div>
                                          
                                        </div>
                                    </form>
                                </div>
                                <div class="box-item notifications" :class="{ 'active show': isActive('notifications') }">
                                    <h4>Notifications</h4>
                                    <p>We will send push notifications to your device based off your choices below</p>
                                    <form action="">
                                        <div class="row">
                                            <div class="col-sm-12">
                                                <div class="form-group">
                                                    <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" class="custom-control-input" id="news-events">
                                                        <label name="news-events" class="custom-control-label" for="news-events">Weekly Best Events</label>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" class="custom-control-input" id="news-events">
                                                        <label name="news-events" class="custom-control-label" for="news-events">Expired Events</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div class="box-item delete" :class="{ 'active show': isActive('delete') }">
                                    <h4>Close Account</h4>
                                    <p>If you wish to close your account you may do so by clicking the button below. Please note your data will be permanently deleted and cannot be recovered.</p>
                                    <form @submit.prevent="deleteUser">
                                        <div class="row">
                                            <div class="col-sm-12">
                                                <div class="form-group">
                                                    <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" class="custom-control-input" id="confirm" v-model="confirm">
                                                        <label name="confirm" class="custom-control-label" for="confirm">I Confirm</label>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    
                                                    <template v-if="confirm === true">
                                                        <button class="btn btn-danger">Close Account</button>
                                                    </template>
                                                    <template v-else>
                                                        <button class="btn btn-danger" disabled >Close Account</button>
                                                    </template>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
import metaInfoMixin from '../mixins/metaInfo'
    export default {
        mixins: [metaInfoMixin],
        data() {
            return {
                activeItem: 'details',
                confirm: false,
                details: {
                    name: '',
                    email: '',
                    id: ''
                }
            }
        },
        methods: {
            ...mapActions({
            signOutAction: 'auth/signOut',
            fetchBucketListEvents: 'bucketlist/fetchBucketListEvents'
            }),
            isActive (menuItem) {
                return this.activeItem === menuItem
            },
            setActive (menuItem) {
                this.activeItem = menuItem
            },
            updateUser() {
                axios
                    .post('/updateUserAccount', this.details)
                    .then(this.onSuccess)
                    .catch(error => this.errors.record(error.response.data['errors']))
                },
            deleteUser() {
                axios
                    axios.delete('/deleteUserAccount/' + this.user.id)
                    .then(() => {
                        this.signOutAction().then(this.onDeleteSuccess())
                    })
                },
            onSuccess() {
            this.$swal({
                    title: 'Success!',
                    text: 'Your account details have been updated.',
                    icon: 'success',
                    // confirmButtonText: 'Try Again',
                    timer: 4500,
                    timerProgressBar: true,
                    padding: '15px'
                    // showConfirmButton: false
                    })
                },
            onDeleteSuccess() {
            this.$swal({
                    title: 'Success!',
                    text: 'Your account has now been deleted..',
                    icon: 'success',
                    // confirmButtonText: 'Try Again',
                    timer: 4500,
                    timerProgressBar: true,
                    padding: '15px'
                    // showConfirmButton: false
                    })
                    .then(
                        window.location = '/'
                    )
                }
        },
        computed: {
            ...mapGetters({
            authenticated: 'auth/authenticated',
            user: 'auth/user',
            events: 'bucketlist/getBucketListEvents'
            })
         },
        created() {
            this.details.id = this.user.id,
            this.details.name = this.user.name,
            this.details.email = this.user.email,
            this.setMetaInfo({
            title: 'My Account | Experiential Star',
            desc: 'Build your ultimate bucket list with a single click',
            keywords: '',
            img: '',
            url: window.location.href
            })
        }
    }
</script>

<style lang="scss" scoped>
.account {
    background-color: #F3F3F3;
     h2 {
        border-bottom: none!important;
        color: #1e2226;
        font-size: 22px;
        font-family: "Titillium Web", sans-serif;
        font-weight: 600;
        margin-bottom: 0px;
        margin-top: 0;
        line-height: 1;
        padding-bottom: 30px;
        text-transform: capitalize;
    }
    h4 {
       font-size: 18px;
       font-weight: 600;
       border-bottom: solid 1px #F3F3F3;
       padding-bottom: 15px;
       margin-bottom: 15px;
    }
    .box {
        background-color: #fff;
        padding: 25px;
        border-radius: 3px;
        .box-item {
            display: none;
            p {
                margin-bottom: 20px;
            }
        }
    }
    .list-group-item {
        border: none;
        border-bottom: 1px solid #F3F3F3;
        a {
            color: #444444;
        }
        &:hover {
            cursor: pointer;
        }
        .active {
            background-color:gold;
        }
    }
    .show {
        display: block!important;
    }
    li.list-group-item.active {
        background-color: #1E2226
    }
}
</style>
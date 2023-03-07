<template>
  <div
    class="container-fluid about-signup"
    style="background-image: url(images/about-signup-bg.jpg);"
  >
    <div class="row">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-md-8">
            <h3 class="text-center">Sign up today for free</h3>
            <h4 class="text-center">
              Receive exclusive member only offers, invitations to member
              experiences, build and share your bucket-list for free.
            </h4>
            <div class="d-flex flex-column flex-sm-row justify-content-center align-items-center">
              <router-link :to="{ name: 'page-login' }" class="login">Login to your account</router-link>
              <router-link :to="{ name: 'page-register' }" class="register">create an account</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>

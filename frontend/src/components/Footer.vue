<template>
  <footer class="site-footer">
    <div class="container-fluid footer-top">
      <div class="row">
        <div class="container">
          <div class="row">
            <div class="col-6 col-sm-6 col-md-3">
              <h5>Navigation</h5>
              <ul class="list-unstyled footer-menu">
                <li class="footer-menu-item">
                  <!-- <a class="footer-menu-link" href="javascript:void(0);">Contact</a> -->
                  <router-link class="footer-menu-link" :to="{ name: 'page-contact' }">Contact</router-link>
                </li>
                <li class="footer-menu-item">
                  <router-link class="footer-menu-link" :to="{ name: 'page-blog' }">Blog</router-link>
                </li>
                <li class="footer-menu-item">
                  <router-link
                    class="footer-menu-link"
                    :to="{ name: 'event-past' }"
                  >Past Experiences</router-link>
                </li>
                <li class="footer-menu-item">
                  <router-link
                    class="footer-menu-link"
                    :to="{ name: 'page-bucket-list' }"
                  >Bucket List</router-link>
                </li>
              </ul>
            </div>
            <div class="col-6 col-sm-6 col-md-3">
              <h5>Legal</h5>
              <ul class="list-unstyled footer-menu">
                <li class="footer-menu-item">
                  <router-link
                    class="footer-menu-link"
                    :to="{ name: 'page-privacy' }"
                  >Privacy Policy</router-link>
                </li>
                <li class="footer-menu-item">
                  <router-link
                    class="footer-menu-link"
                    :to="{ name: 'page-terms' }"
                  >Terms &amp; Conditions</router-link>
                </li>
                <li class="footer-menu-item">
                  <router-link class="footer-menu-link" :to="{ name: 'page-cookie' }">Cookie Policy</router-link>
                </li>

                <li class="footer-menu-item">
                  <a class="footer-menu-link" href="javascript:void(0);">Sitemap</a>
                </li>
              </ul>
            </div>
            <div class="col-6 col-sm-6 col-md-3">
              <h5>Social</h5>
              <ul class="list-unstyled footer-menu">
                <li class="footer-menu-item">
                  <a
                    class="footer-menu-link"
                    href="https://www.facebook.com/thelifeofrileyofficial/"
                    target="_blank"
                  >Facebook</a>
                </li>
                <li class="footer-menu-item">
                  <a
                    class="footer-menu-link"
                    href="https://www.instagram.com/Lifeofrileyofficial/"
                    target="_blank"
                  >Instagram</a>
                </li>
                <li class="footer-menu-item">
                  <a
                    class="footer-menu-link"
                    href="https://www.youtube.com/channel/UCTlAAMANBn_ZtO98x7rJ08w"
                    target="_blank"
                  >YouTube</a>
                </li>
              </ul>
            </div>
            <div class="col-6 col-sm-6 col-md-3">
              <h5>Contact</h5>
              <ul class="list-unstyled footer-menu">
                <li class="footer-menu-item">
                  <a
                    class="footer-menu-link"
                    href="mailto:info@experientialstar.com"
                  >info@experientialstar.com</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid footer-bottom">
      <div class="row">
        <div class="container">
          <div class="footer-copyright d-flex flex-row align-items-center justify-content-between">
            <div class="footer-logo">
              <a href="/">
                <img alt class="img-fluid d-block" src="/images/logo.svg" />
              </a>
            </div>
            <div class="pr">
              <a href="https://www.paolor.co.uk" target="_blank">Created by PaoloR.co.uk</a>
            </div>
            <div class="copyright">
              <p>
                Copyright 2020
                <router-link :to="{ name: 'event-list'}">Experiential Star</router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.pr a {
  color: #1e2226;
}
</style>

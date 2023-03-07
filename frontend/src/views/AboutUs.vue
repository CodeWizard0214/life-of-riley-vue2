<template>
  <div>
    <div class="AboutUs">
      <PageBanner>
        <template slot="title">About</template>
      </PageBanner>
      <div class="container">
        <div
          class="container-fluid aboutus"
          style="background-image: url(/images/World_map_green.png);"
        >
          <div class="row">
            <div class="container">
              <div class="row ">
                <!-- <div class="col-12 col-md-6 col-lg-5">
                  <div class="about-vision mb-30">
                    <h5>Noun Informal.</h5>
                    <h2>Experiential Star</h2>
                    <p>
                      1. A carefree, comfortable, and thoroughly enjoyable way
                      of living:
                    </p>
                    <article>
                      “With all that travelling they do, they really are living
                      the Experiential Star.”
                    </article>
                  </div>
                </div>
                <div class="col-12 col-md-6 col-lg-7">
                  <img
                    class="img-fluid d-block ml-auto mr-auto mb-30"
                    src="images/manifesto-image.png"
                  />
                </div>-->
                <div class="col-12">
                  <div class="about-content">
                    <!-- <p class="text-center paragraph-1 mb-40">
                      <b>
                        Do you actively seek out travel experiences that you’ll
                        remember for life… rather than settling for the same old
                        package deals as everyone else?
                      </b>
                      <br />
                      <br />Do you want to experience moments so memorable that
                      you’ll tell stories about them right up until the day you
                      die?
                      <br />
                      <br />If so, you’re in the right place.
                    </p>-->
                    <h2 class="text-center">Experiential Star is about one thing...</h2>
                    <p class="paragraph-2">
                      <b>
                        We help you discover the most unique and awe-inspiring
                        experiences available anywhere in the world.
                      </b>
                      <br />
                      <br />For us, every day is an opportunity to enjoy an
                      experience of a lifetime... and it’s only the very best
                      that get featured on our site.
                      <br />
                      <br />Every experience you will find on this site has been
                      hand-selected by our dedicated team of experience
                      connoisseurs.
                      <br />
                      <br />You can trust us to be your quality filter and - be
                      assured - every experience we publish will leave a lasting
                      impression.
                      <br />
                      <br />
                    </p>
                    <hr />
                    <p class="paragraph-2">
                      <b>What you can expect</b>
                      <br />
                      <br />Our site is filled to the brim with experiences that
                      get the blood pumping and our members can get access to
                      secret experiences and unadvertised upgrades that aren’t
                      available anywhere else.
                      <br />
                      <br />Sign up today, join our private inner circle and
                      browse through our hand-picked selection of the finest
                      experiences available in the world. (You never have to pay
                      us anything, ever.)
                      <br />
                      <br />
                      <ul>
                        <li><a href="/login">Login</a></li>
                        <li><a href="/register">Register</a></li>
                      </ul>
                     Let us help you break free from your everyday
                      routines, responsibilities and the limitations of regular
                      life…
                      <br />
                      <br />Let us provide the inspiration for your next trip
                      and help you discover new experiences that you never
                      imagined could exist.
                      <br />
                      <br />
                    </p>
                    <hr />
                    <p class="paragraph-2">
                      <b>How to use the site</b>
                      <br />
                      <br />When you see something that grabs your attention -
                      something you know you MUST experience while you’re still
                      young enough to fully enjoy it - simply click on the ‘View
                      Experience’ button for all the information.
                      <br />

                      <br />Click the “Add to Bucket List.” To save all of your
                      favourite experiences in one place, so you can plan which
                      one to do next.
                      <br />
                      <br />
                    </p>
                    <hr />
                    <p class="paragraph-2">
                      <b>Our Story</b>
                      <br />
                      <br />Starting out as ‘Experiential Star’ a Luxury Yacht
                      hospitality company at the Monaco and Abu Dhabi Grand
                      Prix, you can trust that we know what makes an experience
                      truly world-class.
                      <br />

                      <br />As time went by, our clients asked us to help them
                      discover new and unique experiences for them to attend -
                      In today’s modern world, people are hungry for the
                      extraordinary.
                      <br />
                      <br />Over the last five years, we have grown our audience
                      to over 4 million, and our members have grown from a few
                      hundred clients to over 20,000.
                      <br />
                      <br />
                    </p>
                    <hr />
                    <p class="paragraph-2">
                      <b>Become a Provider</b>
                      <br />
                      <br />Our experiences are only as good as the people who
                      find them. If you would like us to consider your
                      experience or you have an experience suggestion, please 
                      contact us on <router-link :to="{ name: 'page-provider-signup'}">this form</router-link>.
                      <br />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <SignUp></SignUp>
  </div> 
</template>
 
<script>
import PageBanner from '@/components/PageBanner.vue'
import SignUp from '@/components/SignUp.vue'
import metaInfoMixin from '../mixins/metaInfo'

export default {
  mixins: [metaInfoMixin],
  components: {
    PageBanner,
    SignUp
  },
  created() {
    this.setMetaInfo({
      title: 'About Experiential Star | Adventure Travel & Unique Experience Curators',
      desc: 'Learn why we\'re fast becoming the ultimate travel bucket list company, curating the best in adventure travel and unique experiences around the world.',
      keywords: '',
      img: '',
      url: window.location.href
    })
  }
}
</script>

<style lang="scss" scoped>
h3 {
  margin-top: 30px;
  margin-bottom: 15px;
}
ul {
  list-style: none;
  
  margin-left: 0px;
  padding-left: 0px;
   li {
     display:inline;
     margin-right: 15px;
   }
}
</style>

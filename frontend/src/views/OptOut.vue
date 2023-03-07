<template>
    <div>
        <div style="-webkit-border-top-left-radius: 15px;-webkit-border-top-right-radius: 15px;-moz-border-radius-topleft: 15px;-moz-border-radius-topright: 15px;border-top-left-radius: 15px;border-top-right-radius: 15px;width:400px;height:90px;margin:auto;background-color:#f00;box-shadow: 5px 5px 2px #ccc;">
        <span style="font-family: Helvetica, Arial,  sans-serif;font-weight: bold;font-size: 48px;color: #fff;margin-top:10px;">Hello</span>
        <span style="font-family: Helvetica, Arial,  sans-serif;font-size: 26px;color: #fff;">my name is</span>
    </div>
    <div style="width:400px;height:115px;margin:auto;box-shadow: 5px 5px 2px #ccc;background-color:#fff;font-family: Comic Sans, Comic Sans MS, cursive;font-size: 60px;color: #000;padding-top:20px;">
        EMPLOYEE
    </div>
    <div style="width:400px;height:25px;-webkit-border-bottom-right-radius: 15px;-webkit-border-bottom-left-radius: 15px;-moz-border-radius-bottomright: 15px;-moz-border-radius-bottomleft: 15px;border-bottom-right-radius: 15px;border-bottom-left-radius: 15px;margin:auto;background-color:#f00;box-shadow: 5px 5px 2px #ccc;"></div>
    <p>Please click below to opt out of our Google Analytics data!<br>Thank you for your help!</p>
    <form action="#"  onsubmit="ga('send', 'pageview',{'dimension1': 'employee'});alert('You are now opted out! Thanks for your help!');return false;">
        <p>
            <input style="height: 45px;width: 100px;border-radius: 10px;font-weight: bold;margin-left:10px;" type="submit" value="OPT OUT &rarr;">
        </p>
    </form>
    </div>
</template>

<script>
//    (function (i, s, o, g, r, a, m) {
//                     i["GoogleAnalyticsObject"] = r;
//                     (i[r] =
//                         i[r] ||
//                         function () {
//                             (i[r].q = i[r].q || []).push(arguments);
//                         }),
//                         (i[r].l = 1 * new Date());
//                     (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
//                     a.async = 1;
//                     a.src = g;
//                     m.parentNode.insertBefore(a, m);
//                 })(window, document, "script", "//www.google-analytics.com/analytics.js", "ga");
//                 ga("create", "UA-80091704--1", "auto");
</script>

<style lang="scss" scoped>



</style>
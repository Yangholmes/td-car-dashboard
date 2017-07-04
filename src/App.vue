<template>
  <div id="app">
    <router-view id="content"></router-view>

    <div id="navigation">
      <mt-tabbar :fixed="true" v-model="selected">
        <mt-tab-item id="reservation-check-tab">
          <router-link class="router-link" to="reservation-check" replace>
            <div class="fa fa-check-square-o nav-icon"  @touchend="refresh"></div>
            返还登记
          </router-link>
        </mt-tab-item>
        <mt-tab-item id="reservation-query-tab">
          <router-link class="router-link" to="reservation-query" replace>
            <div class="fa fa-search nav-icon"></div>
            查记录
          </router-link>
        </mt-tab-item>
      </mt-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      selected: 'reservation-check-tab'
    }
  },
  methods: {
    refresh () {
    }
  }
}
</script>

<style>
html,
body{
  width: 100%; /*height: 100%;*/
  margin: 0; padding: 0;
  font-family: "Microsoft Yahei", "Lucida Grande", "Lucida Sans Unicode", Helvetica, Arial, Verdana, sans-serif;
}
a:-webkit-any-link {
  color: inherit;
  cursor: auto;
}
a{
  text-decoration: none;
}
a:visited{
  color: inherit;
  text-decoration: none;
}

#app,
#content{
  width: 100%; height: 100%;
  margin: 0; padding: 0;
}

.router-link{
  display: block;
  width: 100%; height: 100%;
}

.nav-icon {
    display: block !important;
    margin: .5em auto .5em !important;
    font-size: 1.5em !important;
}
</style>

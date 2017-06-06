<template>
  <div id="reservation-list">
    <ul id="query-result">
      <li v-for="res in reservation">
        <div id="res-applicant">
          <img class="avatar" :src="res.avatar">
          <div id="res-applicant-name">{{ res.applicant }}</div>
        </div>
        <div id="res-info">
          <div><label>车辆信息</label><p>{{ res.car }}</p></div>
          <div><label>预计出发</label><p>{{ res['schedule-start'].replace(/^\d{4}-/, '') }}</p></div>
          <div><label>预计返回</label><p>{{ res['schedule-end'].replace(/^\d{4}-/, '') }}</p></div>
          <div><label>司机</label><p>{{ res.driver }}</p></div>
          <div><label>归还时间</label><p>{{ res.returnDt }}</p></div>
        </div>
      </li>
    </ul>

    <div v-if="reservation.length == 0" class="null">
      <div class="null-icon fa fa-smile-o"></div>
      <p class="null-text">没有符合条件的记录</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['reservation'],
  data () {
    return {}
  }
}
</script>

<style>
#reservation-list{
  height: 100%; width: 100%;
}
ul#query-result{
  margin: 0 .5em; padding: 0;
  /*width: 100%;*/
  font-size: 1em;
}
ul#query-result li{
  display: flex;
  justify-content: space-around;
  list-style: none;
  margin: .5em auto;
  align-items: center;
  /*border: 1px solid rgba(50, 50, 50, .7);*/
  border-radius: 5px;
  box-shadow: 1px 0 5px rgba(150, 150, 150, .9);
}
ul#query-result li:last-child{
  margin-bottom: 5em;
}

ul#query-result li #res-applicant{
  margin: .25em;
  vertical-align: middle;
}
.avatar{
  border-radius: 50%;
  width: 64px; height: 64px;
}
ul#query-result li #res-applicant #res-applicant-name{
  text-align: center;
}

ul#query-result #res-info div{
  display: block;
  font-size: .75em;
  margin: .2em 0;
}
ul#query-result label{
  width: 5em;
  display: inline-block;
}
ul#query-result label::after{
  content: ':';
}
ul#query-result p{
  display: inline-block;
  margin: 0; padding: 0;
}
</style>

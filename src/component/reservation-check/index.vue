<template>
  <div id="reservation-check">
    <!-- <mt-loadmore ref="loadmore" class="reservation-check"
      :top-method="loadTop"
      topLoadingText="玩儿命加载中…"> -->
      <ul id="unreturn">
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
          <div id="return-btn">
            <transition name="check-fade">
              <div class="button" v-if="res.status == 1" @touchend="returnCar(res.resid)">归还车辆</div>
              <div class="check fa fa-check" v-if="res.status == 3"></div>
            </transition>
          </div>
        </li>
      </ul>
    <!-- </mt-loadmore> -->
    <div v-if="reservation.length == 0" class="null">
      <div class="null-icon fa fa-smile-o"></div>
      <p class="null-text">没有未还车辆</p>
    </div>
  </div>
</template>

<script>
import { Indicator, Toast } from 'mint-ui'
import { MessageBox } from 'mint-ui';

export default {
  data () {
    return {
      reservation: []
    }
  },
  mounted () {
    Indicator.open({
      text: '玩儿命加载中...',
      spinnerType: 'fading-circle'
    });
    this.$http.get('http://www.gdrtc.org/car/server/reservation/unreturn-reservation.php',{responseType: 'json'}).then(response => {
      console.log(response);
      this.reservation = response.data;
      Indicator.close();
    }, response => {
      console.log(response);
      Indicator.close();
    });
  },
  methods: {
    returnCar (resid) {
      let data = {
        resid: resid,
        userid: window._user.userid
      };
      Indicator.open({
        text: '还车中...',
        spinnerType: 'fading-circle'
      });
      this.$http.post('http://www.gdrtc.org/car/server/return/return.php', data, {
        emulateJSON: true,
        headers: {
            'Content-Type': 'enctype="application/x-www-form-urlencoded; charset=utf-8"'
        }
      }).then( response => {
        if(response.data.error == '1'){
          Indicator.close();
          MessageBox.alert('您没有权限执行操作', '注意啦！');
          return false;
        }
        let records = response.data.records;
        this.reservation.forEach( e => {
          if(e.resid == records.resid){
            e.returnDt = records.returnDt;
            e.status = records.status;
          }
        });

        Indicator.close();
        Toast({
          message: '还车成功',
          iconClass: 'icon-success fa fa-check'
        });
      }, response => {
        console.log(response);
        Indicator.close();
        Toast({
          message: '还车失败',
          iconClass: 'icon-success fa fa-times'
        });
      } );
    },
    loadTop () {
      // 加载更多数据
      this.$http.get('http://www.gdrtc.org/car/server/reservation/unreturn-reservation.php',{
          responseType: 'json',
        }).then(response => {
        this.reservation = response.data;
        // this.$refs.loadmore.onTopLoaded();
      }, response => {
        console.log(response);
        this.reservation = [];
        // this.$refs.loadmore.onTopLoaded();
      });

    },
  }
}

</script>

<style>
#reservation-check{
  height: 100%; width: 100%;
}
.mint-loadmore-content{
  height: 100%
}
ul#unreturn{
  margin: 0 .5em; padding: 0;
  /*width: 100%;*/
  font-size: 1em;
}
ul#unreturn li{
  display: flex;
  justify-content: space-around;
  list-style: none;
  margin: .5em auto;
  align-items: center;
  /*border: 1px solid rgba(50, 50, 50, .7);*/
  border-radius: 5px;
  box-shadow: 1px 0 5px rgba(150, 150, 150, .9);
}
ul#unreturn li:last-child{
  margin-bottom: 5em;
}

ul#unreturn li #res-applicant{
  margin: .25em;
  vertical-align: middle;
}
.avatar{
  border-radius: 50%;
  width: 64px; height: 64px;
}
ul#unreturn li #res-applicant #res-applicant-name{
  text-align: center;
}

ul#unreturn #res-info div{
  display: block;
  font-size: .75em;
  margin: .2em 0;
}
ul#unreturn label{
  width: 5em;
  display: inline-block;
}
ul#unreturn label::after{
  content: ':';
}
ul#unreturn p{
  display: inline-block;
  margin: 0; padding: 0;
}

.button{
  font-size: .75em;
  text-align: center;
  border: none; border-radius: 5px;
  color: #fff; background-color: rgba(80,175,250,1);
  height: 2.5em; width: 6em;
  line-height: 2.5em;
  padding: 0 auto;
}
.check{
  display: block;
  color: white;
  background: hsla(117, 100%, 40%, .7);
  width: 2.5em; height: 2.5em;
  line-height: 2.5em;
  text-align: center;
  border-radius: 50%;
}
.check-fade-enter{
  opacity: 1;
}
.check-fade-enter-active{
  transition: opacity 2s;
}

.icon-success{
  font-size: 3em;
}

.null{
  color: rgba(50, 50, 50, .5);
  text-align: center;
  width: 100%; height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  top: 0;
  z-index: -999;
}
.null-icon{
  animation: hehe 1s linear infinite alternate;
}
@keyframes hehe{
  from { font-size: 1em; }
  to { font-size: 5em; }
}
.null p.null-text{
  margin: .5em auto;
}
</style>

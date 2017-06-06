<template>
  <div id="reservation-query">
    <div class="query-key-form">
      <car-picker :car="car" label="车辆选择" @updateCar="updateCar"></car-picker>
      <datetime-picker :datetime="datetime" label="日期" @updateDatetime="updateDatetime"></datetime-picker>
      <div class="query-key-form-button button fa fa-search" @touchend="queryReservation">搜索</div>
    </div>

    <div class="query-result">
      <reservation-list :reservation="reservation">
      </reservation-list>
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
import carPicker from './car-picker.vue'
import datetimePicker from './datetime-picker.vue'
import reservationList from './reservation-list.vue'
export default {
  components: {
    // carPicker: (resolve) => require(['./car-picker.vue'], resolve) // 异步加载异常
    carPicker,
    datetimePicker,
    reservationList
  },
  data () {
    return {
      car: {},
      datetime: '',
      reservation: []
    }
  },
  mounted () {

  },
  methods: {
    updateCar (car) {
      this.car = car;
    },
    updateDatetime (datetime) {
      this.datetime = datetime;
    },
    queryReservation (){
      if( !this.car.carid || !this.datetime){
        MessageBox.alert('请指定查询条件', '注意啦！');
        return false;
      }
      let query = {
        car: this.car.carid,
        date: this.datetime
      };
      this.$http.post('http://www.gdrtc.org/car/server/reservation/query-reservation.php', query, {
        emulateJSON: true,
        headers: {
            'Content-Type': 'enctype="application/x-www-form-urlencoded; charset=utf-8"'
        }
      }).then( response => {
        this.reservation = response.data;
      }, response => {
        console.log(response);
      });
    }
  }
}
</script>

<style>
.query-key-form {
  width: 100%;
  margin: 0 auto;
  position: fixed;
  background: white;
  top: 0;
  border-bottom: 1px solid rgba(120, 120, 120, .5);
}
.query-key-form > * {
  margin: .5em 1em;
}
.button:active {
  background: rgba(80,175,250,.8);
}
.query-key-form-button {
  width: calc( 100% - 2em );
}

.query-result{
  margin-top: calc( 0.5em * 6 + 4em + 0.5em );
}
</style>

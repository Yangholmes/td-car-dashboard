<template>
  <div id="reservation-query">
    <div class="query-key-form">
      <car-picker       :car="car"              @update:car="val => car = val"            label="车辆选择:"></car-picker>
      <datetime-picker  :datetime="startDate"   @update:datetime="val => startDate = val" label="起始日期:"></datetime-picker>
      <datetime-picker  :datetime="endDate"     @update:datetime="val => endDate = val"   label="结束日期:"></datetime-picker>
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
    // carPicker: (resolve) => require(['./car-picker.vue'], resolve), // 异步加载异常
    carPicker,
    datetimePicker,
    reservationList
  },
  data () {
    return {
      car: {},
      startDate: '',
      endDate: '',
      reservation: []
    }
  },
  mounted () {

  },
  methods: {
    queryReservation (){
      if( !this.car.carid || !this.startDate || !this.endDate){
        MessageBox.alert('请指定查询条件', '注意啦！');
        return false;
      }
      let query = {
        car: this.car.carid,
        startDate: this.startDate,
        endDate: this.endDate
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
  margin-top: calc( 0.5em * 6 + 6em + 0.5em );
}
</style>

<template>
  <div class="car-picker picker">
    <div class="car-picker-field picker-field" @touchend.stop="popupPicker">
      <label class="car-picker-label picker-label">{{label}}</label>
      <div class="car-picker-selected picker-selected" >
        <p v-if="car.model">{{car.model}}</p>
        <p v-else class="car-picker-tip tip">请选择</p>
      </div>
    </div>

    <ul class="car-picker-list popup" v-if="popup" @touchend.stop="popupPicker">
      <li class="car-picker-list-item" v-for="car in cars" @touchend="selectCar(car)">
       <div class="car-picker-list-item-img">
         <img :src="car.imageSrc">
       </div>
       <div class="car-picker-list-item-text">{{car.model}}</div>
     </li>
    </ul>

    <div class="car-picker-mask mask" v-if="popup" @touchend.stop="popupPicker"></div>
  </div>
</template>

<script>
export default {
  props: ['label', 'car'],
  data () {
    return {
      cars: [],
      popup: false
    }
  },
  mounted () {
    this.$http.get('http://www.gdrtc.org/car/server/reservation/application-init.php',{responseType: 'json'}).then(response => {
      this.cars = response.data.records;
    }, response => {
    });
  },
  methods: {
    popupPicker () {
      this.popup = !this.popup;
    },
    selectCar (car) {
      this.$emit('update:car', car)
    }
  }
}
</script>

<style>
.picker * {
  background-color: white;
  margin: 0; padding: 0;
}

.picker-field {
  display: flex;
  width: 100%; height: auto;
}
.picker-field label {
  display: inline-block;
  width: 4.5em;
}
.picker-selected{
  width: calc( 100% - 4.5em ); /* label's width is 4.5em */
  word-wrap: break-word;
}
.picker-field p{
}
.picker-field .tip{
  color: gray
}

ul.car-picker-list {
  display: block;
  z-index: 100;
  position: fixed;
  top: 2em;
  left: 2.5em;

  width: calc( 100% - 5em );
  max-height: calc( 100% - 5em);

  overflow-y: scroll;
  box-shadow: 1px 0 5px #FFF;
  border-radius: 3px;
}
ul.car-picker-list li.car-picker-list-item {
  display: flex;
  padding: .5em .5em;
  border-top: 1px solid rgba(200,200,200,.7);
}
ul.car-picker-list li.car-picker-list-item:first-child {
  border-top: none;
}
ul.car-picker-list li.car-picker-list-item div.car-picker-list-item-img {
  display: inline-block;
  width: 64px; height: 64px;
  margin-right: .5em;
}
ul.car-picker-list li.car-picker-list-item div.car-picker-list-item-img img {
  width: 64px; height: 64px;
  border-radius: 50%;
}
ul.car-picker-list li.car-picker-list-item div.car-picker-list-item-text {
  display: inline-block;
  line-height: 64px;
  width: calc( 100% - 64px );
  margin: 0 .5em
}
.mask{
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(120, 120, 120, .6);
  width: 100%;
  height: 100%;
  z-index: 99;
}
</style>

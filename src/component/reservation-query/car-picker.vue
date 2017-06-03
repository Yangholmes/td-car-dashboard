<template>
  <div class="car-picker">
    <ul class="car-picker-list popup">
      <li class="car-picker-list-item">
       <div class="car-picker-list-item-img">
         <img src="http://www.gdrtc.org/car/img/cars-pics/car1490331925.jpg">
       </div>
       <div class="car-picker-list-item-text">白色奥德赛</div>
     </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['cars'],
  data () {
    return {

    }
  },
  mounted () {
    this.$http.get('http://www.gdrtc.org/car/server/reservation/application-init.php',{responseType: 'json'}).then(response => {
      console.log(response.data);
    }, response => {
      console.log(response);
    });
  }
}
</script>

<style>
.car-picker * {
  background-color: white;
  margin: 0; padding: 0;
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
</style>

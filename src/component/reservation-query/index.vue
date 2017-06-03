<template>
  <div id="reservation-query">
    <div class="query-key-form">
      <car-picker :car="car"></car-picker>
      <!-- <datetime-picker></datetime-picker> -->
    </div>
  </div>
</template>

<script>
import carPicker from './car-picker.vue'
import datetimePicker from './datetime-picker.vue'
export default {
  components: {
    // carPicker: (resolve) => require(['./car-picker.vue'], resolve) // 异步加载异常
    carPicker
  },
  data () {
    return {
      car: [],
    }
  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style>

</style>

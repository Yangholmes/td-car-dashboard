<template>
  <div class="datetime-picker picker">
    <div class="datetime-picker-field picker-field" @touchend.stop="popupPicker">
      <label class="datetime-picker-label picker-label">{{label}}</label>
      <div class="datetime-picker-selected picker-selected" >
        <p v-if="datetime">{{datetime}}</p>
        <p v-else class="datetime-picker-tip tip">请选择</p>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    props: ['label', 'datetime'],
    date () {

    },
    methods: {
      popupPicker () {
        let that = this;
        // that.$emit('update:datetime', '2017-07-03')
        // 引入钉钉后可用
        dd.biz.util.datepicker({
          format: 'yyyy-MM-dd',
          value: '', //默认显示
          onSuccess : function(result) {
            result.value
            that.$emit('update:datetime', result.value)
          },
          onFail : function() {

          }
        });
      }
    }
  }
</script>

<style>

</style>

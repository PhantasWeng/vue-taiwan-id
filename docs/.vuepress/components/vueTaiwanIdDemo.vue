<template>
  <div>
    <vueTaiwanId ref="testId" name="身份證字號" type="isNationalIdentificationNumberValid" @validated="onValidated" v-model="myId" />
    <div style="margin: 8px 0; color: red; font-size: 12px;">{{ result }}</div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      result: null,
      myId: ''
    }
  },
  methods: {
    onValidated: function (event) {
      console.log(event)
      this.result = event
    }
  }
}
</script>

<style>
</style>

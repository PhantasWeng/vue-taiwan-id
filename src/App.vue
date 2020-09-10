<template>
  <div id="app">
    <h1>vueTaiwanId</h1>
    <!-- <input type="text" id="test" v-vueTaiwanId:aType.someBoolean="'身份證字號'" value=""/> -->
    <!-- <input type="text" value="" /> -->
    <!-- <hr> -->
    <!-- <vueTaiwanId ref="testId" name="身份證字號" type="isNationalIdentificationNumberValid" @validated="onValidated" v-model="myId" /> -->
    <!-- {{ result }} -->
    <hr>
    <div v-vueTaiwanId:isNationalIdentificationNumberValid.immediate>{{ myId }}</div>
    <div v-vueTaiwanId:isGuiNumberValid.immediate>12345675</div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      result: null,
      myId: process.env.VUE_APP_TEST_ID,
      exampleCode: '<vueTaiwanId ref="testId" name="身份證字號" type="isNationalIdentificationNumberValid" @validated="onValidated" v-model="myId" />'
    }
  },
  methods: {
    onValidated: function (event) {
      // console.log('onValidated', event)
      this.result = event
    }
  },
  mounted () {
    if (process) {
      // console.log(process.env.NODE_ENV)
    }
  }
}
</script>

<style>
</style>

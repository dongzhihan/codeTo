<template>
  <div id="app">
    <router-view></router-view>
    <div id="build-wrap"></div>
  </div>
</template>

<script>
jQuery(function($) {
  var fbTemplate = document.getElementById('build-wrap');
  $(fbTemplate).formBuilder();
});
  export default {
    name: 'app',
  };

</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';

  .center {
    text-align: center;
  }

  body {
    background-color: #fbf9fe;
  }

</style>

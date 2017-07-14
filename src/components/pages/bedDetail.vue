<template>
  <div style="">
    <x-header>{{$route.name}}</x-header>
    <!--首图-->
    <div class="center"><img :src="hotel.img" alt=""></div>
    <tab :line-width="1" custom-bar-width="60px">
      <tab-item selected>1</tab-item>
      <tab-item>2</tab-item>
      <tab-item>3</tab-item>
    </tab>
  </div>
</template>
<style>
  .center {
    text-align: center;
  }

</style>
<script>
  import {
    XHeader,
    Cell,
    Group,
    Tab,
    TabItem
  } from 'vux';

  export default {
    data() {
      return {
        hotel: ''
      };
    },
    methods: {
      carClick(opt) {

      }
    },
    created() {
      this.hotel = {
        img: 'https://oixyh3u6e.qnssl.com/livingearth/livingearth.png',
        id: 9,
        name: 'no5'
      };
    },
    components: {
      XHeader,
      Cell,
      Group,
      Tab,
      TabItem
    }

  };

</script>

<style scoped>


</style>

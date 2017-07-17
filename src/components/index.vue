<template>
  <div>

    <!--    <div class="flexCenter" style="display:flex; flex-wrap: wrap">
      <div @click="goTo(item.id)" style="margin-top:0.3rem;width:50%" v-for="(item,index) in bedTypes">
        <div class="center"><img style="width:80%;height:80%" :src="item.src" alt="">
        </div>
        <div class="center fontName"><span>{{item.title}}</span></div>
      </div>
    </div>-->
    <div id="blocklyDiv" style="height: 480px; width: 600px;"></div>
   
    <div v-on:click="codeTo()" style="height: 100px; width: 100px;">code to </div>
    <div>{{codeJs}}</div>
   <xml id="toolbox" style="display: none">
    <category name="Logic">
      <block type="controls_if"></block>
      <block type="logic_compare"></block>
      <block type="logic_operation"></block>
      <block type="logic_negate"></block>
      <block type="logic_boolean"></block>
    </category>
    <category name="Loops">
      <block type="controls_repeat_ext">
        <value name="TIMES">
          <block type="math_number">
            <field name="NUM">10</field>
          </block>
        </value>
      </block>
      <block type="controls_whileUntil"></block>
    </category>
    <category name="Math">
      <block type="math_number"></block>
      <block type="math_arithmetic"></block>
      <block type="math_single"></block>
    </category>
    <category name="Text">
      <block type="text"></block>
      <block type="string_length"></block>
      <block type="text_length"></block>
      <block type="text_print"></block>
    </category>
  </xml>
 
  </div>

</template>
<style scoped>
  .carGroup {
    display: flex;
    flex-wrap: wrap;
  }

  .car {
    width: 100px;
    margin-top: 15px;
  }

</style>
<script>
  import {
    Swiper,
    SwiperItem,
    Selector,
    Group,
    Panel,
    XButton
  } from 'vux';
  // import api from '../js/api';

  export default {
    data() {
      return {
        workspace: Object,
        codeJs: ''
      };
    },
    mounted() {
      this.workspace = Blockly.inject('blocklyDiv', {
        toolbox: document.getElementById('toolbox')
      });
 
      console.dir(this.workspace);
    },
    components: {
      Selector,
      Group,
      XButton,
      Swiper,
      SwiperItem,
      Panel
    },
    methods: {
      codeTo() {
        console.log(this.workspace);
       Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
      var code = Blockly.JavaScript.workspaceToCode(this.workspace);
      alert(code);
        
      },
      goTo(item) {
        //  this.$http.post(api.xxx, data, api.config).then((data) => {
        // if (data.data.Errcode === 0) {
        this.$router.push({
          name: 'bedDetail',
          params: {
            id: item.id
          }
        });
        // }
        // });
      }
    }
  };

</script>
<style scoped>
  .fontName {
    font-size: 0.5rem;
    font-weight: bold;
    font-family: STXihei, "华文细黑", "Microsoft YaHei", "微软雅黑";
  }

</style>

<template>
  <div>

    <!--    <div class="flexCenter" style="display:flex; flex-wrap: wrap">
      <div @click="goTo(item.id)" style="margin-top:0.3rem;width:50%" v-for="(item,index) in bedTypes">
        <div class="center"><img style="width:80%;height:80%" :src="item.src" alt="">
        </div>
        <div class="center fontName"><span>{{item.title}}</span></div>
      </div>
    </div>-->
    <div id="blocklyDiv" style="height: 480px; width: 1500px;"></div>

    <div v-on:click="codeTo()" style="height: 100px; width: 100px;">code to </div>
    <div>{{codeJs}}</div>
    <xml id="toolbox" style="display: none">

      <block v-for="(value, key) in bolcklys" :key="key" :type="key"></block>
      <block type="text_join"></block>
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
  import api from '../js/api';



  export default {
    data() {
      return {
        workspace: Object,
        codeJs: '',
        bolcklys: []
      };
    },
    mounted() {
      var me = this;
      //动态表模型
      async function makeModel(models) {
        var unDuplicate = [];
        Blockly.tableColums = [];
        models.map((item) => {

          console.log($.inArray(item.TABLE_NAME, unDuplicate));
          if ($.inArray(item.TABLE_NAME, unDuplicate) === -1) {
            unDuplicate.push(item.TABLE_NAME);
            Blockly.tableColums[item.TABLE_NAME] = [];
          }
          Blockly.tableColums[item.TABLE_NAME].push([item.COLUMN_NAME, item.COLUMN_NAME])
        });
        console.log(unDuplicate)
        console.log(Blockly.FieldLabel)
        unDuplicate.map((item) => {
          Blockly.Blocks[item] = {
            init: function () {
              this.appendValueInput('VALUE')
                .setCheck('condition')
                .appendField(new Blockly.FieldTextInput(item), 'tableName');
              this.setColour(160);
              this.setOutput(true, 'option');
            }
          };
          Blockly.JavaScript[item] = function (block) {
            return ['1', Blockly.JavaScript.ORDER_ATOMIC];
          };
          console.log()
          console.log(Blockly.JavaScript);
        });
      }
      //查询表结构
      async function query() {
        let blocks = await me.$http.get(
          `${api.query}?sql=select * from information_schema.columns where  TABLE_SCHEMA='dzhupupup'`);
        await makeModel(blocks.data);
        console.log(Blockly.Blocks);
        me.bolcklys = Blockly.Blocks;
        setTimeout(() => {
          me.workspace = Blockly.inject('blocklyDiv', {
            toolbox: document.getElementById('toolbox')
          });
          console.log(me.workspace);
        });
      }
      query();
    },
    components: {

    },
    watch: {
      bolcklys() {
        setTimeout(() => this.workspace.updateToolbox(document.getElementById('toolbox')))
      }
    },
    methods: {
      async codeTo() {
        Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
        var code = Blockly.JavaScript.workspaceToCode(this.workspace);
        await eval(code);
        this.bolcklys = [];
        this.bolcklys = Blockly.Blocks;
      },
      goTo(item) {
        this.$router.push({
          name: 'bedDetail',
          params: {
            id: item.id
          }
        });
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

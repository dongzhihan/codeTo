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
      <block type="variable"></block>
      <block type="compare_operator"></block>
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
          if (!(item.TABLE_NAME in window.dbStructure)) {
            window.dbStructure[item.TABLE_NAME] = [{
              name: item.COLUMN_NAME,
              type: item.DATA_TYPE
            }];
          } else {
            window.dbStructure[item.TABLE_NAME].push({
              name: item.COLUMN_NAME,
              type: item.DATA_TYPE
            });
          }

          console.log($.inArray(item.TABLE_NAME, unDuplicate));
          if ($.inArray(item.TABLE_NAME, unDuplicate) === -1) {
            unDuplicate.push(item.TABLE_NAME);
            Blockly.tableColums[item.TABLE_NAME] = [];
          }
          Blockly.tableColums[item.TABLE_NAME].push([item.COLUMN_NAME, item.COLUMN_NAME])
        });
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
          console.log(Blockly.JavaScript);
        });
      }
      //查询表结构
      async function query() {
        let blocks = await me.$http.get(
          `${api.query}`, {
            params: {
              sql: `select * from information_schema.columns where  TABLE_SCHEMA='dzhupupup'`
            }
          });
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
        //    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;

        // var oSerializer = new XMLSerializer();
        // var sXML = oSerializer.serializeToString(Blockly.Xml.workspaceToDom(this.workspace)); //xml to  string
        console.log(this)
         console.log( SQLBlockly.SQLGen.workspaceToCode(this.workspace))
        console.log(Blockly.Xml.workspaceToDom(this.workspace))
        //var sXML = this.xmlToJson(Blockly.Xml.workspaceToDom(this.workspace));
        var sXML = Blockly.Xml.workspaceToDom(this.workspace);
        var text = Blockly.Xml.domToText(sXML);
        let blocks = await this.$http.post(
          `${api.workspace}`, {
            dbStructure:dbStructure,
            workspace: text
          });
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

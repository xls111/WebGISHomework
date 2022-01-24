<template>
  <div class="table-sites">
    <!--    <Layout>-->
    <!--      <Content :style="{padding: '0 50px'}">-->
    <!--        <Card>-->
    <!--          <div style="min-height: 200px;">-->
    <!--            <v-table-->
    <!--              is-horizontal-resize-->
    <!--              style="width:100%"-->
    <!--              :columns="columns"-->
    <!--              :table-data="tableData"-->
    <!--              row-hover-color="#eee"-->
    <!--              row-click-color="#edf7ff"-->
    <!--            ></v-table>-->
    <!--          </div>-->
    <!--        </Card>-->
    <!--      </Content>-->
    <!--    </Layout>-->
    <div id="selected-section">
      <button @click="changeSelectedKey">选择数据项</button>
      <span>当前选中的行数为:{{ selectedRowKeysCollection }}</span>
    </div>
    <ve-table v-if="isSelectedKey" :columns="columns" :table-data="tableData"/>
    <ve-table v-else :columns="columns2"
              :table-data="tableData"
              :checkbox-option="checkboxOption"
              row-key-field-name="id"/>
    <div class="table-sites-pagination">
      <ve-pagination
        :total="totalCount"
        :page-index="pageIndex"
        :page-size="pageSize"
        @on-page-number-change="pageNumberChange2"
        @on-page-size-change="pageSizeChange2"
      />
    </div>
  </div>
</template>

<script>

export default {
  name: "Table",
  data() {
    return {
      pageIndex: 1,
      pageSize: 10,
      DB_DATA: [],
      selectedRowKeysCollection: [],
      checkboxOption: {
        selectedRowKeys: [],
        // 行选择改变事件
        selectedRowChange: ({row, isSelected, selectedRowKeys}) => {
          this.changeSelectedRowKeys(row, isSelected);
        },
        // 全选改变事件
        selectedAllChange: ({isSelected, selectedRowKeys}) => {
          this.changeSelectAll(isSelected, selectedRowKeys);
        },
      },
      columns: [
        {field: 'id', key: 'a', title: '编号', width: 10, titleAlign: 'center', columnAlign: 'center', isResize: true},
        {field: 'code', key: 'b', title: '地标编号', width: 30, titleAlign: 'center', columnAlign: 'center', isResize: true},
        {field: 'name', key: 'c', title: '地表名', width: 30, titleAlign: 'center', columnAlign: 'center', isResize: true},
        {field: 'lng', key: 'd', title: '经度', width: 30, titleAlign: 'center', columnAlign: 'left', isResize: true},
        {field: 'lat', key: 'e', title: '纬度', width: 30, titleAlign: 'center', columnAlign: 'left', isResize: true},
        {field: 'adname', key: 'f', title: '地址', width: 30, titleAlign: 'center', columnAlign: 'left', isResize: true},
        {field: 'adcode', key: 'g', title: '地址代码', width: 30, titleAlign: 'center', columnAlign: 'left', isResize: true}
      ],
      columns2:[
        {field: 'id', key: 'a', title: '编号', width: 10, titleAlign: 'center', columnAlign: 'center', isResize: true},
        {
          field: "",
          key: "checkbox",
          // type=checkbox
          type: "checkbox",
          title: "",
          width: 50,
          align: "center",
        },
        {field: 'code', key: 'b', title: '地标编号', width: 30, titleAlign: 'center', columnAlign: 'center', isResize: true},
        {field: 'name', key: 'c', title: '地表名', width: 30, titleAlign: 'center', columnAlign: 'center', isResize: true},
        {field: 'lng', key: 'd', title: '经度', width: 30, titleAlign: 'center', columnAlign: 'left', isResize: true},
        {field: 'lat', key: 'e', title: '纬度', width: 30, titleAlign: 'center', columnAlign: 'left', isResize: true},
        {field: 'adname', key: 'f', title: '地址', width: 30, titleAlign: 'center', columnAlign: 'left', isResize: true},
        {field: 'adcode', key: 'g', title: '地址代码', width: 30, titleAlign: 'center', columnAlign: 'left', isResize: true}
      ],
      isSelectedKey: true
    }
  },
  computed: {
    tableData() {
      const {pageIndex, pageSize} = this;
      console.log("tableData:\n" + this.DB_DATA.slice((pageIndex - 1) * pageSize, pageIndex * pageSize))
      return this.DB_DATA.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
    },

    totalCount() {
      return this.DB_DATA.length;
    },
  },
  methods: {

    changeSelectedKey() {
      this.isSelectedKey = !this.isSelectedKey;
    },

    // page number change
    pageNumberChange(pageIndex) {
      this.pageIndex = pageIndex;
    },

    // page size change
    pageSizeChange(pageSize) {
      this.pageIndex = 1;
      this.pageSize = pageSize;
    },

    // selected rowKeys change
    changeSelectedRowKeys(row, isSelected) {
      const rowKey = row.id;

      if (isSelected) {
        this.checkboxOption.selectedRowKeys.push(rowKey);
        this.selectedRowKeysCollection.push(rowKey);
      } else {
        const index = this.checkboxOption.selectedRowKeys.indexOf(rowKey);
        this.checkboxOption.selectedRowKeys.splice(index, 1);
        this.selectedRowKeysCollection.splice(index, 1);
      }
    },

    // select all change
    changeSelectAll(isSelected, selectedRowKeys) {
      this.checkboxOption.selectedRowKeys = selectedRowKeys;

      if (isSelected) {
        this.selectedRowKeysCollection =
          this.selectedRowKeysCollection.concat(selectedRowKeys);
      } else {
        this.currentPageData.forEach((item) => {
          if (selectedRowKeysCollection.indexOf(item.id) > -1) {
            this.selectedRowKeysCollection.splice(index, 1);
          }
        });
      }
    },

    // reset selectedRowKeys
    resetSelectedRowKeys() {
      this.checkboxOption.selectedRowKeys = [];

      const selectedRowKeysCollection = this.selectedRowKeysCollection;

      if (selectedRowKeysCollection.length) {
        this.currentPageData.forEach((item) => {
          if (selectedRowKeysCollection.indexOf(item.id) > -1) {
            this.checkboxOption.selectedRowKeys.push(item.id);
          }
        });
      }
    },

    // page number change
    pageNumberChange2(pageIndex) {
      this.pageIndex = pageIndex;
      this.resetSelectedRowKeys();
    },

    // page size change
    pageSizeChange2(pageSize) {
      this.pageIndex = 1;
      this.pageSize = pageSize;
      this.resetSelectedRowKeys();
    },

    // Simulation table data
    initDatabase() {
      this.$axios.get('do/Site/SiteAll').then(res => {
        this.DB_DATA = res.data
        //console.log(res.data);
        //console.log("DB_DATA:\n" + DB_DATA);
      }).catch(function (error) {
        console.log(error);
      });
    }
  },
  created() {
    //这里直接在created函数中使用axios的get请求向后台获取用户信息数据
    // 在实际开发中可以卸载apiadress.js中配置具体的method对应的路径和接口，这个
    //后面完善功能的情况下再进行介绍
    this.initDatabase();

  }
}
</script>

<style scoped>
#selected-section button{
  border: 3px solid #FFFFFF; /* 设置按钮的边界粗细和颜色 */
  /*margin-top: 5px; !* 设置合适的上部外框的宽度，增加与上面的password框的距离 *!*/
  text-align: center;
  font-size: 15px; /* 修改按钮文字的大小 */
  /* 设置按钮里面字体颜色 */
  color: #FFFFFF;
  line-height: 25px;
  border-radius: 20px; /* 将按钮的左右边框设置为圆弧 */
  cursor: pointer;
  /* 圆角弧度24px */
  transition:0.2s;
  /* 设置按钮背景为天空蓝 */
  background:	#87CEFA ;
}
.table-sites-pagination {
  margin-top: 20px;
  text-align: center;
}
</style>

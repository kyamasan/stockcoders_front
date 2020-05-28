<template>
  <div class="container">
    <h5>{{ content.name }}</h5>
    <div id="addprice">
      <AddPrice/>
    </div>
    <div id="chart">
      <Chart/>
    </div>
  </div>
</template>

<script>
import AddPrice from '@/components/AddPrice'
import Chart from '@/components/Chart'
import contents from '@/data/contents.json';

  export default {
    mounted() {
      this.getJsonData();
    },
    methods: {
      getJsonData: async function () {
        var cd = this.$route.params.id
        var result = contents.find(function(item) {
          if (item.cd === cd) return item 
        }, cd);
        this.content = result;
      },
    },
    components: {
      AddPrice,
      Chart
    },
    data() {
      return {
        Chart: {},
        content: "",
      }
  }
}
</script>

<style>
.container{
  width: 800px;
}
</style>
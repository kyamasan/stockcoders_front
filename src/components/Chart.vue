<template>
  <div v-on:mousemove="recievedData" class="container">
    <apexchart type="candlestick" :options="options" :series="series"></apexchart>
  </div>
</template>

<script>
import Axios from 'axios'
import ApexCharts from 'apexcharts'

export default {
  mounted() {
    this.getData();
  },
  data() {
    return {
      options: {
        title: {
          text: '',
          align: 'left'
        },
        yaxis: {
          tooltip: {
            enabled: false
          }
        }
      },
      series: [{
        data: ""
      }],
    }
  },
  methods: {
    getData: async function () {
      const newData = await Axios.get('http://127.0.0.1:8000/data/', {params: {'cd': this.$route.params.id}})
      this.series = [{
          data: JSON.parse(newData.data)
      }]
    },
    recievedData: function() {
      var selectedDate = document.getElementsByClassName('apexcharts-xaxistooltip-text')[0]
      var selectedPrice = document.getElementsByClassName('apexcharts-tooltip-candlestick')[0].lastChild.lastChild
      this.$parent.selectedDate = selectedDate.innerText
      this.$parent.selectedPrice = selectedPrice.innerText
    },
  }
}
</script>

<style>
.apexcharts-data-labels {
  visibility: collapse;
}
</style>
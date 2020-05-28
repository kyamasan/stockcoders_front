<template>
  <div v-on:mousemove="recievedVolume" class="container">
    <apexchart id="volume" type="line" height=350 :options="chartOptions" :series="series" />
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
        series: [{
          name: 'Volume',
          data: ""
        },],
        chartOptions: {
          stroke: {
            curve: 'smooth'
          },
          fill: {
            opacity: 0.8
          },
          markers: {
            size: 0
          },
          chart: {
            stacked: false,
            toolbar: {
              show: true
            },
            zoom: {
              enabled: true
            }
          },
          responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                position: 'top',
                offsetX: -10,
                offsetY: 0
              }
            }
          }],
          plotOptions: {
            bar: {
              horizontal: false,
            },
          },
          legend: {
            position: 'right',
            offsetY: 40
          }
        }
    }
  },
  methods: {
    getData: async function () {
      const cachedVolumeData = localStorage.getItem('stockcoder_volume_' + this.$route.params.id)
      const cachedDateData = localStorage.getItem('stockcoder_date_' + this.$route.params.id)
      if (cachedVolumeData && cachedDateData) {
        this.series = [{
          data: JSON.parse(cachedVolumeData)
        }],
        this.chartOptions = {
            xaxis: {
                categories: JSON.parse(cachedDateData)
            }
        }
        return
      }
      const volumeData = await Axios.get('https://mysql0115.appspot.com/volume/', {params: {'cd': this.$route.params.id}})
      const dateData = await Axios.get('https://mysql0115.appspot.com/date/', {params: {'cd': this.$route.params.id}})

      this.series = [{
          data: JSON.parse(volumeData.data)
      }],
      this.chartOptions = {
          xaxis: {
              categories: JSON.parse(dateData.data)
          }
      }
      localStorage.setItem('stockcoder_volume_' + this.$route.params.id, volumeData.data)
      localStorage.setItem('stockcoder_date_' + this.$route.params.id, dateData.data)
    },
    recievedVolume: function() {
      var selectedDate2 = document.getElementById('volume').getElementsByClassName('apexcharts-tooltip-title')[0]
      var selectedVolume = document.getElementById('volume').getElementsByClassName('apexcharts-tooltip-text-value')[0]
      this.$parent.selectedDate2 = selectedDate2.innerText
      this.$parent.selectedVolume = selectedVolume.innerText
    },
  }
}
</script>

<style>
.apexcharts-xaxis {
  visibility: collapse;
}
</style>
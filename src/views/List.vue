<template>
  <div class="container">
    <contents :contents="Contents" v-bind:dateInfo="dateInfo" />
  </div>
</template>

<script>
import Contents from '@/components/Contents'
export default {
  components: {
    Contents
  },
  data() {
    return {
      contents: {},
      dateInfo: ""
    }
  }
}
</script>
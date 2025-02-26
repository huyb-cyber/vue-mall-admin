<template>
  <div>
    <Card>
    </Card>
    <Sale>
    </Sale>
    <Observe>
    </Observe>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Card from'@/views/dashboard/card'
import Sale from '@/views/dashboard/sale'
import Observe from '@/views/dashboard/observe'


export default {
  name: 'Dashboard',
  components: {Card, Sale, Observe},
  mounted() {

    this.$store.dispatch('getData');
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

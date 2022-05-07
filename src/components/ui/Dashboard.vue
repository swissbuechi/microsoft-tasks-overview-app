<template>
  <div>
    <v-row align="center"
           justify="center">
      <DashboardItem v-for="(board) in items" :key="board.title"
                     :count=board.counter
                     :icon=board.icon
                     :link=board.link
                     :title=board.title
                     show-count="true">
      </DashboardItem>
    </v-row>
  </div>
</template>
<script>
import DashboardItem from "@/components/ui/DashboardItem";

export default {
  data() {
    return {
    }
  },
  components: {
    DashboardItem
  },
  props: {
    items: null
  }
}
</script>
<template>
  <v-flex class="dashboard-item" lg3 pa-10>
    <v-card :to="link" class="pa-1">
      <v-list-item>
        <v-icon v-if="icon" :size="100">{{ icon }}</v-icon>
        <v-list-item-content v-if="showCount && icon">
          <div class="overline text-right">{{ title }}</div>
          <v-list-item-title class="headline text-right">{{ count }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-content v-if="showCount && !icon">
          <div class="overline text-center">{{ title }}</div>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </v-flex>
</template>
<script>
export default {
  data() {
    return {}
  },
  props: {
    title: null,
    icon: null,
    link: null,
    count: null,
    showCount: null
  },
  computed: {},
}
</script>
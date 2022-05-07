<template>
  <v-navigation-drawer
      app clipped permanent mini-variant expand-on-hover>
    <v-list dense nav>
      <v-list-item v-for="(item, i) in adminItems" :key="i" :to="item.link" link style="text-decoration: none">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ item.text }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "app",
  data: () => ({
    adminItems: [
      {
        icon: 'mdi-account-group',
        text: "Other's Planner Tasks",
        link: '/planner/others',
      },
      {
        icon: 'mdi-account',
        text: 'My Planner Tasks',
        link: '/planner/me',
      }
    ],
  })
}
</script>
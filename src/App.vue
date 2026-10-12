<template>
  <v-app id="inspire">
    <MenuBar />
    <v-main>
      <v-container class="py-8 px-6" fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import MenuBar from './components/MenuBar.vue'
</script>

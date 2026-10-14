<template>
    <v-navigation-drawer v-model="drawer" permanent rail expand-on-hover>
        <v-sheet class="pa-4 text-center" color="blue-darken-4">
            <v-img src="@/assets/logo.png" contain height="32" />
        </v-sheet>

        <v-divider></v-divider>

        <v-list>
            <v-list-item v-for="[icon, text, url] in links" :key="icon" :prepend-icon="icon" :title="text" :to="url"
                link>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue'
const drawer = ref(null)
const links = [
    ['mdi-home', 'Página Inicial', '/'],
    ['mdi-calendar-search', 'Consultar Eventos', '/consulta'],
    ['mdi-calendar-plus', 'Gerenciar Eventos', '/management'],
]
</script>
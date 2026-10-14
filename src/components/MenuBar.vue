<template>
    <v-navigation-drawer v-model="drawer" permanent rail expand-on-hover>
        <v-sheet class="pa-4 text-center" color="blue-darken-4">
            <v-icon icon="mdi-calendar-star" size="32" color="white" />
        </v-sheet>

        <v-divider></v-divider>

        <v-list nav>
            <v-list-item v-for="[icon, text, url] in links" :key="icon" :prepend-icon="icon" :title="text" :to="url"
                class="event-menu-item" link />
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

<style scoped>
:deep(.event-menu-item) {
    margin: 4px 6px;
    border-radius: 8px;
    transition: background-color 0.2s ease;
}

:deep(.event-menu-item:hover) {
    background-color: rgba(25, 118, 210, 0.25) !important;
}

:deep(.event-menu-item.v-list-item--active) {
    background-color: #0D47A1 !important;
    color: white !important;
}

:deep(.event-menu-item.v-list-item--active .v-icon) {
    color: white !important;
}

:deep(.event-menu-item.v-list-item--active:hover) {
    background-color: #1976D2 !important;
}
</style>
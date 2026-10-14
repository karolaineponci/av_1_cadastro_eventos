<template>
    <v-row>
        <v-col cols="12">
            <v-text-field
                :model-value="search"
                label="Buscar eventos..."
                placeholder="Nome, categoria, estado ou município"
                prepend-inner-icon="mdi-magnify"
                clearable
                @update:model-value="emit('update:search', $event)"
            />
        </v-col>

        <v-col cols="12" sm="4">
            <v-select
                :model-value="categoryFilter"
                :items="categories"
                label="Filtrar por categoria"
                clearable
                @update:model-value="emit('update:category-filter', $event)"
            />
        </v-col>

        <v-col cols="12" sm="4">
            <v-text-field
                :model-value="dateFrom"
                label="Data inicial"
                type="date"
                @update:model-value="emit('update:date-from', $event)"
            />
        </v-col>

        <v-col cols="12" sm="4">
            <v-text-field
                :model-value="dateTo"
                label="Data final"
                type="date"
                @update:model-value="emit('update:date-to', $event)"
            />
        </v-col>

        <v-col cols="12" sm="6">
            <v-select
                :model-value="openFilter"
                :items="openOptions"
                label="Situação das inscrições"
                @update:model-value="emit('update:open-filter', $event)"
            />
        </v-col>

        <v-col cols="12" sm="6" class="d-flex align-center justify-end">
            <v-btn
                prepend-icon="mdi-filter-remove"
                variant="outlined"
                color="primary"
                @click="emit('clear-filters')"
            >
                Limpar filtros
            </v-btn>
        </v-col>
    </v-row>
</template>

<script setup>
defineProps({
    search: { type: String, default: '' },
    categoryFilter: { type: String, default: null },
    dateFrom: { type: String, default: '' },
    dateTo: { type: String, default: '' },
    openFilter: { type: String, default: '' },
    categories: { type: Array, default: () => [] },
    openOptions: { type: Array, default: () => [] },
})

const emit = defineEmits([
    'update:search',
    'update:category-filter',
    'update:date-from',
    'update:date-to',
    'update:open-filter',
    'clear-filters',
])
</script>
<template>
    <v-card>
        <v-card-title>
            <v-icon icon="mdi-calendar-search" start></v-icon>
            Consulta de Eventos
        </v-card-title>

        <v-card-text>
            <FiltrosEvento :search="search" @update:search="search = $event" :category-filter="categoryFilter"
                @update:category-filter="categoryFilter = $event" :date-from="dateFrom"
                @update:date-from="dateFrom = $event" :date-to="dateTo" @update:date-to="dateTo = $event"
                :open-filter="openFilter" @update:open-filter="openFilter = $event" :categories="categories"
                :open-options="openOptions" @clear-filters="clearFilters" />

            <p class="mb-3">Resultados encontrados: {{ filteredEvents.length }}</p>

            <v-data-table :headers="headers" :items="filteredEvents" items-per-page-text="Itens por página:"
                page-text="{0}-{1} de {2}">
                <template v-slot:item.date="{ item }">
                    {{ formatDate(item.date) }}
                </template>

                <template v-slot:item.open="{ item }">
                    {{ item.open ? 'Sim' : 'Não' }}
                </template>

                <template v-slot:no-data>
                    <div class="pa-4 text-center">
                        Nenhum evento encontrado.
                        Tente alterar ou limpar os filtros.
                    </div>
                </template>
            </v-data-table>
        </v-card-text>
    </v-card>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { loadEvents } from '@/services/storage'
import FiltrosEvento from '@/components/FiltrosEvento.vue'

const events = ref([])

const search = ref('')
const categoryFilter = ref(null)
const dateFrom = ref('')
const dateTo = ref('')
const openFilter = ref('')

const categories = ['Palestra',
    'Curso',
    'Workshop',
    'Congresso',
]

const openOptions = [{ title: 'Todas as situações', value: '' },
{ title: 'Inscrições abertas', value: 'true' },
{ title: 'Inscrições encerradas', value: 'false' },
]

const headers = [
    { title: 'ID', key: 'id' },
    { title: 'Nome do evento', key: 'name' },
    { title: 'Categoria', key: 'category' },
    { title: 'Vagas', key: 'vacancies' },
    { title: 'Data', key: 'date' },
    { title: 'Estado', key: 'state' },
    { title: 'Município', key: 'city' },
    { title: 'Inscrições abertas?', key: 'open' },
]

onMounted(() => {
    events.value = loadEvents()
})

const filteredEvents = computed(() => {
    return events.value.filter(event => {
        const term = search.value.trim().toLowerCase()

        const matchesSearch = [
            event.id,
            event.name,
            event.category,
            event.vacancies,
            event.date,
            event.state,
            event.city,
        ].some(value =>
            String(value ?? '').toLowerCase().includes(term)
        )

        if (term && !matchesSearch) return false

        if (
            categoryFilter.value &&
            event.category !== categoryFilter.value
        ) {
            return false
        }

        if (dateFrom.value && event.date < dateFrom.value) {
            return false
        }

        if (dateTo.value && event.date > dateTo.value) {
            return false
        }

        if (
            openFilter.value === 'true' &&
            !event.open
        ) {
            return false
        }

        if (
            openFilter.value === 'false' &&
            event.open
        ) {
            return false
        }

        return true
    })
})


function clearFilters() {
    search.value = ''
    categoryFilter.value = null
    dateFrom.value = ''
    dateTo.value = ''
    openFilter.value = ''
}

function formatDate(value) {
    if (!value) return ''

    const [year, month, day] = value.split('-')

    if (!year || !month || !day) return value

    return `${day}/${month}/${year}`
}
</script>
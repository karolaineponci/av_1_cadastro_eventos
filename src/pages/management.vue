<template>
    <v-sheet border rounded>
        <v-data-table :headers="headers" :items="events" items-per-page-text="Itens por página:"
            page-text="{0}-{1} de {2}">
            <template v-slot:top>
                <v-toolbar>
                    <v-toolbar-title>
                        <v-icon color="medium-emphasis" icon="mdi-account-plus" size="x-small" start></v-icon>
                        Gerenciar Eventos
                    </v-toolbar-title>
                    <v-btn class="me-2" prepend-icon="mdi-plus" rounded="lg" text="Adicionar" border
                        @click="add"></v-btn>
                </v-toolbar>
            </template>

            <template v-slot:item.actions="{ item }">
                <div class="d-flex ga-2 justify-end">
                    <v-icon color="medium-emphasis" icon="mdi-pencil" size="small" @click="edit(item.id)"></v-icon>

                    <v-icon color="medium-emphasis" icon="mdi-delete" size="small" @click="remove(item.id)"></v-icon>
                </div>
            </template>

            <template v-slot:no-data>
                <div class="pa-4 text-center">
                    Nenhum evento cadastrado.
                </div>
            </template>
        </v-data-table>
    </v-sheet>


    <v-dialog v-model="dialog" max-width="600">
        <v-card>
            <v-card-title class="bg-blue-darken-4">
                {{ isEditing ? 'Atualizar' : 'Adicionar' }} Evento
            </v-card-title>
            <v-card-text>
                <form @submit.prevent="submit">
                    <v-row>
                        <v-col cols="12">
                            <v-text-field label="Nome do evento" v-model="name" :error-messages="nameError" />
                        </v-col>

                        <v-col cols="12" sm="6">
                            <v-select label="Categoria" :items="categories" v-model="category"
                                :error-messages="categoryError" />
                        </v-col>

                        <v-col cols="12" sm="6">
                            <v-text-field label="Quantidade de vagas" type="number" :min="1" v-model="vacancies"
                                :error-messages="vacanciesError" />
                        </v-col>

                        <v-col cols="12" sm="6">
                            <v-text-field label="Data do evento" type="date" v-model="date"
                                :error-messages="dateError" />
                        </v-col>

                        <v-col cols="12" sm="6">
                            <v-text-field label="Estado" v-model="state" :error-messages="stateError" />
                        </v-col>

                        <v-col cols="12" sm="6">
                            <v-text-field label="Município" v-model="city" :error-messages="cityError" />
                        </v-col>

                        <v-col cols="12" sm="6">
                            <v-switch label="Inscrições abertas" v-model="open" color="primary" />
                        </v-col>
                    </v-row>
                </form>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions class="bg-surface-light">
                <v-btn text="Cancelar" variant="plain" @click="dialog = false"></v-btn>

                <v-spacer></v-spacer>

                <v-btn text="Salvar" @click="submit"></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" timeout="3000">
        {{ snackbarMessage }}
    </v-snackbar>
</template>

<script setup>
import { onMounted, ref, shallowRef, computed, watch } from 'vue'
import { loadEvents, saveEvents } from '@/services/storage'

const { handleSubmit, resetForm, setValues } = useForm({
    validationSchema: {
        name(value) {
            if (value?.trim().length >= 3) return true
            return 'Informe o nome do evento com pelo menos 3 caracteres.'
        },
        category(value) {
            if (value) return true
            return 'Selecione uma categoria.'
        },
        vacancies(value) {
            if (Number(value) >= 1) return true
            return 'Informe pelo menos 1 vaga.'
        },
        date(value) {
            if (value) return true
            return 'Informe a data do evento.'
        },
        state(value) {
            if (value?.trim()) return true
            return 'Informe o estado.'
        },
        city(value) {
            if (value?.trim()) return true
            return 'Informe o município.'
        },
    },
})

const { value: name, errorMessage: nameError } = useField('name')
const { value: category, errorMessage: categoryError } = useField('category')
const { value: vacancies, errorMessage: vacanciesError } = useField('vacancies')
const { value: date, errorMessage: dateError } = useField('date')
const { value: state, errorMessage: stateError } = useField('state')
const { value: city, errorMessage: cityError } = useField('city')
const { value: open } = useField('open')

const categories = [
    'Palestra',
    'Curso',
    'Workshop',
    'Congresso',
]

function createNewRecord() {
    return {
        id: '',
        name: '',
        category: '',
        vacancies: '',
        date: '',
        state: '',
        city: '',
        open: false,
    }
}

const events = ref([])

watch(events, (newEvents) => {
    saveEvents(newEvents)
}, { deep: true })

const formModel = ref(createNewRecord())
const dialog = shallowRef(false)
const isEditing = computed(() => formModel.value.id !== '')
const snackbar = ref(false)
const snackbarMessage = ref('')

const headers = [
    { title: 'ID', key: 'id' },
    { title: 'Nome do evento', key: 'name' },
    { title: 'Categoria', key: 'category' },
    { title: 'Vagas', key: 'vacancies' },
    { title: 'Data', key: 'date' },
    { title: 'Estado', key: 'state' },
    { title: 'Município', key: 'city' },
    { title: 'Inscrições abertas', key: 'open' },
    { title: 'Ações', key: 'actions', align: 'end', sortable: false },
]

onMounted(() => {
    events.value = loadEvents()
    reset()
})

function add() {
    formModel.value = createNewRecord()
    resetForm({ values: formModel.value })
    dialog.value = true
}

function edit(id) {
    const found = events.value.find(event => event.id === id)

    if (!found) return

    formModel.value = { ...found }
    setValues({ ...found })

    dialog.value = true
}

function remove(id) {
    const confirmar = window.confirm(
        'Tem certeza que deseja excluir este evento?'
    )

    if (!confirmar) return

    const index = events.value.findIndex(event => event.id === id)

    if (index !== -1) {
        events.value.splice(index, 1)

        snackbarMessage.value = 'Evento excluído com sucesso.'
        snackbar.value = true
    }
}

const submit = handleSubmit(values => {
    const editing = isEditing.value

    const record = {
        ...formModel.value,
        ...values,
    }

    if (editing) {
        const index = events.value.findIndex(
            event => event.id === formModel.value.id
        )

        if (index !== -1) {
            events.value[index] = record
        }
    } else {
        record.id = Date.now()
        events.value.push({ ...record })
    }

    formModel.value = record
    dialog.value = false

    snackbarMessage.value = editing
        ? 'Evento atualizado com sucesso.'
        : 'Evento cadastrado com sucesso.'

    snackbar.value = true
})

function reset() {
    dialog.value = false
    formModel.value = createNewRecord()
    resetForm({ values: formModel.value })
}
</script>
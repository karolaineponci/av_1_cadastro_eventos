<template>
    <v-container fluid class="pa-6">
        <v-row justify="center">
            <v-col cols="12" md="10" lg="8">
                <v-card class="pa-6">
                    <v-card-title class="text-h4">
                        <v-icon icon="mdi-calendar-star" start />
                        Sistema de Eventos
                    </v-card-title>

                    <v-card-text class="text-body-1">
                        Bem-vindo ao sistema de gerenciamento de eventos!
                        Aqui você pode cadastrar, editar e consultar eventos,
                        além de filtrar os registros conforme suas necessidades.
                    </v-card-text>

                    <v-card-actions class="flex-wrap ga-3">
                        <v-btn
                            color="primary"
                            prepend-icon="mdi-calendar-plus"
                            to="/management"
                        >
                            Gerenciar Eventos
                        </v-btn>

                        <v-btn
                            variant="outlined"
                            color="primary"
                            prepend-icon="mdi-calendar-search"
                            to="/consulta"
                        >
                            Consultar Eventos
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
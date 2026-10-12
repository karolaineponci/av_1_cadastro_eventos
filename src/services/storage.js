
const STORAGE_KEY = 'eventos'

export function loadEvents() {
    try {
        const data = localStorage.getItem(STORAGE_KEY)
        return data ? JSON.parse(data) : []
    } catch (error) {
        console.error('Erro ao carregar eventos:', error)
        return []
    }
}

export function saveEvents(events) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(events))
    } catch (error) {
        console.error('Erro ao salvar eventos:', error)
    }
}
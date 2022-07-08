import { defineStore } from 'pinia'


export const useUiStore = defineStore('uiStore', {
    state: () => ({
        colors: {
            primary: '#11756e',
            secundary:'',
            text_ligth: '#ffffff',
            text_dark: ''
        }
    })
})

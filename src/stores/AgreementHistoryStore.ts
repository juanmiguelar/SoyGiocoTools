import { defineStore } from "pinia";
import localforage from "localforage";

interface Calculation {
  pricePerPerson: number;
  numAttendees: number;
  agreementType: string;
  agreementValue: number;
  grossIncome: number;
  agreement: number;
  netIncome: number;
  description: string;
  timestamp: string;
}

export const useHistoryStore = defineStore("history", {
  state: () => ({
    history: [] as Calculation[], // Array para almacenar el historial de cálculos
  }),
  actions: {
    // Cargar el historial desde localforage
    async loadHistory() {
      try {
        const savedHistory = await localforage.getItem<Calculation[]>(
          "history"
        );
        this.history = savedHistory || [];
      } catch (error) {
        console.error("Error loading history:", error);
        this.history = [];
      }
    },

    // Agregar un nuevo cálculo al historial
    async addCalculation(calculation: Calculation) {
      try {
        // Clonar el cálculo para evitar almacenar propiedades reactivas
        const clonedCalculation = JSON.parse(JSON.stringify(calculation));

        // Crear una nueva copia del historial
        const newHistory = JSON.parse(
          JSON.stringify([clonedCalculation, ...this.history])
        );

        // Actualizar el estado e guardar en localforage
        this.history = newHistory;
        await localforage.setItem("history", newHistory);
      } catch (error) {
        console.error("Error saving calculation:", error);
      }
    },

    // Eliminar un cálculo del historial
    async deleteCalculation(index: number) {
      try {
        // Verificar que el índice sea válido
        if (index < 0 || index >= this.history.length) {
          throw new Error(`Invalid index: ${index}`);
        }

        // Crear una copia del historial sin el elemento a eliminar
        const updatedHistory = JSON.parse(
          JSON.stringify([
            ...this.history.slice(0, index),
            ...this.history.slice(index + 1),
          ])
        );

        // Actualizar el estado y guardar en localforage
        this.history = updatedHistory;
        await localforage.setItem("history", updatedHistory);
      } catch (error) {
        console.error("Error deleting calculation:", error);
      }
    },
  },
});

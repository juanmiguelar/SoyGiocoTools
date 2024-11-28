<template>
    <v-dialog
      v-model="visible"
      max-width="500"
    >
      <v-card>
        <v-card-title class="text-h5">
          {{ title }}
        </v-card-title>
        <v-card-text>
          {{ message }}
        </v-card-text>
        <v-card-actions>
          <v-btn
            text
            color="red"
            @click="confirm"
          >
            {{ confirmText }}
          </v-btn>
          <v-btn text @click="cancel">
            {{ cancelText }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  
  export default defineComponent({
    name: "ConfirmDialog",
    props: {
      visible: {
        type: Boolean,
        required: true,
      },
      title: {
        type: String,
        default: "Confirm",
      },
      message: {
        type: String,
        default: "Are you sure?",
      },
      confirmText: {
        type: String,
        default: "Confirm",
      },
      cancelText: {
        type: String,
        default: "Cancel",
      },
    },
    emits: ["update:visible", "confirm", "cancel"],
    methods: {
      confirm() {
        this.$emit("confirm"); // Emitir evento cuando se confirme
        this.$emit("update:visible", false); // Cerrar el diálogo
      },
      cancel() {
        this.$emit("cancel"); // Emitir evento cuando se cancele
        this.$emit("update:visible", false); // Cerrar el diálogo
      },
    },
  });
  </script>
  
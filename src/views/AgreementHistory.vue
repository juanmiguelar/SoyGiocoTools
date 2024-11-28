<template>
  <v-container class="agreement-history" fluid>
    <v-card class="pa-5 mx-auto" max-width="800">
      <v-card-title class="text-h5">{{
        $t("agreementHistory.title")
      }}</v-card-title>
      <v-divider class="my-4"></v-divider>

      <!-- Alert when no history is available -->
      <v-alert v-if="!history.length" type="info" border="start" prominent>
        {{ $t("agreementHistory.noHistory") }}
      </v-alert>

      <!-- Expandable list of agreements -->
      <v-expansion-panels v-if="history.length" accordion>
        <v-expansion-panel v-for="(item, index) in sortedHistory" :key="index">
          <!-- Panel Title -->
          <v-expansion-panel-title>
            {{ item.description || $t("agreementHistory.noDescription") }}
          </v-expansion-panel-title>

          <!-- Panel Content -->
          <v-expansion-panel-text>
            <v-row>
              <v-col>
                <div>
                  <strong>{{ $t("agreementTool.grossIncome") }}:</strong>
                  {{ item.grossIncome }} colones
                </div>
                <div>
                  <strong>{{ $t("agreementTool.agreement") }}:</strong>
                  {{ item.agreement }} colones
                </div>
                <div>
                  <strong>{{ $t("agreementTool.netIncome") }}:</strong>
                  {{ item.netIncome }} colones
                </div>
              </v-col>
              <v-col>
                <div>
                  <strong>{{ $t("agreementTool.pricePerPerson") }}:</strong>
                  {{ item.pricePerPerson }}
                </div>
                <div>
                  <strong>{{ $t("agreementTool.numberOfAttendees") }}:</strong>
                  {{ item.numAttendees }}
                </div>
                <div>
                  <strong>{{ $t("agreementTool.agreementType") }}:</strong>
                  {{ $t(`agreementTool.agreementTypes.${item.agreementType}`) }}
                </div>
              </v-col>
              <v-col>
                <div>
                  <strong>{{ $t("agreementTool.addDescription") }}:</strong>
                  {{ item.description }}
                </div>
                <div>
                  <strong>{{ $t("agreementHistory.savedAt") }}:</strong>
                  {{ new Date(item.timestamp).toLocaleString() }}
                </div>
              </v-col>
            </v-row>
            <!-- Delete Button -->
            <v-btn
              color="error"
              class="mt-3"
              @click="openConfirmDialog(index)"
              outlined
              block
            >
              <v-icon left>mdi-delete</v-icon>
              {{ $t("agreementHistory.delete") }}
            </v-btn>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>

    <!-- Confirm Dialog -->
    <ConfirmDialog
      :visible="dialogVisible"
      :title="$t('agreementHistory.confirmDeleteTitle')"
      :message="$t('agreementHistory.confirmDeleteMessage')"
      :confirmText="$t('agreementHistory.confirm')"
      :cancelText="$t('agreementHistory.cancel')"
      @update:visible="dialogVisible = $event"
      @confirm="deleteSelectedItem"
    />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useHistoryStore } from "../stores/AgreementHistoryStore";
import ConfirmDialog from "../components/ConfirmDialog.vue";

export default defineComponent({
  name: "AgreementHistory",
  components: { ConfirmDialog },
  data() {
    return {
      dialogVisible: false,
      selectedIndex: null as number | null, // Guardar índice del elemento a eliminar
    };
  },
  computed: {
    history() {
      return useHistoryStore().history;
    },
    sortedHistory() {
      return [...this.history].sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    },
  },
  methods: {
    openConfirmDialog(index: number) {
      this.selectedIndex = index; // Guardar el índice seleccionado
      this.dialogVisible = true; // Mostrar el diálogo de confirmación
    },
    deleteSelectedItem() {
      if (this.selectedIndex !== null) {
        const historyStore = useHistoryStore();
        historyStore.deleteCalculation(this.selectedIndex); // Eliminar el elemento
        this.dialogVisible = false; // Cerrar el diálogo
        this.selectedIndex = null; // Resetear el índice
      }
    },
  },
  mounted() {
    const historyStore = useHistoryStore();
    historyStore.loadHistory();
  },
});
</script>

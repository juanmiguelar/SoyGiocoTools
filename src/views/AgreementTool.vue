<template>
  <v-container class="agreement-tool" fluid>
    <v-card class="pa-5 mx-auto" max-width="600">
      <v-card-title class="text-h5">{{
        $t("agreementTool.title")
      }}</v-card-title>
      <v-card-subtitle>{{ $t("agreementTool.subtitle") }}</v-card-subtitle>
      <v-divider class="my-4"></v-divider>

      <!-- Form for Input -->
      <v-form @submit.prevent="calculate" ref="form">
        <v-text-field
          :label="$t('agreementTool.pricePerPerson')"
          :placeholder="$t('agreementTool.placeholders.pricePerPerson')"
          v-model.number="pricePerPerson"
          type="number"
          outlined
          required
        ></v-text-field>

        <v-text-field
          :label="$t('agreementTool.numberOfAttendees')"
          :placeholder="$t('agreementTool.placeholders.numberOfAttendees')"
          v-model.number="numAttendees"
          type="number"
          outlined
          required
        ></v-text-field>

        <v-select
          :label="$t('agreementTool.agreementType')"
          :items="agreementTypes"
          v-model="agreementType"
          item-value="value"
          item-title="label"
          outlined
          required
        ></v-select>

        <v-text-field
          :label="$t('agreementTool.agreementValue')"
          :placeholder="$t('agreementTool.placeholders.agreementValue')"
          v-model.number="agreementValue"
          type="number"
          outlined
          required
        ></v-text-field>

        <v-btn class="mt-4" type="submit" color="primary" block large>
          {{ $t("agreementTool.calculate") }}
        </v-btn>
      </v-form>

      <!-- Calculation Results and Save Option -->
      <v-alert
        v-if="result"
        class="mt-5"
        type="success"
        border="start"
        prominent
      >
        <div>
          {{ $t("agreementTool.grossIncome") }}:
          <strong>{{ result.grossIncome }}</strong> colones
        </div>
        <div>
          {{ $t("agreementTool.agreement") }}:
          <strong>{{ result.agreement }}</strong> colones
        </div>
        <div>
          {{ $t("agreementTool.netIncome") }}:
          <strong>{{ result.netIncome }}</strong> colones
        </div>

        <!-- Description Input -->
        <v-text-field
          :label="$t('agreementTool.addDescription')"
          :placeholder="$t('agreementTool.placeholders.addDescription')"
          v-model="description"
          outlined
          class="mt-4"
        ></v-text-field>

        <!-- Save Button -->
        <v-btn
          class="mt-2"
          color="secondary"
          @click="saveCalculation"
          :disabled="!description.trim()"
        >
          <v-icon left>mdi-content-save</v-icon>
          {{ $t("agreementTool.saveCalculation") }}
        </v-btn>
      </v-alert>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useHistoryStore } from "../stores/AgreementHistoryStore";
import { useI18n } from "vue-i18n";

interface CalculationResult {
  grossIncome: number;
  agreement: number;
  netIncome: number;
}

export default defineComponent({
  name: "AgreementTool",
  setup() {
    const { t } = useI18n();

    const agreementTypes = computed(() => [
      {
        value: "percentage",
        label: t("agreementTool.agreementTypes.percentage"),
      },
      { value: "fixed", label: t("agreementTool.agreementTypes.fixed") },
    ]);

    return {
      agreementTypes,
    };
  },
  data() {
    return {
      pricePerPerson: 0,
      numAttendees: 0,
      agreementType: "percentage",
      agreementValue: 0,
      result: null as CalculationResult | null,
      description: "", // Field for adding a description to saved calculations
    };
  },
  methods: {
    calculate() {
      // Calculate Gross Income
      const grossIncome = this.pricePerPerson * this.numAttendees;
      let agreement = 0;

      // Determine Agreement Value
      if (this.agreementType === "percentage") {
        agreement = (grossIncome * this.agreementValue) / 100;
      } else {
        agreement = this.agreementValue * this.numAttendees;
      }

      // Calculate Net Income
      const netIncome = grossIncome - agreement;

      // Save Result
      this.result = { grossIncome, agreement, netIncome };
    },
    saveCalculation() {
      if (!this.result || !this.description.trim()) return;

      // Save Calculation to History Store
      const historyStore = useHistoryStore();
      historyStore.addCalculation({
        ...this.result,
        pricePerPerson: this.pricePerPerson,
        numAttendees: this.numAttendees,
        agreementType: this.agreementType,
        agreementValue: this.agreementValue,
        description: this.description,
        timestamp: new Date().toISOString(), // Record the time of the calculation
      });

      // Reset Description
      this.description = "";
    },
  },
});
</script>

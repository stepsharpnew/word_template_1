<template>
  <div class="my-5 text-center">
    <v-btn
      color="primary"
      @click="dialog = true"
      class="mr-5"
      rounded="xl"
      elevation="2"
    >
      Выбрать причины
    </v-btn>
    <v-btn
      color="red-darken-2"
      @click="clearReasons"
      rounded="xl"
      elevation="2"
    >
      Очистить
    </v-btn>

    <v-dialog
      v-model="dialog"
      max-width="1000"
      transition="dialog-bottom-transition"
    >
      <v-card elevation="6" class="rounded-xl">
        <v-card-title class="bg-primary text-white">
          <span class="text-h6 font-weight-bold"
            >Выберите причины в порядке очередности абзацев</span
          >
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-card
                v-for="reason in leftColumn"
                :key="reason.id"
                class="ma-2 pa-4 clickable rounded-lg reason-card"
                :elevation="isSelected(reason) ? 8 : 2"
                :color="getReasonColor(reason)"
                @click="selectReason(reason)"
              >
                <v-row align="center" no-gutters>
                  <v-col>
                    <span class="text-body-1 font-weight-medium">
                      {{ reason.description }}
                    </span>
                  </v-col>
                  <v-col cols="auto" v-if="isSelected(reason)">
                    <v-chip
                      small
                      color="primary"
                      text-color="white"
                      class="elevation-2"
                    >
                      {{ getOrder(reason) }}
                    </v-chip>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>

            <v-col cols="6">
              <v-card
                v-for="reason in rightColumn"
                :key="reason.id"
                class="ma-2 pa-4 clickable rounded-lg reason-card"
                :elevation="isSelected(reason) ? 8 : 2"
                :color="getReasonColor(reason)"
                @click="selectReason(reason)"
              >
                <v-row align="center" no-gutters>
                  <v-col>
                    <span class="text-body-1 font-weight-medium">
                      {{ reason.description }}
                    </span>
                  </v-col>
                  <v-col cols="auto" v-if="isSelected(reason)">
                    <v-chip
                      small
                      color="primary"
                      text-color="white"
                      class="elevation-2"
                    >
                      {{ getOrder(reason) }}
                    </v-chip>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="pa-4">
          <v-spacer />
          <v-btn
            variant="outlined"
            color="grey-darken-1"
            rounded="lg"
            @click="dialog = false"
          >
            Отмена
          </v-btn>
          <v-btn color="primary" rounded="lg" elevation="3" @click="save">
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      dialog: false,
      reasons: [],
      selectedReasons: [],
    };
  },
  computed: {
    leftColumn() {
      return this.reasons.filter((_, i) => i % 2 === 0);
    },
    rightColumn() {
      return this.reasons.filter((_, i) => i % 2 !== 0);
    },
  },
  async mounted() {
    try {
      const res = await axios.get("/api/transformer/reasons");
      this.reasons = Array.isArray(res.data)
        ? res.data
        : Object.values(res.data || {});
    } catch (e) {
      console.error("Ошибка загрузки:", e);
    }
  },
  methods: {
    selectReason(reason) {
      if (!this.isSelected(reason)) {
        this.selectedReasons.push(reason);
      } else {
        const index = this.selectedReasons.findIndex((r) => r.id === reason.id);
        if (index !== -1) this.selectedReasons.splice(index, 1);
      }
    },
    isSelected(reason) {
      return this.selectedReasons.some((r) => r.id === reason.id);
    },
    getOrder(reason) {
      const index = this.selectedReasons.findIndex((r) => r.id === reason.id);
      return index + 1;
    },
    getReasonColor(reason) {
      return this.isSelected(reason) ? "#e3f2fd" : "#ffffff";
    },
    save() {
      this.dialog = false;
      this.$emit("selectedReasons", this.selectedReasons);
    },
    clearReasons() {
      this.selectedReasons = [];
      this.$emit("reasonsCleared");
    },
  },
};
</script>

<style scoped>
.clickable {
  cursor: pointer;
  transition: all 0.25s ease-in-out;
}
.clickable:hover {
  transform: scale(1.02);
  background-color: #f5faff !important;
}
.reason-card {
  border: 1px solid #e0e0e0;
}
</style>

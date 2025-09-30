<template>
  <div class="my-5">
    <v-btn color="primary" @click="dialog = true" class="mr-5"
      >Выбрать причины</v-btn
    >
    <v-btn color="red-darken-2" @click="clearReasons"> Очистить </v-btn>
    <v-dialog v-model="dialog" max-width="1200">
      <v-card>
        <v-card-title>
          <span class="text-h6">Выберите причины в порядке очередности</span>
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-card
                v-for="reason in leftColumn"
                :key="reason.id"
                class="ma-1 pa-3 clickable"
                :color="getReasonColor(reason)"
                @click="selectReason(reason)"
              >
                <v-row align="center">
                  <v-col>
                    {{ reason.description }}
                  </v-col>
                  <v-col cols="auto" v-if="isSelected(reason)">
                    <v-chip small color="primary" text-color="white">
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
                class="ma-1 pa-3 clickable"
                :color="getReasonColor(reason)"
                @click="selectReason(reason)"
              >
                <v-row align="center">
                  <v-col>
                    {{ reason.description }}
                  </v-col>
                  <v-col cols="auto" v-if="isSelected(reason)">
                    <v-chip small color="primary" text-color="white" plain>
                      {{ getOrder(reason) }}
                    </v-chip>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer />
          <v-btn text @click="dialog = false">Отмена</v-btn>
          <v-btn color="primary" @click="save">Сохранить</v-btn>
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
      return this.isSelected(reason) ? "#d1e8ff" : "#ffffff";
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
  transition: background-color 0.2s;
}
.clickable:hover {
  background-color: #e6f0ff;
}
</style>

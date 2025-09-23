<template>
    <v-card
      class="mx-auto my-4"
      color="#f5f7fa"
      elevation="4"
      max-width="650"
      rounded="xl"
    >
      <v-toolbar color="#4a90e2" dark flat v-if="!hasSaved">
        <v-btn icon @click="collapsed = !collapsed">
          <v-icon>{{ collapsed ? 'mdi-chevron-down' : 'mdi-chevron-up' }}</v-icon>
        </v-btn>
  
        <v-toolbar-title class="font-weight-light">Причины не выбраны</v-toolbar-title>
        <v-spacer />
      </v-toolbar>

      <v-toolbar color="#3431a2" dark flat v-else>
        <v-btn icon @click="collapsed = !collapsed">
          <v-icon>{{ collapsed ? 'mdi-chevron-down' : 'mdi-chevron-up' }}</v-icon>
        </v-btn>
        <v-toolbar-title class="font-weight-light">Причины выбраны</v-toolbar-title>
        <v-spacer />
      </v-toolbar>
  
      <v-expand-transition>
        <div v-show="!collapsed">
          <v-card-text>
            <v-autocomplete
              v-model="selectedReasons"
              :items="states"
              item-title="text"
              item-value="id"
              return-object
              multiple
              chips
              closable-chips
              label="Выберите причины (макс. 5)"
              :counter="5"
              :rules="[limitSelection]"
              variant="outlined"
              density="comfortable"
              :menu-props="menuProps"
              class="autocomplete-fixed"
            >
              <!-- ВАЖНО: в Vuetify 3 слот #item даёт props — используем { item, props } -->
              <template #item="{ item, props }">
                <!-- применяем v-bind="props" (вместо старого v-bind="attrs" v-on="on") -->
                <v-list-item v-bind="props" dense>
                  <!-- v-list-item-content отсутствует в V3 — пишем title/subtitle прямо -->
                  <v-list-item-title class="truncate" :title="item.text">
                    {{ item.text }}
                  </v-list-item-title>
                  <v-list-item-subtitle v-if="item.description" class="truncate" :title="item.description">
                    {{ item.description }}
                  </v-list-item-subtitle>
                </v-list-item>
              </template>
  
              <!-- Слот выбора: тоже используем props (если он передаётся) и тултип для полного текста -->
              <template #selection="{ item, props }">
                <v-tooltip location="top">
                  <template #activator="{ props: tipProps }">
                    <!-- не используем v-on="on" -->
                    <v-chip small class="chip-truncate" v-bind="tipProps">
                      {{ item.text }}
                    </v-chip>
                  </template>
                  <span>{{ item.text }}</span>
                </v-tooltip>
              </template>
            </v-autocomplete>
          </v-card-text>
  
          <v-divider />
  
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" variant="elevated" @click="save">Сохранить</v-btn>
          </v-card-actions>
        </div>
      </v-expand-transition>
  
    </v-card>
  </template>
  
  <script>
  import axios from "axios"
  
  export default {
    data: () => ({
      collapsed: false,
      hasSaved: false,
      selectedReasons: [],
      states: [],
      menuProps: {
        maxHeight: 320,
        maxWidth: 680,
        offsetY: true,
      },
    }),
  
    async mounted() {
      try {
        const res = await axios.get("/api/transformer/reasons")
        const data = res.data
        if (Array.isArray(data)) {
          this.states = data
        } else if (data && typeof data === "object") {
          this.states = Object.keys(data).map((k) => data[k])
        }
      } catch (e) {
        console.error("Ошибка загрузки:", e)
      }
    },
  
    methods: {
      save() {
        this.hasSaved = true
        const payload = { reasons: this.selectedReasons.map((r) => r.id) }
        console.log("Отправляем:", payload)
        this.collapsed = !this.collapsed
      },
      limitSelection(value) {
        return value && value.length > 5 ? "Можно выбрать максимум 5 причин" : true
      },
    },
  }
  </script>
  
  <style scoped>
  .truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }
  
  .chip-truncate {
    max-width: 220px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .autocomplete-fixed {
    max-width: 100%;
  }
  </style>
  
<template>
  <div>
    <v-row class="pa-4" dense>
      <!-- Список шаблонов -->
      <v-col cols="12" md="6">
        <v-card class="pa-4 elevation-2" outlined>
          <div class="d-flex justify-space-between align-center mb-2">
            <div class="text-h5 font-weight-medium text-medium-emphasis">
              Выберите шаблон Word
            </div>
            <!-- <div class="text-caption grey--text">Шаблоны: {{ templates.length || '0' }}</div> -->
          </div>

          <v-row dense>
            <template v-if="loading">
              <v-col cols="12" class="d-flex justify-center py-6">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
              </v-col>
            </template>

            <template v-else-if="templates.length === 0">
              <v-col cols="12">
                <v-alert type="info" dense outlined>
                  Шаблоны не найдены. Попробуйте позже.
                </v-alert>
              </v-col>
            </template>

            <template v-else>
              <v-col
                v-for="tpl in templates"
                :key="tpl.idTemplate"
                cols="12"
                sm="6"
                md="6"
                lg="6"
                class="d-flex"
              >
                <v-card class="flex-grow-1 d-flex flex-column" outlined v-tooltip="tpl.description">
                  <v-img
                    :src="tpl.imageKey"
                    :alt="tpl.name"
                    height="140"
                    class="grey lighten-4"
                    contain
                  >
                    <template #placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular indeterminate color="secondary"></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>

                  <v-card-text class="py-2">
                    <div class="font-weight-medium subtitle-2">{{ tpl.name }}</div>
                    <div class="text-caption grey--text text-truncate" style="max-height: 3.6em; overflow:hidden;">
                      {{ tpl.description }}
                    </div>
                  </v-card-text>

                  <v-card-actions class="mt-auto">
                    <v-spacer></v-spacer>

                    <v-btn
                      small
                      color="primary"
                      @click="selectTemplate(tpl)"
                      :loading="sendingId === tpl.idTemplate"
                      :disabled="sendingId === tpl.idTemplate"
                      class="white--text"
                    >
                      Выбрать
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </template>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="pa-4 elevation-2" outlined>
          <div class="d-flex justify-space-between align-center mb-2">
            <div v-if="selectedTemplate" class="text-h5 font-weight-medium text-medium-emphasis">Выбранный шаблон</div>
            <div v-else class="text-h5 font-weight-medium text-medium-emphasis">Шаблон не выбран</div>
          </div>
          <v-img
            v-if="selectedTemplate"
            :src="selectedTemplate.mainImage"
            height="860"
            class="grey lighten-4"
            contain
          />
          <v-img
            v-else
            src="https://storage.yandexcloud.net/step2002sharp/ChatGPT%20Image%2012%20%D1%81%D0%B5%D0%BD%D1%82.%202025%20%D0%B3.%2C%2010_08_03.png"
            height="860"
            class="grey lighten-4"
            cover
          />
          
		  <!-- Photo -->
          <v-card-text >
            <p v-if="selectedTemplate" class="text-h5 font-weight-medium" style="color:darkgray">
              {{ selectedTemplate.description }}
            </p>
          </v-card-text>
          <v-card-actions class="pt-4">
            <v-btn
              :disabled="!selectedTemplate"
              color="red-darken-2"
              @click="clearSelection"
              small
            >
              Очистить
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>


    <v-snackbar v-model="snackbar.show" :timeout="snackbar.timeout" :color="snackbar.color">
      {{ snackbar.text }}
      <v-btn text @click="snackbar.show = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TemplatePicker',
  props: {
    // Базовый URL API (настраиваемый)
  },
  data() {
    return {
      templates: [], // полученные шаблоны
      loading: false,
      error: null,
      selectedTemplate: null,
      previewJson: '{}',
      sendingId: null, // id шаблона, который отправляется
      snackbar: {
        show: false,
        text: '',
        color: 'primary',
        timeout: 4000
      }
    };
  },
  mounted() {
    this.fetchTemplates();
  },
  methods: {
    async fetchTemplates() {
      this.loading = true;
      this.error = null;

      try {
          this.templates = this._demoTemplates();
          // this.showSnackbar('Не удалось загрузить шаблоны, показаны демонстрационные.', 'secondary');
        }
      finally {
        this.loading = false;
      }
    },

    selectTemplate(tpl) {
      this.selectedTemplate = tpl;
      this.$emit('template-selected', this.selectedTemplate);
      try {
        this.previewJson = JSON.stringify(tpl.previewData || tpl.sampleData || {}, null, 2);
      } catch (e) {
        this.previewJson = String(tpl.previewData || tpl.sampleData || {});
      }
    },

    clearSelection() {
      this.$emit('template-cleared');
      this.selectedTemplate = null;
      this.previewJson = '{}';
    },

    async sendTemplate(tpl) {
      if (!tpl || !tpl.idTemplate) {
        this.showSnackbar('Невалидный шаблон для отправки', 'secondary');
        return;
      }
      this.sendingId = tpl.idTemplate;
      const payload = tpl.previewData || tpl.sampleData || {};
    },

    showSnackbar(text, color = 'primary') {
      this.snackbar.text = text;
      this.snackbar.color = color;
      this.snackbar.show = true;
    },


    _demoTemplates() {
      return [
        {
          idTemplate: '1',
          name: 'ООО "Энергосистемы"',
          description: 'Информирование о задержке строительства Корнеева',
          imageKey: 'https://storage.yandexcloud.net/step2002sharp/3824.png',
          mainImage : 'https://storage.yandexcloud.net/step2002sharp/5073.png',
          previewData: { col1: 'Client', col2: 'Date', col3: 123.45 }
        },
        {
          idTemplate: '2',
          name: 'ООО "Энергосистемы"',
          description: 'Информирование о задержке строительства Логинова',
          imageKey: 'https://storage.yandexcloud.net/step2002sharp/3824.png',
          mainImage : 'https://storage.yandexcloud.net/step2002sharp/3824_1.png',
          previewData: { col1: 'Party A', col2: 'Party B', col3: 'Signature' }
        },
        {
          idTemplate: '3',
          name: 'ООО "Гефест"',
          description: 'ТСН СНТ Художник о недопуске',
          imageKey: 'https://storage.yandexcloud.net/step2002sharp/Gefest.png',
          mainImage : 'https://storage.yandexcloud.net/step2002sharp/4396.png',
          previewData: { col1: 'Client', col2: 'Date', col3: 123.45 }
        },
        {
          idTemplate: '4',
          name: 'ООО "Гефест"',
          description: 'О задержке сроков выполнения договора',
          imageKey: 'https://storage.yandexcloud.net/step2002sharp/Gefest.png',
          mainImage : 'https://storage.yandexcloud.net/step2002sharp/4955.png',
          previewData: { col1: 'Party A', col2: 'Party B', col3: 'Signature' }
        },
        {
          idTemplate: '5',
          name: 'ООО "Гефест"',
          description: 'Информирование о задержке ООО Платенхаус',
          mainImage : 'https://storage.yandexcloud.net/step2002sharp/5049.png',
          imageKey: 'https://storage.yandexcloud.net/step2002sharp/Gefest.png',
          previewData: { col1: 'Client', col2: 'Date', col3: 123.45 }
        },
        {
          idTemplate: '6',
          name: 'ООО "Энергосистемы"',
          description: 'Информирование о задержке строительства',
          imageKey: 'https://storage.yandexcloud.net/step2002sharp/3824.png',
          mainImage : 'https://storage.yandexcloud.net/step2002sharp/5257.png',
          previewData: { col1: 'Party A', col2: 'Party B', col3: 'Signature' }
        },
      ];
    }
  }
};
</script>

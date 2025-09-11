<template>
  <div>
    <v-row class="pa-4" dense>
      <!-- Список шаблонов -->
      <v-col cols="12" md="8">
        <v-card class="pa-4 elevation-2" outlined>
          <div class="d-flex justify-space-between align-center mb-2">
            <div class="text-subtitle-2 font-weight-medium primary--text">
              Выберите шаблон Word
            </div>
            <div class="text-caption grey--text">Шаблоны: {{ templates.length || '0' }}</div>
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
                :key="tpl.id"
                cols="12"
                sm="6"
                md="4"
                lg="3"
                class="d-flex"
              >
                <v-card class="flex-grow-1 d-flex flex-column" outlined>
                  <v-img
                    :src="s3Url(tpl.imageKey)"
                    :alt="tpl.name"
                    height="140"
                    class="grey lighten-4"
                    cover
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
                    <v-btn
                      small
                      text
                      @click="selectTemplate(tpl)"
                      class="ma-0"
                    >
                      Preview
                    </v-btn>

                    <v-spacer></v-spacer>

                    <v-btn
                      small
                      color="primary"
                      @click="sendTemplate(tpl)"
                      :loading="sendingId === tpl.id"
                      :disabled="sendingId === tpl.id"
                      class="white--text"
                    >
                      Send
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </template>
          </v-row>
        </v-card>
      </v-col>

      <!-- Preview блока (как у вас исходно) -->
      <v-col cols="12" md="4">
        <v-card class="pa-4 elevation-2" outlined>
          <div class="d-flex justify-space-between align-center mb-2">
            <div class="text-subtitle-2 font-weight-medium">Preview объекта для отправки</div>
            <div class="text-caption grey--text">Поля: col1 … col8</div>
          </div>

          <pre style="max-height:260px; overflow:auto; margin:0; font-size:13px;">
{{ previewJson }}
          </pre>

          <v-card-actions class="pt-4">
            <v-btn
              :disabled="!selectedTemplate"
              color="secondary"
              @click="clearSelection"
              small
            >
              Clear
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn
              :disabled="!selectedTemplate"
              color="primary"
              class="white--text"
              @click="sendTemplate(selectedTemplate)"
              :loading="sendingId === (selectedTemplate && selectedTemplate.id)"
            >
              Send selected
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Snackbar для уведомлений -->
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
    apiBase: {
      type: String,
      default: '/api' // ожидается, что GET `${apiBase}/templates` вернёт список
    },
    // S3 конфигурация — можно переопределить
    s3Bucket: {
      type: String,
      default: 'my-templates-bucket'
    },
    s3BaseUrl: {
      type: String,
      default: 'https://s3.amazonaws.com' // при необходимости укажите регионный домен
    }
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
    s3Url(key) {
      if (!key) return '';
      // Собираем URL: <s3BaseUrl>/<bucket>/<key>
      // Пример: https://s3.amazonaws.com/my-bucket/path/to/image.png
      // Если у вас другой формат (например регионный), передайте s3BaseUrl соответствующим образом
      return `${this.s3BaseUrl}/${this.s3Bucket}/${key}`;
    },

    async fetchTemplates() {
      this.loading = true;
      this.error = null;

      try {
        const res = await axios.get(`${this.apiBase}/templates`);
        // ожидаем массив объектов: { id, name, description, imageKey, previewData }
        if (Array.isArray(res.data) && res.data.length) {
          this.templates = res.data;
        } else {
          // fallback: показать несколько демонстрационных шаблонов (если сервер вернул пусто)
          this.templates = this._demoTemplates();
        }
      } catch (err) {
        console.error('fetchTemplates error', err);
        this.error = err;
        // показываем демо-шаблоны, чтобы UI не был пустым
        this.templates = this._demoTemplates();
        this.showSnackbar('Не удалось загрузить шаблоны, показаны демонстрационные.', 'secondary');
      } finally {
        this.loading = false;
      }
    },

    selectTemplate(tpl) {
      this.selectedTemplate = tpl;
      // previewData может быть объектом или строкой — приводим к читаемому JSON
      try {
        this.previewJson = JSON.stringify(tpl.previewData || tpl.sampleData || {}, null, 2);
      } catch (e) {
        this.previewJson = String(tpl.previewData || tpl.sampleData || {});
      }
    },

    clearSelection() {
      this.selectedTemplate = null;
      this.previewJson = '{}';
    },

    async sendTemplate(tpl) {
      if (!tpl || !tpl.id) {
        this.showSnackbar('Невалидный шаблон для отправки', 'secondary');
        return;
      }
      this.sendingId = tpl.id;

      // Пример отправки: POST `${apiBase}/send-template/:id` с телом data
      // По соглашению отправляем `payload` — текущий previewData (можно заменить)
      const payload = tpl.previewData || tpl.sampleData || {};

      try {
        const res = await axios.post(`${this.apiBase}/send-template/${tpl.id}`, { payload });
        // ожидаем успешный ответ
        this.showSnackbar(res.data && res.data.message ? res.data.message : 'Шаблон отправлен', 'primary');
      } catch (err) {
        console.error('sendTemplate error', err);
        this.showSnackbar('Ошибка при отправке шаблона', 'error');
      } finally {
        this.sendingId = null;
      }
    },

    showSnackbar(text, color = 'primary') {
      this.snackbar.text = text;
      this.snackbar.color = color;
      this.snackbar.show = true;
    },

    // Демонстрационные шаблоны (используются как fallback)
    _demoTemplates() {
      return [
        {
          id: 'tpl-word-01',
          name: 'Invoice / Счёт',
          description: 'Шаблон для выставления счетов — содержит поля client, items, total.',
          imageKey: 'demo/invoice.png',
          previewData: { col1: 'Client', col2: 'Date', col3: 123.45 }
        },
        {
          id: 'tpl-word-02',
          name: 'Contract / Договор',
          description: 'Базовый договор с местами для подписей и реквизитов.',
          imageKey: 'demo/contract.png',
          previewData: { col1: 'Party A', col2: 'Party B', col3: 'Signature' }
        },
        {
          id: 'tpl-word-03',
          name: 'Report / Отчёт',
          description: 'Шаблон отчёта с заголовком, таблицей и подписью.',
          imageKey: 'demo/report.png',
          previewData: { col1: 'Title', col2: 'Author', col3: 'Summary' }
        },
        {
          id: 'tpl-word-04',
          name: 'Offer / Коммерческое предложение',
          description: 'Краткое коммерческое предложение с пунктами и ценой.',
          imageKey: 'demo/offer.png',
          previewData: { col1: 'Item', col2: 'Qty', col3: 'Price' }
        }
      ];
    }
  }
};
</script>

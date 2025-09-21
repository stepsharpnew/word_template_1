<template>
  <v-app class="bg-background fill-height">
    <v-main>
      <v-container class="d-flex justify-center align-center" style="min-height: 90vh;">
        <v-hover v-slot="{ hover }">
          <v-card
            :elevation="hover ? 20 : 8"
            class="rounded-xl pa-8 w-100"
            style="max-width: 1500px; min-height: 800px; min-width: 1450px;"
          >

            <div class="mt-4">
              <SelectReason @template-selected="onTemplateSelected" @template-cleared="onTemplateCleared"/>
            </div>
              <div class="d-flex">
                <div class="d-flex w-100 ">
                  <v-file-input
                    v-model="files"
                    label="Выбрать .xlsx файл"
                    hint="Принимаются только .xlsx"
                    accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    :multiple="false"
                    class="ma-4 pa-6 rounded-lg elevation-4"
                    style="width: 100%; max-width: 680px;"
                    @change="onFilesChange"
                    show-size
                  >
                    <template #prepend>
                      <v-icon class="mr-3" size="32">mdi-file-excel</v-icon>
                    </template>
                  </v-file-input>
                </div>

                <div class="d-flex justify-space-around align-center mt-6 flex-column">
                  <div class="d-flex align-center">
                    <v-icon v-if="parsing" class="mr-2" spin>mdi-progress-clock</v-icon>
                    <v-icon v-else-if="parsedOk" color="success" class="mr-2">mdi-check-circle</v-icon>
                    <div class="text-caption">
                      <span v-if="parsing">Парсинг файла...</span>
                      <span v-else-if="parsedOk">Готов к отправке (объект сформирован)</span>
                    </div>
                  </div>

                  <v-hover v-slot="{ hover: btnHover }">
                    <v-btn
                      :elevation="btnHover ? 18 : 6"
                      class="rounded-lg px-6 py-3"
                      :disabled="!parsedOk || sending || !templateSelected"
                      color="primary"
                      dark
                      @click="handleProcess"
                    >
                      <v-icon left v-if="sending" spin>mdi-cloud-upload</v-icon>
                      Загрузить и конвертировать
                    </v-btn>
                  </v-hover>
                </div>

                <v-alert v-if="warning" type="warning" class="mt-4" density="comfortable">
                  {{ warning }}
                </v-alert>

                <v-alert v-if="error" type="error" class="mt-4" density="comfortable">
                  {{ error }}
                </v-alert>
            </div>
           
          </v-card>
        </v-hover>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import * as XLSX from 'xlsx'
import axios from 'axios'
import SelectReason from './SelectReason.vue'
import { mapRowToObject } from './mapObjects'
export default {
  name: 'App',
  data() {
    return {
      files: [],          // v-file-input model
      parsing: false,
      parsedOk: false,
      parsedObject: null, // итоговый объект с 8 полями
      error: '',
      warning: '',
      templateSelected : null,
      sending: false,
      keys: ['smrNo','contractNo','contractStatus','mainContract','customer','title','applicant','address',
        'cadastralNumber','powerByTU','tuReceived','receivedToWork','projectManager','classifier','surveyor',
        'gipExecutor','pirStatus','pirStatusDate','geoReceived','geoAgreeStatus','gnbPir','gnbPirDate',
        'smrStart','contractEnd'
      ]
    }
  },
  components : {
    SelectReason
  },
  computed: {
    previewJson() {
      return this.parsedObject ? JSON.stringify(this.parsedObject, null, 2) : ''
    }
  },
  methods: {
    onTemplateSelected(tpl){
      this.templateSelected = tpl
    },
    onTemplateCleared(){
      this.templateSelected = null
    },

    onFilesChange(newVal) {
      this.error = ''
      this.warning = ''
      this.parsedOk = false
      this.parsedObject = null


      let files = newVal && newVal.target && newVal.target.files
        ? Array.from(newVal.target.files)
        : null

      if (!files) {
        try {
          files = Array.from(newVal)
        } catch (e) {
          files = newVal instanceof File ? [newVal] : []
        }
      }

      if (!files.length) return

      const file = files[0]
      
      const ext = (file.name || '').split('.').pop().toLowerCase()
      if (ext !== 'xlsx') {
        this.error = 'Допускаются только файлы .xlsx'
        this.files = []
        return
      }

      // запускаем парсер (оставляем твой parseSingleRowXlsx)
      this.parseSingleRowXlsx(file)
    },
    parseSingleRowXlsx(file) {
      this.parsing = true
      this.error = ''
      this.parsedOk = false
      this.parsedObject = null
      this.warning = ''

      const reader = new FileReader()

      reader.onerror = () => {
        this.parsing = false
        this.error = 'Ошибка чтения файла'
      }

      reader.onload = (ev) => {
        try {
          const data = new Uint8Array(ev.target.result)
          const workbook = XLSX.read(data, { type: 'array' })
          
          if (!workbook.SheetNames || !workbook.SheetNames.length) {
            this.parsing = false
            this.error = 'В файле нет листов'
            return
          }

          const firstSheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[firstSheetName]
          // Получаем строковый массив (header:1) — удобно брать первую (заголовки) и вторую (данные)
          const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: null })
          
          if (!rows || !rows.length) {
            this.parsing = false
            this.error = 'Файл пустой'
            return
          }

          let dataRow = null
          if (rows.length >= 1) {
            dataRow = rows[1]      
          } else {
            dataRow = rows[0]
          }
          // Если dataRow — пусто или не массив -> ошибка
          if (!Array.isArray(dataRow)) {
            this.parsing = false
            this.error = 'Не удалось получить строку данных'
            return
          }
          const normalized = []
          for (let i = 0; i < dataRow.length; i++) {
            normalized[i] = i < dataRow.length ? dataRow[i] : null
          }
          
          const obj = mapRowToObject(normalized)
     

          this.parsedObject = obj
          this.parsedOk = true
          this.parsing = false
        } catch (err) {
          console.error(err)
          this.parsing = false
          this.error = 'Не удалось распарсить xlsx'
        }
      }

      reader.readAsArrayBuffer(file)
    },

    async handleProcess() {
      this.error = ''
      if (!this.parsedOk || !this.parsedObject) {
        this.error = 'Нет готового объекта для отправки'
        return
      }
      this.parsedObject = {...this.parsedObject,...this.templateSelected}

      this.sending = true
      try {
        const resp = await axios.post('/api/transformer/letter', this.parsedObject, {
          responseType: 'arraybuffer' // <- важно
        });
        console.log(this.parsedObject);
        const filename = `${this.parsedObject.contractNo}_${new Date().toLocaleDateString('ru-RU')}.docx`;
        const blob = new Blob([resp.data], {
          type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      }

       catch (err) {
        console.error(err)
        this.error = err.message || 'Ошибка при отправке'
      } finally {
        this.sending = false
      }
    }
  }
}
</script>

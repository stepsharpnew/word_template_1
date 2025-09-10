<template>
  <v-app class="bg-background fill-height">
    <v-main>
      <v-container class="d-flex justify-center align-center" style="min-height: 86vh;">
        <v-hover v-slot="{ hover }">
          <v-card
            :elevation="hover ? 20 : 8"
            class="rounded-xl pa-8 w-100"
            style="max-width: 1100px; min-height: 860px;"
          >
            <div class="d-flex flex-column align-center mb-6">
              <div class="text-h4 font-weight-bold mb-2 text-center">Создание Word ответа</div>
              <!-- <div class="text-subtitle-2 grey--text text-center">Загрузите .xlsx (ровно 8 колонок, 1 строка данных)</div> -->
            </div>

            <div class="d-flex justify-center">
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

            <div class="d-flex justify-space-between align-center mt-6">
              <div class="d-flex align-center">
                <v-icon v-if="parsing" class="mr-2" spin>mdi-progress-clock</v-icon>
                <v-icon v-else-if="parsedOk" color="success" class="mr-2">mdi-check-circle</v-icon>
                <div class="text-caption">
                  <span v-if="parsing">Парсинг файла...</span>
                  <span v-else-if="parsedOk">Готов к отправке (объект сформирован)</span>
                  <span v-else>Файл не распарсен</span>
                </div>
              </div>

              <v-hover v-slot="{ hover: btnHover }">
                <v-btn
                  :elevation="btnHover ? 18 : 6"
                  class="rounded-lg px-6 py-3"
                  :disabled="!parsedOk || sending"
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

            <v-expand-transition>
              <div v-if="parsedOk" class="mt-4">
                <v-card class="pa-4 elevation-2" outlined>
                  <div class="d-flex justify-space-between align-center mb-2">
                    <div class="text-subtitle-2 font-weight-medium">Preview объекта для отправки</div>
                    <div class="text-caption grey--text">Поля: col1 … col8</div>
                  </div>
                  <pre style="max-height:260px; overflow:auto; margin:0; font-size:13px;">
{{ previewJson }}
                  </pre>
                </v-card>
              </div>
            </v-expand-transition>
          </v-card>
        </v-hover>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import * as XLSX from 'xlsx'

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
      sending: false,
      keys: ['col1','col2','col3','col4','col5','col6','col7','col8']
    }
  },
  computed: {
    previewJson() {
      return this.parsedObject ? JSON.stringify(this.parsedObject, null, 2) : ''
    }
  },
  methods: {
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
          console.log(worksheet);
          // Получаем строковый массив (header:1) — удобно брать первую (заголовки) и вторую (данные)
          const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: null })

          if (!rows || !rows.length) {
            this.parsing = false
            this.error = 'Файл пустой'
            return
          }

          // Выявляем, где данные:
          // если rows.length >= 2 — считаем, что первая строка заголовки, вторая — данные
          // если rows.length === 1 — считаем, что это строка данных без заголовков
          let dataRow = null
          if (rows.length >= 1) {
            dataRow = rows[1]
            console.log(dataRow);
            console.log(rows);
            
            if (rows[2][0] != null) {
              this.warning = 'В файле найдено более одной строки данных — будет использована первая строка данных.'
            }
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
          for (let i = 0; i < this.keys.length; i++) {
            normalized[i] = i < dataRow.length ? dataRow[i] : null
          }

          
          const obj = {}
          this.keys.forEach((k, idx) => {
            obj[k] = normalized[idx]
          })

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

      this.sending = true
      try {
        const resp = await fetch('/api/upload-json', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.parsedObject)
        })

        if (!resp.ok) {
          const text = await resp.text().catch(() => '')
          throw new Error(`Ошибка сервера: ${resp.status} ${text}`)
        }

        alert('Объект успешно отправлен на сервер')
        // По желанию можно очистить форму:
        // this.files = []; this.parsedOk = false; this.parsedObject = null
      } catch (err) {
        console.error(err)
        this.error = err.message || 'Ошибка при отправке'
      } finally {
        this.sending = false
      }
    }
  }
}
</script>

<style>
/* Мелкие правки при необходимости */
</style>

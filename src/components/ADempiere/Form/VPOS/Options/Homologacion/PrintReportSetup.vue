<!--
ADempiere-Vue (Frontend) for ADempiere ERP & CRM Smart Business Solution
Copyright (C) 2017-Present E.R.P. Consultores y Asociados, C.A.
Contributor(s): Contributor(s): Elsio Sanchez ElsioSanchez15@outlook.com https://github.com/ElsioSanchez
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for morej details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https:www.gnu.org/licenses/>.
-->

<template>
  <el-card class="box-card">
    <div v-if="!isLoading">
      <el-form
        label-position="top"
        label-width="10px"
        @submit.native.prevent="notSubmitForm"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="$t('Options')" class="from-field">
              <el-select
                v-model="selectOptions"
                style="display: block;"
              >
                <el-option
                  v-for="(item, key) in optionsSetups"
                  :key="key"
                  :label="item.name"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="selectOptions === 'firmware_set_values'" :span="12">
            <el-form-item :label="$t('Version Firmware')" class="from-field">
              <el-select
                v-model="currentVersion"
                style="display: block;"
              >
                <el-option
                  v-for="(item, key) in optionsVersion"
                  :key="key"
                  :label="item.name"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <p style="text-align: end;">
        <el-button
          type="danger"
          icon="el-icon-close"
          style="background: #ff6d6d;border-color: #ff6d6d;background-color: #ff6d6d;"
          @click="close()"
        />
        <el-button
          type="primary"
          icon="el-icon-check"
          :disabled="isEmptyValue(infoPrinter)"
          style="background: #46a6ff;border-color: #46a6ff;background-color: #46a6ff;"
          @click="printSetup()"
        />
      </p>
    </div>
    <loading-view
      v-else
      key="process-loading"
    />
  </el-card>
</template>

<script>
// constants
// api request methods
import {
  defineComponent,
  computed,
  ref
} from '@vue/composition-api'
import store from '@/store'
// import lang from '@/lang'

// Components
import LoadingView from '@/components/ADempiere/LoadingView/index.vue'

// Utils and Helper Methods
// import { formatPrice, formatDate } from '@/utils/ADempiere/valueFormat.js'
// import { formatQuantity } from '@/utils/ADempiere/formatValue/numberFormat'
// import { isEmptyValue } from '@/utils/ADempiere'

export default defineComponent({
  name: 'PrintReportSetup',
  components: {
    LoadingView
  },
  setup(props) {
    // Ref
    const selectOptions = ref('')
    const optionsSetups = ref([
      {
        name: 'Obtener Estado',
        value: 'get_status'
      },
      {
        name: 'Información de Firmware',
        value: 'firmware_information'
      },
      {
        name: 'Establecer Version de Firmware',
        value: 'firmware_set_values'
      }
    ])
    const currentVersion = ref('')
    const optionsVersion = ref([
      {
        name: 'Version 1 (V-01)',
        value: 'V01'
      },
      {
        name: 'Version 2 (V-02)',
        value: 'V02'
      },
      {
        name: 'Version 3 (V-03)',
        value: 'V03'
      },
      {
        name: 'Version 4 (V-04)',
        value: 'V04'
      },
      {
        name: 'Version 5 (V-05)',
        value: 'V05'
      },
      {
        name: 'Version 6 (V-06)',
        value: 'V06'
      },
      {
        name: 'Version 7 (V-07)',
        value: 'V07'
      },
      {
        name: 'Version 8 (V-08)',
        value: 'V08'
      },
      {
        name: 'Version 9 (V-09)',
        value: 'V09'
      },
      {
        name: 'Version 10 (V-10)',
        value: 'V10'
      }
    ])
    // Computed
    const isLoading = computed(() => {
      return store.getters.getLoadingPrinter
    })

    const infoPrinter = computed(() => {
      return store.getters.getInfoPrinter
    })
    // Methods
    function loadInfoPrint() {
      isLoading.value = true
      store.dispatch('infoPrinter')
        .then(response => {
          console.log({ response })
          isLoading.value = false
        })
    }

    function close() {
      store.commit('setShowReportSetup', false)
    }

    function printSetup() {
      const { host_name, host_port, printer_name, printer_model, serial_no } = infoPrinter.value
      const url = `http://${host_name}:${host_port}/fiscal_printer_setup`
      console.log({
        currentVersion: currentVersion.value,
        selectOptions: selectOptions.value
      })
      store.dispatch('printReport', {
        url,
        port_name: host_port,
        printer_name,
        printer_model: printer_model.name,
        serial_no,
        type: selectOptions.value,
        firmware_version: selectOptions.value === 'firmware_set_values' ? currentVersion.value : null
      })
    }

    // loadInfoPrint()

    return {
      // ref
      selectOptions,
      optionsSetups,
      currentVersion,
      optionsVersion,
      // Computed
      isLoading,
      infoPrinter,
      // Methods
      close,
      printSetup,
      loadInfoPrint
    }
  }
})
</script>

<style lang="scss" scoped>
.return-product {
  padding: 0px;
  width: 100%;
  height: -webkit-fill-available;
  overflow-x: hidden;
}
.order-info {
  float: right;
}
.info-label {
  margin-bottom: 5px;
  padding-bottom: 5px;
}
.total-return-info {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  color: #303133;
}
</style>
<style lang="scss">
.el-dialog--center .el-dialog__body {
  text-align: initial;
  padding: 15px 16px;
}
</style>

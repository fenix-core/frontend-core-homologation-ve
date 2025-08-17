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
      <h2>
        {{ $t('form.pos.optionsPoinSales.generalOptions.printReportXDay') }}
      </h2>
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
          @click="printReportX()"
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
  computed
  // ref
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
  name: 'PrintReportX',
  components: {
    LoadingView
  },
  setup(props) {
    // Ref
    // const isLoading = ref(false)
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
      store.commit('setShowReportX', false)
    }

    function printReportX() {
      console.log({ infoPrinter: infoPrinter.value })
      const { host_name, host_port, printer_name, printer_model, serial_no } = infoPrinter.value
      const url = `http://${host_name}:${host_port}/fiscal_printer_report`
      store.dispatch('printReport', {
        url,
        port_name: host_port,
        printer_name,
        printer_model: printer_model.name,
        serial_no,
        document_type: 'x_report'
      })
    }

    // loadInfoPrint()

    return {
      // Computed
      isLoading,
      infoPrinter,
      // Methods
      close,
      printReportX,
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

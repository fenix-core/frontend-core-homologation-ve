/**
 * ADempiere-Vue (Frontend) for ADempiere ERP & CRM Smart Business Solution
 * Copyright (C) 2018-Present E.R.P. Consultores y Asociados, C.A. www.erpya.com
 * Contributor(s): Elsio Sanchez ElsioSanchez15@outlook.com https://github.com/ElsioSanchez
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

// import Vue from 'vue'

// API Request Methods
import {
  fiscalPrinter,
  requestPirnterDeviceInfo
} from '@/api/ADempiere/form/point-of-sales.js'

// utils and helper methods
// import { isEmptyValue } from '@/utils/ADempiere/valueUtils.js'
// import { extractPagingToken } from '@/utils/ADempiere/dataUtils'
import { showMessage } from '@/utils/ADempiere/notification.js'
// import language from '@/lang'

/**
 * Product Price Vuex Module
 * Product List
 * Search Product
 */
const homologacion = {
  state: {
    isLoadingInfo: false,
    infoPrinter: {},
    logs: []
  },

  mutations: {
    setInfoPrinter(state, printer) {
      state.infoPrinter = printer
    },
    setLoadingPrinter(state, loading) {
      state.isLoadingInfo = loading
    }
  },

  actions: {
    infoPrinter({ commit, getters }) {
      return new Promise(resolve => {
        const posId = getters.posAttributes.currentPointOfSales.id
        commit('setLoadingPrinter', true)
        requestPirnterDeviceInfo({
          posId
        })
          .then(response => {
            commit('setInfoPrinter', response)
            resolve(response)
          })
          .catch(error => {
            showMessage({
              type: 'error',
              message: error.message,
              showClose: true
            })
            resolve(error)
          })
          .finally(() => {
            commit('setLoadingPrinter', false)
          })
      })
    },
    printReport({ commit }, {
      url,
      type,
      serial_no,
      port_name,
      printer_name,
      printer_model,
      document_type,
      firmware_version
    }) {
      return new Promise(resolve => {
        fiscalPrinter({
          url,
          type,
          serial_no,
          port_name,
          printer_name,
          printer_model,
          document_type,
          firmware_version
        })
          .then(response => {
            console.log({ response })
          })
          .catch(error => {
            showMessage({
              type: 'error',
              message: error.message,
              showClose: true
            })
            resolve(error)
          })
      })
    }
  // saveLogs({ commit }) {
  //   return new Promise(resolve => {
  //     requetLogsServer({
  //       posId,
  //       message
  //     })
  //   )
  },
  getters: {
    getInfoPrinter: (state) => {
      return state.infoPrinter
    },
    getLoadingPrinter: (state) => {
      return state.isLoadingInfo
    }
  }
}

export default homologacion

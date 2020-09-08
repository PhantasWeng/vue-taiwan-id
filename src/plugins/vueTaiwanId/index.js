// #region import
import {
  isGuiNumberValid, // 公司統一編號
  isNationalIdentificationNumberValid, // 身分證字號
  isResidentCertificateNumberValid, // 居留證編號
  isCitizenDigitalCertificateValid, // 自然人憑證
  isEInvoiceCellPhoneBarcodeValid, // 手機條碼
  isEInvoiceDonateCodeValid // 捐贈碼
} from 'taiwan-id-validator2'
// #endregion import

import { Promise } from 'core-js'

// console.log('公司統一編號', '12345675', isGuiNumberValid('12345675'))
// console.log('身分證字號', 'A12345678', isNationalIdentificationNumberValid('A12345678'))
// console.log('居留證編號', 'AA00000009', isResidentCertificateNumberValid('AA00000009'))
// console.log('自然人憑證', 'AA12345678901234', isCitizenDigitalCertificateValid('AA12345678901234'))
// console.log('手機條碼', 'AA12345678901234', isEInvoiceCellPhoneBarcodeValid('AA12345678901234'))
// console.log('捐贈碼', 'AA12345678901234', isEInvoiceDonateCodeValid('AA12345678901234'))

const defaultOptions = {}
export default {
  install (vue, opts) {
    console.log('vueTaiwanId installed')
    const configs = { ...defaultOptions, ...opts }
    console.log('configs', configs)

    // component
    vue.component('vueTaiwanId', {
      props: {
        options: {
          type: Object
        },
        // 布景主題
        theme: {
          type: String
        },
        // 驗證類型
        type: {
          type: String,
          default: 'isNationalIdentificationNumberValid'
        },
        // placeholder 文字
        placeholder: {
          type: String,
          default: '請輸入'
        },
        value: {
          type: String
        }
      },
      data () {
        return {
          inputValue: ''
        }
      },
      created () {
        console.log(this.type)
        console.log(this.options)
        console.log(configs)
        this.inputValue = this.value
      },
      render: function (h) {
        if (configs.theme) {
        } else {
          return (
            <input vModel={this.inputValue} placeholder={this.placeholder} />
          )
        }
      },
      methods: {
        mapValidType: function (type) {
          switch (type) {
            case 'isGuiNumberValid':
              // 統一編號 Uniform numbers
              return isGuiNumberValid
            case 'isNationalIdentificationNumberValid':
              // 身分證字號 ID number
              return isNationalIdentificationNumberValid
            case 'isResidentCertificateNumberValid':
              // 居留證編號 Residence permit number
              return isResidentCertificateNumberValid
            case 'isCitizenDigitalCertificateValid':
              // 自然人憑證 Natural person certificate
              return isCitizenDigitalCertificateValid
            case 'isEInvoiceCellPhoneBarcodeValid':
              // 手機條碼 Mobile phone barcode
              return isEInvoiceCellPhoneBarcodeValid
            case 'isEInvoiceDonateCodeValid':
              // 捐贈碼 Donation code
              return isEInvoiceDonateCodeValid
          }
        },
        doValid: function () {
          return new Promise((resolve, reject) => {
            const result = this.mapValidType(this.type)(this.inputValue)
            if (result) {
              resolve(this.mapValidType(this.type)(this.inputValue))
            } else {
              this.mapValidType(this.type)(this.inputValue)
              reject(new Error(`${this.inputValue}: is not valid for ${this.type}`))
            }
          })
        }
      },
      watch: {
        inputValue: {
          deep: true,
          immediate: true,
          handler: function (val, oldVal) {
            if (val) {
              this.$emit('input', val)
              // this.$emit('validated', true)
              this.doValid().then(res => {
                this.$emit('validated', true)
              }, err => {
                this.$emit('validated', err.message)
              })
            } else if (oldVal) {
              this.$emit('validated', null)
            }
          }
        }
      }
    })
    // directive
    vue.directive('vueTaiwanId', {
      inserted: function (el) {
        // Focus the element
        el.focus()
      },
      bind (el, binding, vnode) {
        console.group('test')
        console.dir(el)
        console.log(vnode)
        console.log('binding', binding)
        console.log('this', this)
        const result = isNationalIdentificationNumberValid(el.innerHTML)
        console.log('result', result)
        console.groupEnd()
        // root.$set(
        //   root.targets,
        //   binding.value,
        //   {
        //     id: binding.value,
        //     comments: [],
        //     getRect: () => el.getBoundingClientRect(),
        //   })

        // el.addEventListener('click', (evt) => {
        //   root.$emit(`commentTargetClicked__${binding.value}`, {
        //     id: uuid(),
        //     commenter: options.commenterSelector(),
        //     clientX: evt.clientX,
        //     clientY: evt.clientY
        //   })
        // })
      },
      update: function (el, binding, vnode) {
        console.log(vnode)
        console.log('got called on upadate')
      },
      componentUpdated: function () {

      },
      unbind: function () {

      }
    })
  }
}

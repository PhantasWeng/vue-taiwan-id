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

const lib = {
  isGuiNumberValid,
  isNationalIdentificationNumberValid,
  isResidentCertificateNumberValid,
  isCitizenDigitalCertificateValid,
  isEInvoiceCellPhoneBarcodeValid,
  isEInvoiceDonateCodeValid
}

const defaultOptions = {}
export default {
  install (vue, opts) {
    const configs = { ...defaultOptions, ...opts }
    console.group('----- vueTaiwanId installed -----')
    console.log('configs', configs)
    console.groupEnd()

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
        console.group('----- Component Created -----')
        console.log('type', this.type)
        console.log('options', this.options)
        console.log('configs', configs)
        console.groupEnd()
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
        doValid: function () {
          return new Promise((resolve, reject) => {
            const result = this.lib[this.type](this.inputValue)
            if (result) {
              resolve(this.lib[this.type](this.inputValue))
            } else {
              this.lib[this.type](this.inputValue)
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
    console.dir(vue.directive)
    vue.directive('vueTaiwanId', {
      inserted: function (el) {
        console.log('inserted')
        // Focus the element
        // el.focus()
      },
      bind (el, binding, vnode, expression) {
        console.log('bind')
        console.group('----- v-directive -----')
        console.dir(el)
        console.dir(vnode)
        console.log('binding', binding)
        // console.log('this', this)
        const type = binding.arg
        const value = el.innerHTML
        const result = lib[type](value)
        console.log('result', type, value, result)
        console.groupEnd()
        const clone = Object.assign({}, el.innerHTML)
        el.innerHTML = '<div>12123</div>'
        console.log(clone, el.innerHTML)
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
        console.group('---- v-directive upadate -----')
        const result = isNationalIdentificationNumberValid(el.innerHTML)
        console.log('result', el.innerHTML, result)
        console.groupEnd()
      },
      componentUpdated: function () {

      },
      unbind: function () {

      }
    })
  }
}

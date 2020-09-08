---
sidebar: auto
---

# Guide
## Introduction
A Vue wrap for [taiwan-id-validator2](https://github.com/doggy8088/taiwan-id-validator2)

## Getting Started
### Installation

#### NPM / YARN

```bash
npm install vue-taiwan-id
```

```bash
yarn add vue-taiwan-id
```

#### Import
Import to `main.js`

```js
import vueTaiwanId from 'vue-taiwan-id'
Vue.use(vueTaiwanId)
```

## Example
<ClientOnly>
<vueTaiwanIdDemo />
</ClientOnly>

<<< @/docs/.vuepress/components/vueTaiwanIdDemo.vue

## API

### Type
| Type                                | Description  |
| ----------------------------------- | ------------ |
| isGuiNumberValid                    | 公司統一編號 |
| isNationalIdentificationNumberValid | 身分證字號   |
| isResidentCertificateNumberValid    | 居留證編號   |
| isCitizenDigitalCertificateValid    | 自然人憑證   |
| isEInvoiceCellPhoneBarcodeValid     | 手機條碼     |
| isEInvoiceDonateCodeValid           | 捐贈碼       |


### Options
| Options     | Description | type   | Default                             |
| ----------- | ----------- | ------ | ----------------------------------- |
| options     | asd         | Object | {}                                  |
| theme       | asd         | String | null                                |
| type        | 驗證類型    | String | isNationalIdentificationNumberValid |
| placeholder | asd         | String | 請輸入                              |
| value       | asd         | String | null                                |

### Event
| Event     | Description      | response                                   |
| --------- | ---------------- | ------------------------------------------ |
| validated | 驗證完後觸發     | `true [Boolean]` or `err.message [Object]` |
| input     | 輸入值變動時觸發 | `null` or `String`                         |
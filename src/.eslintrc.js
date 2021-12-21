module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    "eslint:recommended",
    '@vue/typescript/recommended'
  ],
  globals: {
    defineProps: 'readonly',// definePropsはimportしなくて良いので、警告しない。
  },
  parserOptions: {
    'ecmaVersion': 2021
  },
  plugins: [
  ],
  rules: {
    // 0 = off, 1 = warn, 2 = error
    // v-onイベントの命名スタイル https://eslint.vuejs.org/rules/v-on-event-hyphenation.html
    'vue/v-on-event-hyphenation': [1, "never"],
    // 自己閉鎖スタイル https://eslint.vuejs.org/rules/html-self-closing.html
    'vue/html-self-closing': [1, {
      html: { normal: 'never', void: 'always', component: 'any' }
    }],
    // 1行あたりの属性の最大数 https://eslint.vuejs.org/rules/max-attributes-per-line.html
    'vue/max-attributes-per-line': [0],
    'vue/html-closing-bracket-newline': [1, {
      singleline: 'never',
      multiline: 'always'
    }],
    // 属性の順序を強制 
    'vue/attributes-order': [0],
    // コンポーネント定義名に特定の大文字と小文字を区別する
    'vue/component-definition-name-casing': [1, 'PascalCase'],
    // requiredではないpropsにはdefaultを設定しなければならない
    'vue/require-default-prop': [2],
    // テンプレート内で使用されていないコンポーネントの登録を禁止する
    'vue/no-unused-components': [1]
  }
}
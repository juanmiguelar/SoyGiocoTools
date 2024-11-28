// src/shims-vue-i18n.d.ts
import 'vue-i18n';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $t: typeof import('vue-i18n')['t'];
  }
}
import DefaultTheme from 'vitepress/theme'
import { setupColorPreview } from '../../../src/client'
import '../../../src/style.css'
import { onMounted } from 'vue'

export default {
  extends: DefaultTheme,
  setup() {
    onMounted(() => {
      setupColorPreview()
    })
  },
}

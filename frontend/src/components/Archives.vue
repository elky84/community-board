<template>
  <div class="container-fluid">
    <archives-pc v-if="!isMobile"></archives-pc>
    <archives-mobile v-if="isMobile"></archives-mobile>
  </div>
</template>

<script>
import ArchivesPc from './Archives.pc'
import ArchivesMobile from './Archives.mobile'

export default {
  name: 'Archives',
  components: {
    ArchivesPc: ArchivesPc,
    ArchivesMobile: ArchivesMobile
  },
  computed: {
    isMobile () {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

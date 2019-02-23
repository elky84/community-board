<template>
  <div class="container-fluid">
    <archives-pc :archive-types="archiveTypes" v-if="!isMobile"></archives-pc>
    <archives-mobile :archive-types="archiveTypes" v-if="isMobile"></archives-mobile>
  </div>
</template>

<script>
import ArchivesPc from './Archives.Pc'
import ArchivesMobile from './Archives.Mobile'

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

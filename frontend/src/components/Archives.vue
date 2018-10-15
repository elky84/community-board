<template>
  <div class="container-fluid">
    <h2><i class="fas fa-language"></i>Archives</h2>
    <archives-searchForm @searching="parentSearching(... arguments)" ref="searchForm"
      :ARCHIVE_TYPE_LIST="ARCHIVE_TYPE_LIST"></archives-searchForm>

    <table class="table table-bordered">
      <thead class="thead-dark">
        <tr class="text-center">
          <th width="50px">타입</th>
          <th width="*">타이틀</th>
          <th width="50px">히트</th>
          <th width="200px">시간</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(archive) in archives">
          <tr class='cursor-pointer' :key="archive._id">
            <td><span class="badge" v-bind:class=ARCHIVE_TYPE_LIST[archive.type].label>
              {{ARCHIVE_TYPE_LIST[archive.type].text}}
            </span></td>
            <td><a v-bind:href=archive.link target="_blank">{{archive.title}}</a></td>
            <td>{{archive.count}}</td>
            <td>{{archive.date}}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import ArchivesSearchForm from './ArchivesSearchForm'

export const ARCHIVE_TYPE = {
  Clien: {
    text: '클리앙',
    label: 'badge-primary'
  },
  Ppomppu: {
    text: '뽐뿌',
    label: 'badge-secondary'
  },
  Slrclub: {
    text: 'Slrclub',
    label: 'badge-success'
  },
  Todayhumor: {
    text: '오유',
    label: 'badge-danger'
  },
  RuliwebHobby: {
    text: '루리웹_취미',
    label: 'badge-warning'
  },
  RuliwebHumor: {
    text: '루리웹_유머',
    label: 'badge-info'
  },
  RuliwebHotdeal: {
    text: '루리웹_핫딜',
    label: 'badge-dark'
  }
}

export default {
  name: 'Archives',
  components: {
    ArchivesSearchForm: ArchivesSearchForm
  },
  data () {
    return {
      archives: [],
      ARCHIVE_TYPE_LIST: ARCHIVE_TYPE
    }
  },
  mounted () {
    this.getArchives(null)
  },
  methods: {
    getArchives (searchData) {
      var vm = this
      this.$http.get(`${process.env.URL_BACKEND}/api/archives`, {params: searchData})
        .then((result) => {
          vm.archives = result.data
        })
    },
    parentSearching (searchData) {
      this.getArchives(searchData)
    }
  }
}
</script>

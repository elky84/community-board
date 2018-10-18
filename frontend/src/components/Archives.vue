<template>
  <div class="container-fluid">
    <h2><i class="fas fa-language"></i>Archives</h2>
    <archives-searchForm @searching="parentSearching(... arguments)" ref="searchForm"
      :ARCHIVE_TYPE_LIST="ARCHIVE_TYPE_LIST"></archives-searchForm>

    <table class="table table-bordered">
      <thead class="thead-dark">
        <tr class="text-center">
          <th width="50px"><span class="header">타입</span></th>
          <th width="*"><span class="header">타이틀</span></th>
          <th width="*"><span class="header">히트</span></th>
          <th width="*"><span class="header">시간</span></th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(archive) in archives">
          <tr class='cursor-pointer' :key="archive._id">
            <td><span class="badge" v-bind:class=ARCHIVE_TYPE_LIST[archive.type].label>
              {{ARCHIVE_TYPE_LIST[archive.type].text}}
            </span></td>
            <td><a v-bind:href=archive.link target="_blank">{{archive.title}}</a></td>
            <td><span class="count">{{archive.count}}</span></td>
            <td><span class="time">{{ moment(archive.date).format('YYYY-MM-DD h:mm:ss a') }}</span></td>
          </tr>
        </template>
      </tbody>
    </table>

    <paginate ref="paginate" :page-count="viewPageCount" :page-range="5" :margin-pages="1" :click-handler="listing" :prev-text="'Prev'" :next-text="'Next'"
      :container-class="'pagination justify-content-center'" :page-class="'page-item'" :page-link-class="'page-link'"
      :prev-class="'page-item'" :prev-link-class="'page-link'" :next-class="'page-item'" :next-link-class="'page-link'"
      :active-class="'active'" :disabled-class="'disabled'">
    </paginate>
  </div>
</template>

<script>
import ArchivesSearchForm from './ArchivesSearchForm'
import Paginate from 'vuejs-paginate'
import Qs from 'qs'

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
    text: '오늘의유머',
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
    ArchivesSearchForm: ArchivesSearchForm,
    Paginate
  },
  data () {
    return {
      archives: [],
      ARCHIVE_TYPE_LIST: ARCHIVE_TYPE,
      currentPage: 1,
      viewPageCount: 1,
      totalItems: 0,
      rowNumDeduction: 1,
      limit: 20,
      searchData: {}
    }
  },
  mounted () {
    this.getArchives(null)
  },
  methods: {
    getArchives (searchData) {
      this.searchData = searchData
      var vm = this
      this.$http.get(`${process.env.URL_BACKEND}/api/archives`, {
        params: {
          offset: this.limit * (this.currentPage - 1),
          limit: this.limit
        },
        paramsSerializer (params) {
          return Qs.stringify($.extend(params, searchData), {
            skipNulls: true,
            allowDots: true,
            encode: false,
            arrayFormat: 'repeat'
          })
        }})
        .then((result) => {
          this.viewPageCount = Math.ceil(result.data.total / this.limit)
          this.totalItems = result.data.total
          this.rowNumDeduction = (this.currentPage - 1) * this.limit

          vm.archives = result.data.docs
        })
    },
    parentSearching (searchData) {
      this.getArchives(searchData)
    },
    listing (page) {
      this.currentPage = page
      this.$refs.paginate.value = page
      this.getArchives(this.searchData)
    }
  }
}
</script>

<style>
.header {
  font-size: 12px;
}
.count {
  font-size: 12px;
}
.time {
  font-size: 12px;
}

</style>

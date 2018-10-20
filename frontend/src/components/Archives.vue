<template>
  <div class="container-fluid">
    <archives-searchForm @searching="parentSearching(... arguments)" ref="searchForm"
      :ARCHIVE_TYPE_LIST="ARCHIVE_TYPE_LIST"></archives-searchForm>

    <table class="table table-bordered">
      <thead class="thead-dark">
        <tr class="text-center">
          <th width=90px v-on:click="sortBy('type')">
            <span class="header">타입</span>
            <span class="arrow" :class="toArrow('type')"/>
          </th>
          <th v-on:click="sortBy('title')">
            <span class="header">제목</span>
            <span class="arrow" :class="toArrow('title')"/>
          </th>
          <th v-on:click="sortBy('count')">
            <span class="header">히트</span>
            <span class="arrow" :class="toArrow('count')"/>
          </th>
          <th v-on:click="sortBy('date')">
            <span class="header">시간</span>
            <span class="arrow" :class="toArrow('date')"/>
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(archive, index) in archives">
          <tr class="cursor-pointer" :class="tdColoring(archive)" :key="archive._id">
            <td align="center"><span class="badge" v-bind:class=ARCHIVE_TYPE_LIST[archive.type].label>
              {{ARCHIVE_TYPE_LIST[archive.type].text}}
            </span></td>
            <td align="center" v-on:click="onClickLink(archive)"><span class="link"><a @click.prevent="onClickLink(archive, index)" v-bind:href=archive.link target="_blank">{{archive.title}}</a></span></td>
            <td align="center"><span class="count">{{archive.count}}</span></td>
            <td align="center"><span class="time">{{ momentTime(archive.date) }}</span></td>
          </tr>
        </template>
      </tbody>
    </table>

    <paginate ref="paginate" :page-count="viewPageCount" :page-range="3" :margin-pages="1" :click-handler="listing" :prev-text="'Prev'" :next-text="'Next'"
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
import moment from 'moment'

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
      searchData: {},
      sort: null,
      orderState: {title: null, type: null, count: null, date: null}
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
          limit: this.limit,
          sort: JSON.stringify(this.sort)
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
    },
    momentTime (date) {
      var format = 'YYYY-MM-DD'
      let today = moment().format(format)
      let archiveDate = moment(date).format(format)

      if (today === archiveDate) {
        return moment(date).format('HH:mm:ss')
      } else {
        return moment(date).format('YYYY-MM-DD HH:mm')
      }
    },
    sortBy (key) {
      this.orderState[key] = this.orderState[key] == null ? -1 : this.orderState[key] * -1
      for (var orderKey in this.orderState) {
        if (key !== orderKey) {
          this.orderState[orderKey] = null
        }
      }

      this.sort = {[key]: this.orderState[key]}

      this.getArchives(this.searchData)
    },
    toArrow (key) {
      if (this.orderState[key] == null) {
        return 'none'
      }

      return this.orderState[key] > 0 ? 'asc' : 'dsc'
    },
    tdColoring (archive) {
      return archive.read == null || archive.read === false ? 'unread' : 'read'
    },
    onClickLink (archive, index) {
      archive.read = true
      var vm = this
      this.$http.put(`${process.env.URL_BACKEND}/api/archives/${archive._id}`, archive).then((result) => {
        vm.archives[index] = archive
        vm.$forceUpdate()
      })
    }
  }
}
</script>

<style>

.arrow {
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 0;
    margin-left: 5px;
    opacity: 0.66;
}

.arrow.asc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #FFFFFF;
}

.arrow.dsc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #FFFFFF;
}

.header {
  font-size: 12px;
}
.count {
  font-size: 12px;
}
.time {
  font-size: 12px;
}
.link {
  font-size: 12px;
}

.cursor-pointer.unread {
  background: #FFFFFF;
}

.cursor-pointer.read {
  background: #EEEEEE;
}

</style>

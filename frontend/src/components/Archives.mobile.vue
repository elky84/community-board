<template>
  <div>
    <archives-searchForm @searching="parentSearching(... arguments)" ref="searchForm"/>

    <table class="table table-bordered">
      <thead class="thead-dark">
        <tr class="text-center">
          <th width="70px" v-on:click="sortBy('type')">
            <span class="header">타입</span>
            <span class="arrow" :class="toArrow('type')"/>
          </th>
          <th v-on:click="sortBy('title')">
            <span class="header">제목</span>
            <span class="arrow" :class="toArrow('title')"/>
          </th>
          <th width="60px" v-on:click="sortBy('date')">
            <span class="header">시간</span>
            <span class="arrow" :class="toArrow('date')"/>
          </th>
          <th width="50px" v-on:click="sortBy('count')">
            <span class="header">읽음</span>
            <span class="arrow" :class="toArrow('count')"/>
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(archive, index) in archives">
          <tr class="cursor-pointer" :class="tdColoring(archive)" :key="archive._id" @click.prevent="onClickLink(archive, index)">
            <td align="center"><span class="badge badge block-badge" v-bind:class=ARCHIVES_TYPES[archive.type].label>
              {{ARCHIVES_TYPES[archive.type].text}}
            </span></td>
            <td align="left"><span class="title"><a v-bind:href=archive.link>{{ substr(archive.title) }}</a></span></td>
            <td align="center"><span class="time">{{ momentTime(archive.date) }}</span></td>
            <td align="center"><span class="count">{{ abbreviation(archive.count)}}</span></td>
          </tr>
        </template>
      </tbody>
    </table>

    <b-pagination size="md" v-model="currentPage" :limit="limit" :total-rows="totalItems" :per-page="limit" @change="getEvents(... arguments)" />
  </div>
</template>

<script>
import ArchivesSearchForm from './ArchivesSearchForm'
import ArchivesUtils from './ArchivesUtils'
import Qs from 'qs'
import {
  ARCHIVES_TYPES
} from '@/common/constant/types'

export default {
  name: 'ArchivesMobile',
  components: {
    ArchivesSearchForm: ArchivesSearchForm
  },
  data () {
    return {
      archives: [],
      ARCHIVES_TYPES: ARCHIVES_TYPES,
      currentPage: 1,
      viewPageCount: 1,
      totalItems: 0,
      rowNumDeduction: 1,
      limit: 20,
      searchData: {},
      sort: undefined,
      orderState: { title: null, type: null, count: null, date: null }
    }
  },
  mounted () {
    if (!this.searchData) {
      this.getArchives(this.searchData)
    }
  },
  methods: {
    momentTime (date) {
      return ArchivesUtils.momentTime(date)
    },
    abbreviation (number) {
      return ArchivesUtils.abbreviation(number)
    },
    tdColoring (archive) {
      return ArchivesUtils.tdColoring(archive)
    },
    substr (str) {
      return ArchivesUtils.substr(str)
    },
    getArchives (searchData) {
      this.searchData = searchData

      var vm = this
      this.$http.get(`${process.env.VUE_APP_URL_BACKEND}/api/archives`, {
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
        } })
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
    sortBy (key) {
      this.orderState[key] = this.orderState[key] == null ? -1 : this.orderState[key] * -1
      for (var orderKey in this.orderState) {
        if (key !== orderKey) {
          this.orderState[orderKey] = null
        }
      }

      this.sort = { [key]: this.orderState[key] }

      this.getArchives(this.searchData)
    },
    toArrow (key) {
      if (this.orderState[key] == null) {
        return 'none'
      }

      return this.orderState[key] > 0 ? 'asc' : 'dsc'
    },
    onClickLink (archive, index) {
      archive.read = true
      var vm = this
      this.$http.put(`${process.env.VUE_APP_URL_BACKEND}/api/archives/${archive._id}`, archive).then((result) => {
        if (result != null) {
          vm.archives[index] = archive
          vm.$forceUpdate()
          window.open(archive.link, '_blank')
        }
      })
    }
  }
}
</script>

<style scoped>
.element {
  font-size: 12px;
}
.form-control {
  font-size: 12px;
}
.label {
  font-size: 12px;
}
.nav {
  font-size: 12px;
}

.dropdown-item {
  font-size: 12px;
}

.arrow {
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 0;
    margin-left: 5px;
    opacity: 0.66;
}
.arrow.asc {
    display: inline-block;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    border-bottom: 3px solid #FFFFFF;
}
.arrow.dsc {
    display: inline-block;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    border-top: 3px solid #FFFFFF;
}

.badge {
  font-size: 12px;
}
.header {
  font-size: 10px;
}
.title {
  font-size: 11px;
}
.time {
  font-size: 11px;
}
.count {
  font-size: 11px;
}

.cursor-pointer.unread {
  background: #FFFFFF;
}

.cursor-pointer.read {
  background: #EEEEEE;
}

</style>

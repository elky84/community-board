<template>
  <div>
    <form @submit.stop.prevent="search">
        <div class="form-inline">
          <input type="text" class="form-control form-control-sm" v-model="searchProtocol.title" placeholder="제목 (like 검색)">
          <select class="form-control form-control-sm" v-model="searchProtocol.type" name="type">
            <option :value=null>타입 (전체)</option>
            <option v-for="(value, key) in ARCHIVE_TYPE_LIST" :value="key" :key="value.text">{{value.text}}</option>
          </select>

          <select class="form-control form-control-sm" v-model="searchProtocol.read" name="type">
            <option :value=null>읽기 (전체)</option>
            <option v-for="(value) in READ_STATE_LIST" :value="value.value" :key="value.text">{{value.text}}</option>
          </select>

          <button type="submit" class="btn btn-sm btn-primary">검색<i class="fa fa-sm fa-search"></i></button>&nbsp;
          <button type="button" class="btn btn-sm btn-second ary" @click.prevent="reset">초기화 <i class="fa fa-sm fa-eraser"></i></button>
        </div>
    </form>
  </div>
</template>

<script>
import _ from 'lodash'

const SEARCH_PROTOCOL = {
  type: null,
  title: null,
  read: null
}
Object.freeze(SEARCH_PROTOCOL)

export const READ_STATE = {
  Read: {
    text: '읽음',
    value: true
  },
  Unread: {
    text: '읽지 않음',
    value: false
  }
}

export default {
  props: ['ARCHIVE_TYPE_LIST'],
  data () {
    return {
      searchProtocol: Object.assign({}, SEARCH_PROTOCOL),
      READ_STATE_LIST: READ_STATE
    }
  },
  beforeMount () {
    var searchProtocol = JSON.parse(this.$localStorage.get('searchProtocol'))
    if (searchProtocol === null) {
      this.reset()
    } else {
      if (_.isEqual(Object.keys(searchProtocol), Object.keys(SEARCH_PROTOCOL))) {
        this.searchProtocol = searchProtocol
        this.$emit('searching', this.searchProtocol)
      } else {
        this.reset()
      }
    }
  },
  methods: {
    search (e) {
      this.$localStorage.set('searchProtocol', JSON.stringify(this.searchProtocol))
      this.$emit('searching', this.searchProtocol)
    },
    reset () {
      this.searchProtocol = Object.assign({}, SEARCH_PROTOCOL)
      this.$localStorage.set('searchProtocol', null)
      this.$emit('searching', this.searchProtocol)
    }
  }
}
</script>

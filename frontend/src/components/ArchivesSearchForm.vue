<template>
  <div>
    <form @submit.stop.prevent="search">
      <div class="row">
          <div class="col-md-3">
            <select class="form-control form-control-sm mb-4" v-model="searchProtocol.type" name="type">
              <option :value=null>타입</option>
              <option v-for="(value, key) in ARCHIVE_TYPE_LIST" :value="key" :key="value.text">{{value.text}}</option>
            </select>
          </div>

          <div class="form-group">
            <input type="text" class="form-control form-control-sm" v-model="searchProtocol.title" placeholder="제목 (like 검색)">
          </div>

          <div class="form-group">
            <button type="submit" class="btn btn-sm btn-primary">검색 <i class="fa fa-sm fa-search"></i></button>&nbsp;
            <button type="button" class="btn btn-sm btn-second ary" @click.prevent="reset">초기화 <i class="fa fa-sm fa-eraser"></i></button>
          </div>
        </div>
    </form>
  </div>
</template>

<script>
const SEARCH_PROTOCOL = {
  type: null,
  title: null,
  read: null
}
Object.freeze(SEARCH_PROTOCOL)

export default {
  props: ['ARCHIVE_TYPE_LIST'],
  data () {
    return {
      searchProtocol: Object.assign({}, SEARCH_PROTOCOL)
    }
  },
  mounted () {
    this.reset()
  },
  methods: {
    search (e) {
      this.$emit('searching', this.searchProtocol)
    },
    reset () {
      this.searchProtocol = Object.assign({}, SEARCH_PROTOCOL)
    }
  }
}
</script>

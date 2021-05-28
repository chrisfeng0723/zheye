<template>
  <div class="container">
    <GlobalHeader :user="currentUser">123</GlobalHeader>
    <ColumnList :list="list"></ColumnList>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { ColumnProps } from './components/ColumnList.vue'
import GlobalHeader, { UserPros } from './components/GlobalHeader.vue'

const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'tetst1的专栏',
    description: '这是一个有意思的专栏',
    avatar:
      ''
  },
  {
    id: 2,
    title: 'tetst2的专栏',
    description: '这是一个有意思的专栏',
    avatar:
      'https://p6.bdxiguaimg.com/img/mosaic-legacy/ff82000018d9a545f5cb~tplv-xg-center-qs:88:88:q75.webp'
  },
  {
    id: 3,
    title: 'tetst3  的专栏',
    description: '这是一个有意思的专栏',
    avatar:
      'https://p6.bdxiguaimg.com/img/mosaic-legacy/ff82000018d9a545f5cb~tplv-xg-center-qs:88:88:q75.webp'
  }
]

const currentUser: UserPros = {
  isLogin: true,
  name: 'viking',
  id: 1
}

export default defineComponent({
  name: 'App',
  components: {
    ColumnList,
    GlobalHeader
  },

  setup () {
    return {
      list: testData,
      currentUser
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

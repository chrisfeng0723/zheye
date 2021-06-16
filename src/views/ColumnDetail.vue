<template>
    <div class="column-detail-page w-690">
        <div class="column-info row mb-4 border-bottom pb-4 aligh-item-center" v-if="column">
            <div class="col-3 text-center">
                <img :src="column.avatar && column.avatar.fitUrl" :alt="column.title" class="rouned-circle border w-100">
            </div>
             <div class="col-9">
                 <h4>{{ column.title }}</h4>
                 <p class="text-muted">{{ column.description }}</p>
             </div>
        </div>
        <post-list :list="postList"></post-list>
        <button v-if="!isLastPage" @click="loadMorePage" class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block 2-25 load-more">加载更多</button>
    </div>
</template>

<script lang="ts">
import { defineComponent,reactive,computed,watch,onMounted } from 'vue'
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { addColumnAvatar } from '../../../imooc-zhihu-zheye-column/src/libs/helper'
import PostList from '../components/PostList.vue'
import { GloabalDataProps } from '../store/types'
import useLoaderMore from '../hooks/useLoadMore'
import { ColumnProps } from '../../../imooc-zhihu-zheye-column/src/store/types';
type ColumnIdProps = string |undefined;

export default defineComponent({
    name:'ColumnDetail',
    components:{
        PostList
    },
    setup () {
        const store = useStore<GloabalDataProps>()
        const route = useRoute()
        const currentId = route.params.id as ColumnIdProps

        const loaded = reactive({
            currentPage: 0,
            total: 0
        })
        const total = computed(()=>loaded.total)
        watch(store.state.posts.loadedColumns,()=>{
            console.log(store.state.posts.loadedColumns)
            const { currentPage,total } = store.getters.getLoaderPost(currentId)
            loaded.currentPage = currentPage
            loaded.total = total
        })

        onMounted(() => {
            store.dispatch('fetchColumn', currentId)
            store.dispatch('fetchPosts', { columnId:currentId, pageSize:3 })
        })

        const column = computed(()=>{
            const selectColumn = store.getters.getColumnById(currentId) as ColumnProps | undefined
            if (selectColumn){
                addColumnAvatar(selectColumn,100,100)
            }
            return selectColumn
            
        })

        const params = {
            columnId: currentId,
            pageSize: 3,
            currentPage: loaded.currentPage ? +1 :2
        }

        const { loadMorePage, isLastPage } = useLoaderMore (
           'fetchPosts',
            total,
            params
        )

        const postList = computed(()=>store.getters.getPostsByCid(currentId))

        return {
            column,
            postList,
            loadMorePage,
            isLastPage
        }
    }
})
</script>


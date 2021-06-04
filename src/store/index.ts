import { createStore, Commit } from 'vuex'
import { axios, AxiosRequestConfig } from '../libs/http'
import { StorageHandler, storeageType } from '../libs/storage'
import { GloabalErrorProps, GloadDataProps } from './type'
import {arrToObj} from '../libs/helper'

const storageHandler = new StorageHandler

const asyncAndCommit = async (url: string, mutationName: string, commit: Commit, config: AxiosRequestConfig = { method: 'get' }, extraData?: any) => {
    const { data } = await axios(url,config)
    if (extraData) {
        commit(mutationName, { data, extraData })
    } else {
        commit(mutationName, data)
    }
    return data
}

const store = createStore<GloadDataProps>({
    state: {
        error: { status: false },
        token: storageHandler.getItem(storeageType, 'token') || '',
        loading: false,
        columns: { data: {}, currentPage: 0, total: 0 },
        posts: { data:{}, loadedColumns: {} },
        user: { isLogin: false }
    },
    mutations:{
        fetchCloumns( state,rawData){
            const { data } = state.columns
            const { list,count,currentPage } = rawData

            state.columns = {
                data: {...data,...arrToObj(list)},
                total:count,
                currentPage:currentPage *1,
            }
        },
        fetchColumn(state,rawData){
            state.columns.data[rawData.data_id] = rawData.data
        },
        fetchPosts(state,{data:rawData,extraData:columnId}){
            const { data } = state.posts
            const {list,count,currentPage } = rawData.data
            state.posts.data = {...data,...arrToObj(list)}
            state.posts.loadedColumns[columnId]={
                columnId:columnId,
                total:count,
                currentPage:currentPage*1
            }
             
        },

        fetchPost(state,rawData){
            state.posts.data[rawData.data._id] = rawData
        },
        createPost(state,newPost){
            state.posts.data[newPost._id] = newPost
        },
        updatePost(state,{data }){
            state.posts.data[data._id] = data
        },
        deletePost(state,{ data} ){
            delete state.posts.data[data._id]
        },
        setLoading(state,status){
            state.loading = status
        },
        setError( state,e:GloabalErrorProps){
            state.error = e
        },
        login(state,rawData){
            const { token } = rawData.data
            state.token = token
            storageHandler.setItem(storeageType,"token",token)
            axios.defaults.headers.common.Authorization = `Bearer ${token}`
        },

    }
    
})


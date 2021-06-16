import { ImageProps } from '../store/types'

export function genernteFitUrl( data: ImageProps,width:number,height:number,format=['m_pad']){
    if (data && data.url){
        const formatStr = format.reduce((prev,current) =>{
            return current+ ','+prev
        },'')
        data.fitUrl = data.url + `?x-oss-process=image/resize,${formatStr}h_${height},w_${width}`
    }
}
export const arrToObj = <T extends { _id?: string }>(arr: Array<T>) => {
    return arr.reduce((prev, current) => {
        if (current._id) {
            prev[current._id] = current
        }
        return prev
    }, {} as { [key: string]: T })
}

export const objToArr = <T>(obj: {[key:string]:T}) =>{
    return Object.keys(obj).map(key => obj[key])
}
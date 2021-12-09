import {Vika} from "@vikadata/vika";
import {message} from 'antd'
const config = {
    token: 'uskjVVXAg5csX5P40bXnivo',
    viewId:"viwaZHVHwVMRJ",
}

export class VikaController {
    constructor(props) {

        /**
         * 全局参数配置
         */
        const vika = new Vika({
            /**
             * (必填) string 你的 API Token，用于鉴权
             */
            token: config.token,
            /**
             * （选填）全局指定 field 的查询和返回的 key。默认使用列名  'name' 。指定为 'id' 时将以 fieldId 作为查询和返回方式（使用 id 可以避免列名的修改导致代码失效问题）
             */
            fieldKey: 'name', // 默认值
            /**
             * （选填）请求失效时间
             */
            requestTimeout: 60000, // 默认 60000ms (10 秒)
            /**
             * （选填）目标服务器地址
             */
            host: 'https://api.vika.cn/fusion/v1', // 默认值
        });
        this.datasheet = vika.datasheet("dstffTNeWj0bK9CUAB");
    }
    getList(params){
        return new Promise((resolve ,reject)=> {
            this.datasheet.records.query({viewId:config.viewId}).then(res=>{
                if(res.success){
                    message.success('获取列表成功')
                    resolve(res.data)
                }else {
                    message.error(res.message)
                }
            }).catch(err=>{
                message.error(err)
            })
        })

    }
    getQuery(params) {
        const {viewId,sort,recordIds,fields,filterByFormula,maxRecords,cellFormat,fieldKey}=params
        // 获取记录
        this.datasheet.record.query({
            /**
             * （选填）视图ID。默认为维格表中第一个视图。请求会返回视图中经过视图中筛选/排序后的结果，可以搭配使用fields参数过滤不需要的字段数据
             */
            viewId,
            /**
             * （选填）对指定维格表的记录进行排序。由多个“排序对象”组成的数组。支持顺序：'asc' 和 逆序：'desc'。注：此参数指定的排序条件将会覆盖视图里的排序条件。
             */
            sort,
            /**
             * （选填）recordIds 数组。如果附带此参数，则返回参数中指定的records数组。 返回值按照传入数组的顺序排序。此时无视筛选、排序。无分页，每次最多查询 1000 条
             */
            recordIds,
            /**
             * （选填）指定要返回的字段（默认为字段名, 也可以通过 fieldKey 指定为字段 Id）。如果附带此参数，则返回的记录合集将会被过滤，只有指定的字段会返回。
             */
            fields,
            /**
             * （选填）使用公式作为筛选条件，返回匹配的记录，访问 https://vika.cn/help/tutorial-getting-started-with-formulas/ 了解公式使用方式
             */
            filterByFormula,
            /**
             * （选填）限制返回记录的总数量。如果该值小于表中实际的记录总数，则返回的记录总数会被限制为该值。
             */
            maxRecords,
            /**
             * （选填）单元格值类型，默认为 'json'，指定为 'string' 时所有值都将被自动转换为 string 格式。
             */
            cellFormat,
            /**
             * （选填）指定 field 的查询和返回的 key。默认使用列名  'name' 。指定为 'id' 时将以 fieldId 作为查询和返回方式（使用 id 可以避免列名的修改导致代码失效问题）
             */
            fieldKey,
        })

    }
     queryAll() {
         return new Promise((resolve ,reject)=> {
             this.datasheet.records.queryAll().then(res=>{
                 if(res.success){
                     message.success('获取列表全部成功')
                     resolve(res.data)
                 }else {
                     message.error(res.message)
                 }
             }).catch(err=>{
                 message.error(err)
             })
         })

    }
    add(params){
        // add 方法接收一个数组值，可以同时创建多条 record，单次请求可最多创建10条 record

        return new Promise((resolve ,reject)=> {
            this.datasheet.records.create(params).then(res=>{
                if(res.success){
                    message.success('新增成功')
                    resolve(res.data)
                }else {
                    message.error(res.message)
                }
            }).catch(err=>{
                message.error(err)
            })
        })
    }
    update(params){
        return new Promise((resolve ,reject)=> {
            this.datasheet.records.update(params).then(res=>{
                if(res.success){
                    message.success('更新成功')
                    resolve(res.data)
                }else {
                    message.error(res.message)
                }
            }).catch(err=>{
                message.error(err)
            })
        })
    }
    del(params){
        return new Promise((resolve ,reject)=> {
            this.datasheet.records.delete(params).then(res=>{
                if(res.success){
                    message.success('删除成功')
                    resolve(res.data)
                }else {
                    message.error(res.message)
                }
            }).catch(err=>{
                message.error(err)
            })
        })
    }
    upload(file){
        return new Promise((resolve ,reject)=> {
            this.datasheet.records.upload(file).then(res=>{
                if(res.success){
                    message.success('上传成功')
                    resolve(res.data)
                }else {
                    message.error(res.message)
                }
            }).catch(err=>{
                message.error(err)
            })
        })
    }

}


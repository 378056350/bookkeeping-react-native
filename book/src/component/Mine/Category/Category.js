import React, { Component } from 'react';
import {
    View,
    Text,
    Alert,
    Animated,
    DeviceEventEmitter,
    StyleSheet
} from 'react-native';
import BaseContainer from '~/common/Base/BaseContainer'
import CHeader from './CHeader'
import CTable from './CTable'
import CButton from './CButton'
import DeviceStorage, {SAVE} from '~/utils/DeviceStorage'
import { BKCModel } from '~/services/Interfaces'


export default class Category extends Component {

    constructor(props) {
        super(props);
        this.state = {
            models: [[],[]],
            handleIndexChange: 0,
        };
    }

    componentDidMount = () => {
        this.getData()
        // 通知
        DeviceEventEmitter.addListener(EVENT.ADD_CUS_BOOK_EVENT, this.getData);
    }

    componentWillUnmount = () => {
        // 销毁通知
        DeviceEventEmitter.removeListener(EVENT.ADD_CUS_BOOK_EVENT, this.getData)
    }
    
    getData = ()=>{
        // 获取分类
        DeviceStorage.getCategorySet().then((models)=>{
            this.setState({
                models: models
            })
        })
    }

    

    // 添加分类
    _onButtonPress = ()=>{
        this.props.navigation.navigate('ACate', {'isIncome': this.state.handleIndexChange})
    }
    // 操作
    _onActionShow = (rowKey)=>{
        var section = parseInt(rowKey.split('.')[0])
        // 删除
        if (section == 0) {
            Alert.alert(
                '警告',
                '删除类别会同时删除该类别下的所有历史收支记录',
                [
                  {text: '确定', onPress: () => this._deleteSectionRow(rowKey)},
                  {text: '取消', onPress: () => {}, style: 'cancel'},
                ], { 
                    cancelable: false 
                }
            )
        }
        // 添加 
        else {
            this._insertSectionRow(rowKey)
        }
    }
    // 删除
    _deleteSectionRow = async (rowKey)=>{
        var key = parseInt(rowKey.split('.')[1])
        
        const index = this.state.handleIndexChange
        var models = this.state.models
        // BKCModel
        var model = models[index][0].data[key]
        // 系统原有
        if (model.is_system == true) {
            BKCModel.addObject(models[index][1].data, model)
            BKCModel.removeOfObject(models[index][0].data, model)
            models = DeviceStorage.sortCategorySet(models)
            this.setState({models: models})

            // 支出
            if (index == 0) {
                var sysHasArr = await DeviceStorage.load(SAVE.PIN_CATE_SYS_HAS_PAY)
                var sysRemoveArr = await DeviceStorage.load(SAVE.PIN_CATE_SYS_REMOVE_PAY)
                var sysHasSyncedArr = await DeviceStorage.load(SAVE.PIN_CATE_SYS_Has_PAY_SYNCED)
                var sysRemoveSyncedArr = await DeviceStorage.load(SAVE.PIN_CATE_SYS_REMOVE_PAY_SYNCED)
                var model = sysHasArr[key]

                BKCModel.addObject(sysRemoveArr, model)
                if (BKCModel.indexOfObject(sysHasSyncedArr, model) != -1) {
                    BKCModel.removeObjectAtIndex(sysHasSyncedArr, key)
                } else {
                    BKCModel.addObject(sysRemoveSyncedArr, model)
                }
                BKCModel.removeObjectAtIndex(sysHasArr, key)

                await DeviceStorage.save(SAVE.PIN_CATE_SYS_HAS_PAY, sysHasArr)
                await DeviceStorage.save(SAVE.PIN_CATE_SYS_REMOVE_PAY, sysRemoveArr)
                await DeviceStorage.save(SAVE.PIN_CATE_SYS_Has_PAY_SYNCED, sysHasSyncedArr)
                await DeviceStorage.save(SAVE.PIN_CATE_SYS_REMOVE_PAY_SYNCED, sysRemoveSyncedArr)


                // 过滤数据代码
                // var names = ["123", "zxc", "qweqweqeqwe", "c,vnxcjvsoifj", "qeqweqweqweqweqweq"]
                // var newnames = names.filter(function(item, index, array) {
                //     return (index > 2)
                // })
                // console.log("=========================");
                // // console.log(newnames);
                
                // var nameresult = names.map(function(item,index,array){
                //     return (item+1);
                // });
                // console.log(nameresult);
                

                // 未实现的代码
                // NSString *preStr = [NSString stringWithFormat:@"cmodel.Id != %ld", model.Id];
                // NSMutableArray<BKModel *> *book = [NSUserDefaults objectForKey:PIN_BOOK];
                // NSMutableArray<BKModel *> *book_synced = [NSUserDefaults objectForKey:PIN_BOOK_SYNCED];
                // book = [NSMutableArray kk_filteredArrayUsingPredicate:preStr array:book];
                // book_synced = [NSMutableArray kk_filteredArrayUsingPredicate:preStr array:book_synced];
                // [NSUserDefaults setObject:book forKey:PIN_BOOK];
                // [NSUserDefaults setObject:book forKey:PIN_BOOK_SYNCED];
                
            }
            // 收入
            else if (index == 1) {

                var sysHasArr = await DeviceStorage.load(SAVE.PIN_CATE_SYS_HAS_INCOME)
                var sysRemoveArr = await DeviceStorage.load(SAVE.PIN_CATE_SYS_REMOVE_INCOME)
                var sysHasSyncedArr = await DeviceStorage.load(SAVE.PIN_CATE_SYS_Has_INCOME_SYNCED)
                var sysRemoveSyncedArr = await DeviceStorage.load(SAVE.PIN_CATE_SYS_REMOVE_INCOME_SYNCED)
                var model = sysHasArr[key]

                BKCModel.addObject(sysRemoveArr, model)
                if (BKCModel.indexOfObject(sysHasSyncedArr, model) != -1) {
                    BKCModel.removeObjectAtIndex(sysHasSyncedArr, key)
                } else {
                    BKCModel.addObject(sysRemoveSyncedArr, model)
                }
                BKCModel.removeObjectAtIndex(sysHasArr, key)

                await DeviceStorage.save(SAVE.PIN_CATE_SYS_HAS_INCOME, sysHasArr)
                await DeviceStorage.save(SAVE.PIN_CATE_SYS_REMOVE_INCOME, sysRemoveArr)
                await DeviceStorage.save(SAVE.PIN_CATE_SYS_Has_INCOME_SYNCED, sysHasSyncedArr)
                await DeviceStorage.save(SAVE.PIN_CATE_SYS_REMOVE_INCOME_SYNCED, sysRemoveSyncedArr)

                /**
                 未实现的代码
                NSString *preStr = [NSString stringWithFormat:@"cmodel.Id != %ld", model.Id];
                NSMutableArray<BKModel *> *book = [NSUserDefaults objectForKey:PIN_BOOK];
                NSMutableArray<BKModel *> *book_synced = [NSUserDefaults objectForKey:PIN_BOOK_SYNCED];
                book = [NSMutableArray kk_filteredArrayUsingPredicate:preStr array:book];
                book_synced = [NSMutableArray kk_filteredArrayUsingPredicate:preStr array:book_synced];
                [NSUserDefaults setObject:book forKey:PIN_BOOK];
                [NSUserDefaults setObject:book forKey:PIN_BOOK_SYNCED];
                 */

            }
        }
        // 自定义
        else {
            BKCModel.removeOfObject(models[index][0].data, model)
            models = DeviceStorage.sortCategorySet(models)
            this.setState({models: models})

            // 支出
            if (index == 0) {
                var cusHasPayArr = await DeviceStorage.load(SAVE.PIN_CATE_CUS_HAS_PAY)
                var cusHasPaySyncedArr = await DeviceStorage.load(SAVE.PIN_CATE_CUS_HAS_PAY_SYNCED)
                var cusRemovePaySyncedArr = await DeviceStorage.load(SAVE.PIN_CATE_CUS_REMOVE_PAY_SYNCED)
                BKCModel.removeOfObject(cusHasPayArr, model)
                if (BKCModel.indexOfObject(cusHasPaySyncedArr, model) != -1) {
                    BKCModel.removeOfObject(cusHasPaySyncedArr, model)
                } else {
                    BKCModel.addObject(cusRemovePaySyncedArr, model)
                }

                DeviceStorage.save(SAVE.PIN_CATE_CUS_HAS_PAY, cusHasPayArr)
                DeviceStorage.save(SAVE.PIN_CATE_CUS_HAS_PAY_SYNCED, cusHasPaySyncedArr)
                DeviceStorage.save(SAVE.PIN_CATE_CUS_REMOVE_PAY_SYNCED, cusRemovePaySyncedArr)

                
                // NSString *preStr = [NSString stringWithFormat:@"cmodel.Id != %ld", model.Id];
                // NSMutableArray<BKModel *> *book = [NSUserDefaults objectForKey:PIN_BOOK];
                // NSMutableArray<BKModel *> *book_synced = [NSUserDefaults objectForKey:PIN_BOOK_SYNCED];
                // book = [NSMutableArray kk_filteredArrayUsingPredicate:preStr array:book];
                // book_synced = [NSMutableArray kk_filteredArrayUsingPredicate:preStr array:book_synced];
                // [NSUserDefaults setObject:book forKey:PIN_BOOK];
                // [NSUserDefaults setObject:book forKey:PIN_BOOK_SYNCED];


            }
            // 收入
            else if (index == 1) {
                var cusHasIcomeEArr = await DeviceStorage.load(SAVE.PIN_CATE_CUS_HAS_INCOME)
                var cusHasIncomeSyncedArr = await DeviceStorage.load(SAVE.PIN_CATE_CUS_HAS_INCOME_SYNCED)
                var cusRemoveIncomeSyncedArr = await DeviceStorage.load(SAVE.PIN_CATE_CUS_REMOVE_INCOME_SYNCED)
                BKCModel.removeOfObject(cusHasIcomeEArr, model)
                if (BKCModel.indexOfObject(cusHasIncomeSyncedArr, model) != -1) {
                    BKCModel.removeOfObject(cusHasIncomeSyncedArr, model)
                } else {
                    BKCModel.addObject(cusRemoveIncomeSyncedArr, model)
                }

                await DeviceStorage.save(SAVE.PIN_CATE_CUS_HAS_INCOME, cusHasIcomeEArr)
                await DeviceStorage.save(SAVE.PIN_CATE_CUS_HAS_INCOME_SYNCED, cusHasIncomeSyncedArr)
                await DeviceStorage.save(SAVE.PIN_CATE_CUS_REMOVE_INCOME_SYNCED, cusRemoveIncomeSyncedArr)

                // NSString *preStr = [NSString stringWithFormat:@"cmodel.Id != %ld", model.Id];
                // NSMutableArray<BKModel *> *book = [NSUserDefaults objectForKey:PIN_BOOK];
                // NSMutableArray<BKModel *> *book_synced = [NSUserDefaults objectForKey:PIN_BOOK_SYNCED];
                // book = [NSMutableArray kk_filteredArrayUsingPredicate:preStr array:book];
                // book_synced = [NSMutableArray kk_filteredArrayUsingPredicate:preStr array:book_synced];
                // [NSUserDefaults setObject:book forKey:PIN_BOOK];
                // [NSUserDefaults setObject:book forKey:PIN_BOOK_SYNCED];
            }
        }
        

        /**
    
        // 删除同类别信息
        NSMutableArray<BKModel *> *arrm = [NSUserDefaults objectForKey:PIN_BOOK];
        NSString *preStr = [NSString stringWithFormat:@"cmodel.Id == %ld", cell.model.Id];
        //    NSPredicate *pre = [NSPredicate predicateWithFormat:preStr];
        //    arrm = [NSMutableArray arrayWithArray:[arrm filteredArrayUsingPredicate:pre]];
        arrm = [NSMutableArray kk_filteredArrayUsingPredicate:preStr array:arrm];
        
        [NSUserDefaults setObject:arrm forKey:PIN_BOOK];
        [[NSNotificationCenter defaultCenter] postNotificationName:NOT_BOOK_DELETE object:nil];
    
    
         */

        
    }
    // 添加
    _insertSectionRow = async (rowKey)=>{
        var key = parseInt(rowKey.split('.')[1])
        
        const index = this.state.handleIndexChange
        var models = this.state.models
        var model = models[index][1].data[key]

        BKCModel.addObject(models[index][0].data, model)
        BKCModel.removeOfObject(models[index][1].data, model)
        models = DeviceStorage.sortCategorySet(models)
        this.setState({models: models})

        // 支出
        if (index == 0) {
            var sysHasArr = await DeviceStorage.load(SAVE.PIN_CATE_SYS_HAS_PAY)
            var sysRemoveArr = await DeviceStorage.load(SAVE.PIN_CATE_SYS_REMOVE_PAY)
            var sysHasSyncedArr = await DeviceStorage.load(SAVE.PIN_CATE_SYS_Has_PAY_SYNCED)
            var sysRemoveSyncedArr = await DeviceStorage.load(SAVE.PIN_CATE_SYS_REMOVE_PAY_SYNCED)
            BKCModel.addObject(sysHasArr, model)

            if (BKCModel.indexOfObject(sysRemoveSyncedArr, model) != -1) {
                BKCModel.removeOfObject(sysRemoveSyncedArr, model)
            } else {
                BKCModel.addObject(sysHasSyncedArr, model)
            }
            BKCModel.removeOfObject(sysRemoveArr, model)

            DeviceStorage.save(SAVE.PIN_CATE_SYS_HAS_PAY, sysHasArr)
            DeviceStorage.save(SAVE.PIN_CATE_SYS_REMOVE_PAY, sysRemoveArr)
            DeviceStorage.save(SAVE.PIN_CATE_SYS_Has_PAY_SYNCED, sysHasSyncedArr)
            DeviceStorage.save(SAVE.PIN_CATE_SYS_REMOVE_PAY_SYNCED, sysRemoveSyncedArr)
        }
        // 收入
        else if (index == 1) {
            var sysHasArr = await DeviceStorage.load(SAVE.PIN_CATE_SYS_HAS_INCOME)
            var sysRemoveArr = await DeviceStorage.load(SAVE.PIN_CATE_SYS_REMOVE_INCOME)
            var sysHasSyncedArr = await DeviceStorage.load(SAVE.PIN_CATE_SYS_Has_INCOME_SYNCED)
            var sysRemoveSyncedArr = await DeviceStorage.load(SAVE.PIN_CATE_SYS_REMOVE_INCOME_SYNCED)
            BKCModel.addObject(sysHasArr, model)

            if (BKCModel.indexOfObject(sysRemoveSyncedArr, model) != -1) {
                BKCModel.removeOfObject(sysRemoveSyncedArr, model)
            } else {
                BKCModel.addObject(sysHasSyncedArr, model)
            }
            BKCModel.removeOfObject(sysRemoveArr, model)

            DeviceStorage.save(SAVE.PIN_CATE_SYS_HAS_INCOME, sysHasArr)
            DeviceStorage.save(SAVE.PIN_CATE_SYS_REMOVE_INCOME, sysRemoveArr)
            DeviceStorage.save(SAVE.PIN_CATE_SYS_Has_INCOME_SYNCED, sysHasSyncedArr)
            DeviceStorage.save(SAVE.PIN_CATE_SYS_REMOVE_INCOME_SYNCED, sysRemoveSyncedArr)
        }
    }


    render() {
        return (
            <BaseContainer 
                navigation={this.props.navigation} 
                title={'类别设置'}
            >
                <CHeader 
                    onTabPress={(index)=>{this.setState({handleIndexChange: index})}} 
                    handleIndexChange={this.state.handleIndexChange}
                />
                <CTable 
                    models={this.state.models}
                    handleIndexChange={this.state.handleIndexChange}
                    actionRow={this._onActionShow}
                />
                <CButton onPress={this._onButtonPress}/>
            </BaseContainer>
        );
    }
}

const styles = StyleSheet.create({
    
});

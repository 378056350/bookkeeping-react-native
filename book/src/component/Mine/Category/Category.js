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
    // 删除警告
    _showWarning = (rowKey)=>{
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
            
        }
        

        /**
         // 自定义
        else {
            NSInteger index = self.header.seg.selectedSegmentIndex;
            BKCModel *model = cell.model;
            [self.models[index].insert removeObject:model];
            [self setModels:self.models];
            
            
            if (index == 0) {
                NSMutableArray *cusHasPayArr = [NSUserDefaults objectForKey:PIN_CATE_CUS_HAS_PAY];
                NSMutableArray *cusHasPaySyncedArr = [NSUserDefaults objectForKey:PIN_CATE_CUS_HAS_PAY_SYNCED];
                NSMutableArray *cusRemovePaySyncedArr = [NSUserDefaults objectForKey:PIN_CATE_CUS_REMOVE_PAY_SYNCED];
                [cusHasPayArr removeObject:model];
                if ([cusHasPaySyncedArr containsObject:model]) {
                    [cusHasPaySyncedArr removeObject:model];
                } else {
                    [cusRemovePaySyncedArr addObject:model];
                }
                [NSUserDefaults setObject:cusHasPayArr forKey:PIN_CATE_CUS_HAS_PAY];
                [NSUserDefaults setObject:cusHasPaySyncedArr forKey:PIN_CATE_CUS_HAS_PAY_SYNCED];
                [NSUserDefaults setObject:cusRemovePaySyncedArr forKey:PIN_CATE_CUS_REMOVE_PAY_SYNCED];
                
                
                NSString *preStr = [NSString stringWithFormat:@"cmodel.Id != %ld", model.Id];
                NSMutableArray<BKModel *> *book = [NSUserDefaults objectForKey:PIN_BOOK];
                NSMutableArray<BKModel *> *book_synced = [NSUserDefaults objectForKey:PIN_BOOK_SYNCED];
                book = [NSMutableArray kk_filteredArrayUsingPredicate:preStr array:book];
                book_synced = [NSMutableArray kk_filteredArrayUsingPredicate:preStr array:book_synced];
                [NSUserDefaults setObject:book forKey:PIN_BOOK];
                [NSUserDefaults setObject:book forKey:PIN_BOOK_SYNCED];
                
                
                
            } else if (index == 1) {
                NSMutableArray *cusHasIcomeEArr = [NSUserDefaults objectForKey:PIN_CATE_CUS_HAS_INCOME];
                NSMutableArray *cusHasIncomeSyncedArr = [NSUserDefaults objectForKey:PIN_CATE_CUS_HAS_INCOME_SYNCED];
                NSMutableArray *cusRemoveIncomeSyncedArr = [NSUserDefaults objectForKey:PIN_CATE_CUS_REMOVE_INCOME_SYNCED];
                [cusHasIcomeEArr removeObject:model];
                if ([cusHasIncomeSyncedArr containsObject:model]) {
                    [cusHasIncomeSyncedArr removeObject:model];
                } else {
                    [cusRemoveIncomeSyncedArr addObject:model];
                }
                [NSUserDefaults setObject:cusHasIcomeEArr forKey:PIN_CATE_CUS_HAS_INCOME];
                [NSUserDefaults setObject:cusHasIncomeSyncedArr forKey:PIN_CATE_CUS_HAS_INCOME_SYNCED];
                [NSUserDefaults setObject:cusRemoveIncomeSyncedArr forKey:PIN_CATE_CUS_REMOVE_INCOME_SYNCED];
                
                
                
                NSString *preStr = [NSString stringWithFormat:@"cmodel.Id != %ld", model.Id];
                NSMutableArray<BKModel *> *book = [NSUserDefaults objectForKey:PIN_BOOK];
                NSMutableArray<BKModel *> *book_synced = [NSUserDefaults objectForKey:PIN_BOOK_SYNCED];
                book = [NSMutableArray kk_filteredArrayUsingPredicate:preStr array:book];
                book_synced = [NSMutableArray kk_filteredArrayUsingPredicate:preStr array:book_synced];
                [NSUserDefaults setObject:book forKey:PIN_BOOK];
                [NSUserDefaults setObject:book forKey:PIN_BOOK_SYNCED];
            }
            
            
        }
    
    
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
                    deleteSectionRow={this._showWarning}
                />
                <CButton onPress={this._onButtonPress}/>
            </BaseContainer>
        );
    }
}

const styles = StyleSheet.create({
    
});

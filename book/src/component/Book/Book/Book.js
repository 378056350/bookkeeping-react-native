import React, { Component } from 'react';
import {
    Text,
    TouchableOpacity,
    DeviceEventEmitter,
    StyleSheet
} from 'react-native';
import Global from './BookGlobal'
import BaseContainer from '~/common/Base/BaseContainer'
import BookNavigation from '~/component/Book/Book/BookNavigation'
import BookScroll from '~/component/Book/Book/Scroll/BookScroll'
import BookKeyboard from '~/component/Book/Book/Keyboard/BookKeyboard'
import DeviceStorage, {SAVE} from '~/utils/DeviceStorage'
import { BKModel } from '~/services/Interfaces'


export default class Book extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            navigationIndex: 0,
            models: [[],[]]
        };
    }

    componentDidMount = ()=>{
        DeviceStorage.getCategory().then((datas) => {
            this.setState({
                models: datas
            })
        });
    };
    
    // 点击完成
    _onNavigationPress = (page)=>{
        this.setState({ navigationIndex: page })
    }

    // 滚动开始
    _onScrollBeginDrag = ()=>{
        this.refs.keyboard._switchAnimation(false)
    }

    // 滚动完成
    _onMomentumScrollEnd = (page)=>{
        this.setState({ navigationIndex: page })
    }

    // 点击Item
    _onItemPress = (index, modal)=>{
        // 记账
        if (modal.id != 999) {
            this.refs.keyboard._switchAnimation(true)
        }
        // 设置
        else {
            this.props.navigation.navigate('Category', {'mode': 'push'})
        }
    }

    // 记账回调
    _onBookPress = async (money, mark, dateStr)=>{
        const date = new Date(dateStr)
        const id = await BKModel.getId()
        const model = this.refs.scroll.getChooseModel()
        const bkmodel = {
            "id": id,
            "price": money,
            "year": date.getFullYear(),
            "month": date.getMonth() + 1,
            "day": date.getDate(),
            "mark": mark,
            "category_id": model.id,
            "cmodel": model
        }

        const { params } = this.props.navigation.state
        // 修改
        if (!!params['model']) {

        } 
        // 新增
        else {
            var bookArr = await DeviceStorage.load(SAVE.PIN_BOOK)
            var bookSyncedArr = await DeviceStorage.load(SAVE.PIN_BOOK_SYNCED)
            BKModel.addObject(bookArr, bkmodel)
            BKModel.addObject(bookSyncedArr, bkmodel)
            await DeviceStorage.save(SAVE.PIN_BOOK, bookArr)
            await DeviceStorage.save(SAVE.PIN_BOOK_SYNCED, bookArr)
        }

        // 通知
        DeviceEventEmitter.emit(EVENT.ADD_BOOK_EVENT, {});


        const { goBack } = this.props.navigation;
        goBack()
        
        // if (self.navigationController.viewControllers.count != 1) {
        //     [self.navigationController popViewControllerAnimated:true];
        //     [[NSNotificationCenter defaultCenter] postNotificationName:NOT_BOOK_COMPLETE object:model];
        // } else {
        //     [self.navigationController dismissViewControllerAnimated:YES completion:^{
        //         [[NSNotificationCenter defaultCenter] postNotificationName:NOT_BOOK_COMPLETE object:model];
        //     }];
        // }



   
        // // 修改
        // else {
        //     _model.price = [price floatValue];
        //     _model.year = date.year;
        //     _model.month = date.month;
        //     _model.day = date.day;
        //     _model.mark = mark;
        //     _model.category_id = cmodel.Id;
        //     _model.cmodel = cmodel;
        //     model = _model;
            
        //     NSMutableArray *bookArr = [NSUserDefaults objectForKey:PIN_BOOK];
        //     NSMutableArray *bookSyncedArr = [NSUserDefaults objectForKey:PIN_BOOK_SYNCED];
        //     NSInteger index = [bookArr indexOfObject:model];
        //     [bookArr replaceObjectAtIndex:index withObject:model];
        //     if ([bookSyncedArr containsObject:model]) {
        //         [bookSyncedArr replaceObjectAtIndex:index withObject:model];
        //     }
        //     [NSUserDefaults setObject:bookArr forKey:PIN_BOOK];
        //     [NSUserDefaults setObject:bookArr forKey:PIN_BOOK_SYNCED];
        // }
        
    }

    // 取消
    hasContentRight = ()=>{
        const { goBack } = this.props.navigation;
        return (
            <TouchableOpacity 
                activeOpacity={0.9} 
                onPress={()=>{goBack()}} 
                style={styles.cancleTouch}
            >
                <Text style={styles.cancle}>取消</Text>
            </TouchableOpacity>
        )
    }

    // 支出/收入
    hasTitleComponent = ()=>{
        return (
            <BookNavigation 
                ref={(nav) => {this.nav = nav}} 
                onPress={this._onNavigationPress}
                navigationIndex={this.state.navigationIndex}
            />
        )
    }

    render() {
        return (
            <BaseContainer 
                navigation={this.props.navigation} 
                hasBack={false}
                hasRight={true}
                hasTitle={false}
                hasContentRight={this.hasContentRight}
                hasTitleComponent={this.hasTitleComponent}
            >
                <BookScroll 
                    ref={'scroll'}
                    models={this.state.models}
                    navigationIndex={this.state.navigationIndex}
                    onScrollBeginDrag={this._onScrollBeginDrag}
                    onMomentumScrollEnd={this._onMomentumScrollEnd}
                    onItemPress={this._onItemPress}
                />
                <BookKeyboard ref={'keyboard'} onBookPress={this._onBookPress}/>
            </BaseContainer>
        );
    }
}


const styles = StyleSheet.create({
    cancleTouch: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 44,
        paddingLeft: countcoordinatesX(30),
        paddingRight: countcoordinatesX(30),
    },
    cancle: {
        fontSize: FONT_SIZE(14),
        fontWeight: '400',
        color: kColor_Text_Black,
    },
});
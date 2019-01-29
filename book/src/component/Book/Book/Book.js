import React, { Component } from 'react';
import {
    View,
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

            // 修改, 设置默认model
            const { params } = this.props.navigation.state
            if (!!params['model']) {
                var index = 0;
                const models = this.state.models[this.state.navigationIndex]
                for (var i=0; i<models.length; i++) {
                    if (models[i].id === params['model'].cmodel.id) {
                        index = i
                    }
                }
                setTimeout(() => {
                    this.refs.scroll._onItemPress(index, params['model'])
                }, 300);
            }
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
        const { params } = this.props.navigation.state
        // 修改
        if (!!params['model']) {
            var date
            if (dateStr === '今天') {
                date = new Date()
            } else {
                date = new Date(dateStr)
            }

            const model = this.refs.scroll.getChooseModel()
            var bkmodel = params['model']
            bkmodel.price = money
            bkmodel.mark = mark
            bkmodel.year = date.getFullYear()
            bkmodel.month = date.getMonth() + 1
            bkmodel.day = date.getDate()
            bkmodel.category_id = model.id
            bkmodel.cmodel = model
            
            var bookArr = await DeviceStorage.load(SAVE.PIN_BOOK)
            var bookSyncedArr = await DeviceStorage.load(SAVE.PIN_BOOK_SYNCED)

            const index = BKModel.indexOfObject(bookArr, bkmodel)
            bookArr[index] = bkmodel
            if (BKModel.indexOfObject(bookSyncedArr, bkmodel) != -1) {
                bookSyncedArr[index] = bkmodel
            }
            await DeviceStorage.save(SAVE.PIN_BOOK, bookArr)
            await DeviceStorage.save(SAVE.PIN_BOOK_SYNCED, bookArr)
            // 通知
            DeviceEventEmitter.emit(EVENT.REPLACE_BOOK_EVENT, bkmodel);
        } 
        // 新增
        else {
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
            
            var bookArr = await DeviceStorage.load(SAVE.PIN_BOOK)
            var bookSyncedArr = await DeviceStorage.load(SAVE.PIN_BOOK_SYNCED)
            BKModel.addObject(bookArr, bkmodel)
            BKModel.addObject(bookSyncedArr, bkmodel)
            await DeviceStorage.save(SAVE.PIN_BOOK, bookArr)
            await DeviceStorage.save(SAVE.PIN_BOOK_SYNCED, bookArr)
            // 通知
            DeviceEventEmitter.emit(EVENT.ADD_BOOK_EVENT, {});
        }


        // 返回
        const { goBack } = this.props.navigation;
        goBack()
        
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
        const { params } = this.props.navigation.state
        return (
            <BaseContainer 
                navigation={this.props.navigation} 
                hasBack={false}
                hasRight={true}
                hasTitle={false}
                hasContentRight={!!params['model'] ? ()=><View/> : this.hasContentRight}
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
                <BookKeyboard 
                    ref={'keyboard'} 
                    onBookPress={this._onBookPress}
                    model={params['model']}
                />
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
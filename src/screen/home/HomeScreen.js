/**
 * Dream Factory
 * https://github.com/fatsoon/dreamfactory-rn
 * Created by fanshuo on 2017/5/15.
 */

import React, { Component } from 'react';

import {
    StyleSheet,
    Button,
    Image,
    View,
    Alert,
    FlatList,
    AsyncStorage,
} from 'react-native';
import CommonStyle from '../../styles/CommonStyle.js';
import DreamListItem from './DreamListItem.js'
import NetUtil from '../../util/NetUtil.js'

export default class HomeScreen extends React.Component{

    constructor(props){
        super(props);
        this.state={
            dream:{
                username: "骇人",
                user_avatar: "http://dreampy-userimage.stor.sinaapp.com/user845_1493803229916.png",
                uid: 845,
                has_up: 1,
                comment_num: 0,
                dream: {
                    create_time_long: 1493805637432,
                    uid: 845,
                    did: 1837,
                    content: "重口味。慎读我六岁的样子，和一群同龄的孩子在一片小空地玩耍，他们玩的很愉快，但似乎看不见我，也许是故意不睬我，他们在追逐，在闹，我被人撞的东倒西歪，有一个高举着小红旗的男生骑着小自行车也混在里面玩，我扑通一下被别人绊倒，手往前一趴，正巧被自行车轮胎轧到，右手从手腕处切断，掉到一个女孩脚边，她没看见，踢走了，手被一个男生踩了一脚，然后又被别人踢走，没有人看见，我慌乱的追着我的手看它在地上滚，我不断被人撞到，爬着伸出左手去抓，却又被踢走，知道它快成为肉泥，我放弃了，接不回来了，抬起右臂，看着断处往外涌血。。。。我醒来，第一件事，摸右手。。。。",
                    access_level: 0,
                        up_num: 3
                }
            },
            dataSource:[],
            onRefreshing: false,
            loadingMore: false,
        };
    }


    componentDidMount() {
        AsyncStorage.getItem("user", (error, result)=>{
            this.user = JSON.parse(result);
            this._getHotDreams();
        });
    }

    static navigationOptions = {
        tabBarLabel: '首页',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../../img/df_tabbar_home.png')}
                style={[CommonStyle.tabbarIcon, {tintColor: tintColor}]}
            />
        ),
        title: '首页',
    };

    render() {
        return (
            <View
                style={styles.contentView}
            >
                <View
                    style={{flex:1, backgroundColor:'gray'}}
                >
                    <FlatList
                        data={this.state.dataSource}
                        renderItem={({item}) => this._hotDreamsRenderItem(item)}
                        refreshing={this.state.onRefreshing}
                        onRefresh={this._getHotDreams.bind(this)}
                        onEndReached={this._onEndReached.bind(this)}
                        onEndReachedThreshold={0.1}
                    />
                </View>
            </View>
        );
    }

    _getHotDreams(){
        this.setState({
            onRefreshing:true,
        });
        NetUtil.latest_dreams(this.user.uid, 10, 0, this._hotDreamsCallBack.bind(this));
    }

    _hotDreamsCallBack(json){
        this.setState({
            onRefreshing:false,
        });
        if(json.code == 0){
            this.setState({
                dataSource: json.dreams,
            });
        }
        else{
            Alert.alert("提示",json.message);
        }
    }

    _hotDreamsRenderItem(item){
        return(
            <DreamListItem
                dream={item}
            ></DreamListItem>
        );
    }

    _onEndReached(){
        if(this.state.loadingMore){
            return;
        }
        NetUtil.latest_dreams(this.user.uid, 10, this.state.dataSource.length, this._hotDreamsLoadMoreCallBack.bind(this));
        this.setState({
            loadingMore: true,
        });
    }

    _hotDreamsLoadMoreCallBack(json){
        this.setState({
            loadingMore:false,
        });
        if(json.code == 0){
            let newDataArray = this.state.dataSource.concat(json.dreams);
            this.setState({
                dataSource: newDataArray,
            });
        }
        else{
            Alert.alert("提示",json.message);
        }
    }

}

const styles = StyleSheet.create({
    contentView: {
        flex:1,
    }
});
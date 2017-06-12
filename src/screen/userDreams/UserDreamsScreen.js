/**
 * Dream Factory
 * https://github.com/fatsoon/dreamfactory-rn
 * Created by fanshuo on 2017/6/12.
 */

import React, {Component, PropTypes} from "react";
import {
    StyleSheet,
    View,
    Image,
    Alert,
    AsyncStorage,
    FlatList,
    Text,
} from "react-native";

import NetUtil from '../../util/NetUtil.js'
import ListSeparatorComponent from '../home/ListSeparatorComponent.js';
import ListFooterComponent from '../home/ListFooterComponent.js';
import DreamListItem from '../home/DreamListItem.js';

export default class UserDreamsScreen extends Component{

    static navigationOptions = ({navigation}) =>{
        const {params = {}} = navigation.state;
        return {
            headerBackTitle: null,
            headerTintColor: '#ffffff',
            showIcon: true,
            title: '',
            headerStyle:{
                backgroundColor: '#0067ba',
            },
            headerTitleStyle:{
                color: '#ffffff',
            },
        };
    };

    constructor(props){
        super(props);
        this.state={
            dataSource:[],
            onRefreshing: false,
            loadingMore: false,
            loadedAll: false,
            showFooter: false,
            userInfo:null,
        };
    }


    componentDidMount() {
        AsyncStorage.getItem("user", (error, result)=>{
            this.user = JSON.parse(result);
            this._getDreams();
        });
        this._getUserInfo();
    }




    render() {
        return (
            <View
                style={styles.contentView}
            >
                <View
                    style={{flex:1, backgroundColor:'gray'}}
                >
                    <FlatList
                        style={styles.myListView}
                        data={this.state.dataSource}
                        renderItem={({item}) => this._dreamsRenderItem(item)}
                        refreshing={this.state.onRefreshing}
                        onRefresh={this._getDreams.bind(this)}
                        onEndReached={this._onEndReached.bind(this)}
                        onEndReachedThreshold={0.1}
                        ItemSeparatorComponent={ListSeparatorComponent}
                        ListFooterComponent={this.state.showFooter?ListFooterComponent:null}
                        ListHeaderComponent={this._getHeaderComponent.bind(this)}
                        keyExtractor={(item, index) => item.dream.did}
                    />
                </View>
            </View>
        );
    }

    _getHeaderComponent(){
        return(
            <View>
                <View style={headerStyles.contentView}>
                    <Image
                        style={headerStyles.avatar}
                        source={this.state.userInfo?{uri: this.state.userInfo.avatar}:require("../../img/ic_launcher.png")}
                    />
                    <Text
                        style={headerStyles.nickname}
                    >
                        {this.state.userInfo?this.state.userInfo.nickname:''}
                    </Text>
                    <Text
                        style={headerStyles.info}
                    >{this.state.userInfo?this.state.userInfo.dreams_num+'篇记录　|　'+this.state.userInfo.dreams_num+'个赞':''}</Text>
                </View>
                <View
                    style={headerStyles.topSeparator}
                >


                </View>
            </View>
        );
    }

    _getUserInfo(){
        NetUtil.get_user_info(this.props.navigation.state.params.userId, this._getUserInfoCallBack.bind(this));
    }

    _getUserInfoCallBack(json){
        if(json.code == 0){
            this.setState({
                userInfo: json,
            });
        }
        else{
            Alert.alert("提示",json.message);
        }
    }

    _getDreams(){

        NetUtil.user_dreams(this.props.navigation.state.params.userId, this.user.uid, 10, 0, this._getDreamsCallBack.bind(this));
        this.setState({
            onRefreshing:true,
            loadedAll: false,
        });

    }

    _getDreamsCallBack(json){
        this.setState({
            onRefreshing:false,
        });
        if(json.code == 0){
            this.setState({
                dataSource: json.dreams,
            });
            if(json.dreams.length == 10){
                this.setState({
                    showFooter: true,
                });
            }
            else{
                this.setState({
                    showFooter: false,
                    loadedAll: true,
                });
            }

        }
        else{
            Alert.alert("提示",json.message);
        }
    }

    _dreamsRenderItem(item){
        return(
            <DreamListItem
                dream={item}
                navigation={this.props.navigation}
            ></DreamListItem>
        );
    }

    _onEndReached(){
        if(this.state.loadingMore || this.state.loadedAll){
            return;
        }
        console.log('_onEndReached');
        NetUtil.user_dreams(this.props.navigation.state.params.userId, this.user.uid, 10, this.state.dataSource.length, this._dreamsLoadMoreCallBack.bind(this));
        this.setState({
            loadingMore: true,
        });
    }

    _dreamsLoadMoreCallBack(json){
        this.setState({
            loadingMore:false,
        });
        if(json.code == 0){
            let newDataArray = this.state.dataSource.concat(json.dreams);
            this.setState({
                dataSource: newDataArray,
            });
            if(json.dreams.length == 10){
                this.setState({
                    showFooter: true,
                });
            }
            else{
                this.setState({
                    showFooter: false,
                    loadedAll: true,
                });
            }
        }
        else{
            Alert.alert("提示",json.message);
        }
    }

}

const styles = StyleSheet.create({
    contentView: {
        flex:1,
    },
    myListView: {
        backgroundColor: '#E5E5E5',
    }
});

const headerStyles = StyleSheet.create({
    contentView:{
        flex:1,
        height:200,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        backgroundColor:'#ffffff',
    },
    avatar:{
        height:80,
        width:80,
        borderRadius:40,
    },
    nickname:{
        color:'#000000',
        fontSize:20,
        marginTop:10,
    },
    info:{
        color:'#999999',
        fontSize:15,
        marginTop:10,
    },
    topSeparator:{
        flex:1,
        height:5,
        backgroundColor:'#E5E5E5'
    },
});

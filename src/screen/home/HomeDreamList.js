/**
 * Dream Factory
 * https://github.com/fatsoon/dreamfactory-rn
 * Created by fanshuo on 2017/5/23.
 */
import React, { Component,PropTypes } from 'react';

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
import DreamListItem from './DreamListItem.js';
import NetUtil from '../../util/NetUtil.js';
import ListSeparatorComponent from './ListSeparatorComponent.js';
import ListFooterComponent from './ListFooterComponent.js';

export default class HomeDreamList extends React.Component{

    static propTypes = {
        type: PropTypes.string,
    };

    static defaultProps = {
        type: 'latest',
    };

    constructor(props){
        super(props);
        this.state={
            dataSource:[],
            onRefreshing: false,
            loadingMore: false,
            loadedAll: false,
            showFooter: false,
        };
    }


    componentDidMount() {
        console.log("componentDidMount...type = "+this.props.type);
        AsyncStorage.getItem("user", (error, result)=>{
            this.user = JSON.parse(result);
            this._getDreams();
        });
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
                        keyExtractor={(item, index) => item.dream.did}
                    />
                </View>
            </View>
        );
    }

    _getDreams(){

        if(this.props.type === 'hot'){
            NetUtil.hot_dreams(this.user.uid, 10, 0, this._getDreamsCallBack.bind(this));
        }
        else if(this.props.type === 'latest'){
            NetUtil.latest_dreams(this.user.uid, 10, 0, this._getDreamsCallBack.bind(this));
        }
        else if(this.props.type === 'my'){
            NetUtil.my_dreams(this.user.uid, 10, 0, this._getDreamsCallBack.bind(this));
        }
        else{
            return;
        }
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
        if(this.props.type === 'hot'){
            NetUtil.hot_dreams(this.user.uid, 10, this.state.dataSource.length, this._dreamsLoadMoreCallBack.bind(this));
        }
        else if(this.props.type === 'latest'){
            NetUtil.latest_dreams(this.user.uid, 10, this.state.dataSource.length, this._dreamsLoadMoreCallBack.bind(this));
        }
        else if(this.props.type === 'my'){
            NetUtil.my_dreams(this.user.uid, 10, this.state.dataSource.length, this._dreamsLoadMoreCallBack.bind(this));
        }
        else{
            return;
        }

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
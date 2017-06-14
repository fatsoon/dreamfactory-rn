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
    Text,
    TouchableHighlight,
    AsyncStorage,
    Alert,
} from 'react-native';
import CommonStyle from '../../styles/CommonStyle.js';
import OptionListItem from '../../view/OptionListItem.js'

export default class MineScreen extends React.Component{


    static navigationOptions = {
        tabBarLabel: '我',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../../img/df_tabbar_mine.png')}
                style={[CommonStyle.tabbarIcon, {tintColor: tintColor}]}
            />
        ),
        title: '我',
    };

    constructor(props){
        super(props);
        this.state = {
            user: {},
        };
    }

    componentDidMount() {
        AsyncStorage.getItem("user", (error, result)=>{
            let user = JSON.parse(result);
            this.setState({
                user:user,
            });
        });
    }

    componentWillUpdate(){
        AsyncStorage.getItem("user", (error, result)=>{
            let user = JSON.parse(result);
            this.setState({
                user:user,
            });
        });
    }

    render() {
        return (
            <View
                style={styles.contentView}
            >
                <View
                    style={styles.blank}

                />
                <TouchableHighlight
                    underlayColor='#d9d9d9'
                    activeOpacity={1.0}
                    style={[myprofileStyles.touchableItem]}
                    onPress={()=>this.props.navigation.navigate('MyProfile')}>
                    <View
                        style={myprofileStyles.row}
                    >
                        <Image style={myprofileStyles.avatar} source={{uri: this.state.user.avatar}} />
                        <Text
                            style={myprofileStyles.text}
                        >
                            {this.state.user.nickname}
                        </Text>

                        <Image style={myprofileStyles.arrow} source={require('../../img/ic_arrow_right.png')} />
                    </View>
                </TouchableHighlight>

                <View
                    style={styles.blank}

                />

                <OptionListItem
                    text="我的赞"
                    iconSource={require('../../img/ic_thumb_up.png')}
                    onItemClick={()=>this.props.navigation.navigate('MyUpDreams')}
                    showLine={true}
                    showBorderTop={true}
                />
                <OptionListItem
                    text="草稿箱"
                    iconSource={require('../../img/ic_description.png')}
                    onItemClick={()=>{Alert.alert('提示','敬请期待')}}
                    showLine={false}
                    showBorderBottom={true}
                />
                <View
                    style={styles.blank}

                />

                <OptionListItem
                    text="设置"
                    iconSource={require('../../img/ic_settings.png')}
                    onItemClick={()=>this.props.navigation.navigate('Setting')}
                    showLine={false}
                    showBorderTop={true}
                    showBorderBottom={true}
                />

            </View>
        );
    }


}

const myprofileStyles = StyleSheet.create({
    touchableItem:{
        backgroundColor:'#ffffff'
    },
    row:{
        flexDirection: 'row',
        alignItems: 'center',
        height:70,
        paddingLeft: 15,
        paddingRight:14,
        borderTopWidth:0.5,
        borderTopColor:'#d9d9d9',
        borderBottomWidth:0.5,
        borderBottomColor:'#d9d9d9',
    },
    line:{
        height: 1,
        backgroundColor: '#d9d9d9',
        marginLeft: 15,
        marginRight: 0,
    },
    avatar:{
        width:50,
        height:50,
        borderRadius: 25,
    },
    text:{
        flex:1,
        marginLeft: 15,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 15,
    },
    arrow:{
        width:14,
        height:14,
    },
});

const styles = StyleSheet.create({
    contentView:{
        flex:1,
        backgroundColor:'#efeff4',
    },
    blank:{
       height:10,
    },
});
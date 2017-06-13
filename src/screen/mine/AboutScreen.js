/**
 * Dream Factory
 * https://github.com/fatsoon/dreamfactory-rn
 * Created by fanshuo on 2017/6/13.
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
} from 'react-native';

export default class AboutScreen extends React.Component{


    static navigationOptions = ({navigation}) =>{
        const {params = {}} = navigation.state;
        return {
            headerBackTitle: null,
            headerTintColor: '#ffffff',
            showIcon: true,
            title: '关于',
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

    render() {
        return (
            <View style={styles.contentView}>
                <Image
                    style={styles.launcherIcon}
                    source={require("../../img/ic_launcher.png")}
                />
                <Text
                    style={styles.name}
                >
                    梦境工厂
                </Text>
                <Text
                    style={styles.version}
                >
                    2.2.0版
                </Text>
                <Text
                    style={styles.copyright}
                >
                    Copyright © 2014-2017 梦境工厂
                </Text>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    contentView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        backgroundColor:'#ffffff',
    },
    launcherIcon:{
        height:80,
        width:80,
    },
    name:{
        color:'#000000',
        fontSize:18,
        marginTop:10,
    },
    version:{
        color:'#999999',
        fontSize:16,
        marginTop:10,
    },
    copyright:{
        color:'#999999',
        fontSize:12,
        marginTop:140,
    },

});

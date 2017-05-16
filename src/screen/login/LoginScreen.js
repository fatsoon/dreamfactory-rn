/**
 * Dream Factory
 * https://github.com/fatsoon/dreamfactory-rn
 * Created by fanshuo on 2017/5/16.
 */

import React, { Component } from 'react';

import {
    StyleSheet,
    Button,
    Image,
    View,
    TouchableHighlight,
    TouchableOpacity,
    Text,
    TextInput
} from 'react-native';
import CommonStyle from '../../styles/CommonStyle.js';
import DFNavigationItem from '../../view/DFNavigationItem.js';
import RadiusButton from '../../view/RadiusButton.js';


export default class LoginScreen extends React.Component{

    constructor(props){
        super(props);
    }

    static navigationOptions = ({ navigation }) => {
        const {state, setParams} = navigation;

        return {
            headerBackTitle: null,
            headerTintColor: '#ffffff',
            showIcon: true,
            title: '登录',
            headerRight: (
                <DFNavigationItem onPress={()=>{navigation.navigate('SignUp')}} />
            ),
            headerStyle: {
                backgroundColor: '#0067ba',
            },
            headerTitleStyle: {
                color: '#ffffff',
                fontSize: 16,
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topSpace} />
                <View
                    style={styles.row}
                >
                    <Image style={styles.icon} source={require('../../img/df_ic_phone_iphone.png')} />
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({text})}
                        placeholder="请输入您的手机号"
                        placeholderTextColor="#c7c7cd"
                    />
                </View>

                <View style={styles.line} />

                <View
                    style={styles.row}
                >
                    <Image style={styles.icon} source={require('../../img/df_ic_lock_outline.png')} />
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({text})}
                        placeholder="请输入登录密码"
                        placeholderTextColor="#c7c7cd"
                    />
                </View>

                <RadiusButton
                    btnName= '登录'
                    textStyle= {{
                        fontSize: 16,
                        color: '#ffffff',
                    }}
                    btnStyle= {{
                        flex:1,
                        height: 44,
                        borderRadius: 4,
                        marginLeft:10,
                        marginRight:10,
                        marginTop: 30,
                    }}
                    underlayColor= '#064477'
                    onPress={this._onLoginButtonClick} >
                </RadiusButton>
            </View>
        );
    }

    _onLoginButtonClick(){
        alert("login");
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f4f4f4'
    },
    topSpace:{
        height:10,
        backgroundColor:'#f4f4f4'
    },
    row:{
        flexDirection: 'row',
        alignItems: 'center',
        height:50,
        backgroundColor:'#ffffff',
        paddingLeft: 10,
        paddingRight:10,
    },
    line:{
        height: 1,
        backgroundColor: '#dddddd',
        marginLeft: 10,
        marginRight: 10,
    },
    icon:{
        width:20,
        height:20,
    },
    input:{
        flex:1,
        marginLeft: 5,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 15,
    }

});
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
    TextInput,
    Alert,
    AsyncStorage,
} from 'react-native';
import CommonStyle from '../../styles/CommonStyle.js';
import DFNavigationItem from '../../view/DFNavigationItem.js';
import RadiusButton from '../../view/RadiusButton.js';
import InputRow from '../../view/InputRow.js';
import NetUtil from '../../util/NetUtil.js'


export default class LoginScreen extends React.Component{

    constructor(props){
        super(props);
    }

    componentDidMount() {
        AsyncStorage.getItem("user", (error, result)=>{
            alert(result);
        });

    }

    static navigationOptions = ({ navigation }) => {
        const {state, setParams} = navigation;

        return {
            headerBackTitle: null,
            headerTintColor: '#ffffff',
            showIcon: true,
            title: '登录',
            headerRight: (
                <DFNavigationItem
                    onPress={()=>{navigation.navigate('SignUp')}}
                    title="注册"
                />
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
                <InputRow
                    showLine={true}
                    placeHolder="请输入您的手机号"
                    iconSource={require('../../img/df_ic_phone_iphone.png')}
                    onChangeText={(text) => this.setState({phone:text})}
                    keyboardType="numeric"
                />
                <InputRow
                    placeHolder="请输入登录密码"
                    iconSource={require('../../img/df_ic_lock_outline.png')}
                    onChangeText={(text) => this.setState({password:text})}
                    secureTextEntry={true}
                />

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
                    onPress={this._onLoginButtonClick.bind(this)} >
                </RadiusButton>
            </View>
        );
    }

    _onLoginButtonClick(){
        // this.props.navigation.navigate('HomeTab');
        NetUtil.login_via_phone(this.state.phone, this.state.password, this._loginCallBack.bind(this))
    }

    _loginCallBack(json){
        if(json.code == 0){
            AsyncStorage.setItem("user",JSON.stringify(json.data), (error)=>{
                if(error){
                    alert(error);
                }
            });
            this.props.navigation.navigate('HomeTab');
        }
        else{
            Alert.alert("提示",json.message)
        }
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

});
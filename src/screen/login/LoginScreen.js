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
import InputRow from '../../view/InputRow.js';


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
                <InputRow
                    showLine={true}
                    placeHolder="请输入您的手机号"
                    iconSource={require('../../img/df_ic_phone_iphone.png')}
                />
                <InputRow
                    placeHolder="请输入登录密码"
                    iconSource={require('../../img/df_ic_lock_outline.png')}
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
        this.props.navigation.navigate('HomeTab');
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
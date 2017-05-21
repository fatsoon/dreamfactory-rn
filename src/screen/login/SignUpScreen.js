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
    TextInput,
    Alert,
    AsyncStorage,
} from 'react-native';
import CommonStyle from '../../styles/CommonStyle.js';
import InputRow from '../../view/InputRow.js';
import RadiusButton from '../../view/RadiusButton.js';
import ValcodeButton from '../../view/ValcodeButton.js';
import NetUtil from '../../util/NetUtil.js'

export default class SignUpScreen extends React.Component{

    constructor(props){
        super(props);
        this.state={
            phone:'',
            valcode:'',
            password:'',
        };
    }

    render() {
        return (
        <View>
            <View style={styles.topSpace} />
            <InputRow
                showLine={true}
                placeHolder="请输入您的手机号"
                iconSource={require('../../img/df_ic_phone_iphone.png')}
                onChangeText={(text) => this.setState({phone:text})}
                keyboardType="numeric"
            />
            <View style = {{
                backgroundColor:"#ffffff"}}>
                <View
                    style={styles.row}
                >
                    <Image style={styles.icon} source={require('../../img/df_ic_message.png')} />
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({valcode:text})}
                        placeholder="请输入验证码"
                        placeholderTextColor="#c7c7cd"
                        keyboardType="numeric"
                    />
                    <ValcodeButton
                        phone={this.state.phone}
                    />
                </View>

                <View style={styles.line} />

            </View>
            <InputRow
                placeHolder="请输入密码"
                iconSource={require('../../img/df_ic_lock_outline.png')}
                onChangeText={(text) => this.setState({password:text})}
                secureTextEntry={true}
            />

            <RadiusButton
                btnName= '注册'
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
                onPress={this._onRegisterButtonClick.bind(this)} >
            </RadiusButton>
        </View>

        );
    }

    _onRegisterButtonClick(){
        if(!this.state.phone || this.state.phone.length != 11){
            Alert.alert("提示","请输入正确的手机号")
            return;
        }
        if(!this.state.valcode || this.state.valcode.length != 4){
            Alert.alert("提示","请输入正确的验证码")
            return;
        }
        if(!this.state.password || this.state.valcode.length == 0){
            Alert.alert("提示","请输入密码")
            return;
        }
        NetUtil.register_via_phone(this.state.phone, this.state.password, this.state.valcode, this._registerCallBack.bind(this));
        // this.props.navigation.navigate('HomeTab');
    }

    _registerCallBack(json){
        if(json.code == 0){
            AsyncStorage.setItem("user",JSON.stringify(json.data), (error)=>{
                if(error){
                    alert(error);
                }

            });
            this.props.navigation.navigate('HomeTab');
        }
        else{
            Alert.alert("提示", json.message)
        }
    }

}

const styles = StyleSheet.create({
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
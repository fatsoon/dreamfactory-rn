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
    TextInput
} from 'react-native';
import CommonStyle from '../../styles/CommonStyle.js';
import InputRow from '../../view/InputRow.js';
import RadiusButton from '../../view/RadiusButton.js';
import ValcodeButton from '../../view/ValcodeButton.js';

export default class SignUpScreen extends React.Component{

    render() {
        return (
        <View>
            <View style={styles.topSpace} />
            <InputRow
                showLine={true}
                placeHolder="请输入您的手机号"
                iconSource={require('../../img/df_ic_phone_iphone.png')}
            />
            <View style = {{
                backgroundColor:"#ffffff"}}>
                <View
                    style={styles.row}
                >
                    <Image style={styles.icon} source={require('../../img/df_ic_message.png')} />
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({text})}
                        placeholder="请输入验证码"
                        placeholderTextColor="#c7c7cd"
                    />
                    <ValcodeButton />
                </View>

                <View style={styles.line} />

            </View>
            <InputRow
                placeHolder="请输入密码"
                iconSource={require('../../img/df_ic_lock_outline.png')}
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
        this.props.navigation.navigate('HomeTab');
    }
    _onValcodeButtonClick(){

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
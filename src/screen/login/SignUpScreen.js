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
    View
} from 'react-native';
import CommonStyle from '../../styles/CommonStyle.js';
import InputRow from '../../view/InputRow.js';
import RadiusButton from '../../view/RadiusButton.js';

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
            <InputRow
                showLine={true}
                placeHolder="请输入验证码"
                iconSource={require('../../img/df_ic_message.png')}
            />
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

}

const styles = StyleSheet.create({
    topSpace:{
        height:10,
        backgroundColor:'#f4f4f4'
    },
});
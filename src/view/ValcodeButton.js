/**
 * Dream Factory
 * https://github.com/fatsoon/dreamfactory-rn
 * Created by fanshuo on 2017/5/18.
 */


import React, {
    Component,
    PropTypes,
} from 'react';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native';

import NetUtil from '../util/NetUtil.js'

export default class ValcodeButton extends Component{

    static propTypes = {
        phone: PropTypes.string,
    };

    static defaultProps = {
        phone: null,
    };

    constructor(props){
        super(props);
        this.state = {
            buttonText:'获取验证码',
            enable: true,
        };
    }

    componentDidMount() {


    }
    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearInterval(this.timer);
    }

    render() {
        return (
            <View style = {{
                justifyContent: 'center',
                alignItems: 'center',

            }}>
                <TouchableOpacity
                    style={[styles.center, styles.btnDefaultStyle]}
                    onPress={this._onButtonClick.bind(this)}
                    disabled={!this.state.enable}
                >

                    <Image
                        style={[styles.center, styles.image]}
                        source={this.state.enable?require('../img/df_button_valcode.png'):require('../img/df_button_valcode_disable.png')}
                        resizeMode="stretch"
                    >
                        <Text style={this.state.enable?styles.textStyle:styles.textDisableStyle}>{this.state.buttonText}</Text>
                    </Image>
                </TouchableOpacity>
            </View>
        );
    }

    _onButtonClick(){
        // Alert.alert("提示", this.props.phone)
        if(this.props.phone && this.props.phone.length == 11){
            NetUtil.send_valcode(this.props.phone, this._sendValcodeCallBack.bind(this));
        }
        else{
            Alert.alert("提示", '请填写正确的手机号')
        }


    }

    _sendValcodeCallBack(json){
        if(json.code == 0){
            Alert.alert("提示","发送成功")
            this.second = 10;
            this.setState({
                enable: false,
                buttonText:'重新获取'+this.second+'s'
            });
            this.timer = setInterval(
                this._secondTask.bind(this),
                1000
            );
        }
        else{
            Alert.alert("提示",json.message)
        }
    }

    _secondTask(){
        this.second -= 1;
        this.setState({
            buttonText:'重新获取'+this.second+'s'
        });
        if(this.second === 0){
            this.timer && clearInterval(this.timer);
            this.setState({
                buttonText:'获取验证码',
                enable: true,
            });
        }
    }

}


const styles = StyleSheet.create({
    center: {
        justifyContent:'center',
        alignItems: 'center',
    },

    textStyle: {
        fontSize: 12,
        color: '#0067ba',
    },
    textDisableStyle: {
        fontSize: 12,
        color: '#b7b7b7',
    },
    image:{
        height: 22,
        width: 86.5,
    }
});
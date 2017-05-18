/**
 * Dream Factory
 * https://github.com/fatsoon/dreamfactory-rn
 * Created by fanshuo on 2017/5/18.
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


export default class LauncherScreen extends React.Component{

    constructor(props){
        super(props);

    }

    componentDidMount() {
        this.timer = setTimeout(
            () => { this.props.navigation.navigate('Login'); },
            500
        );
    }
    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearTimeout(this.timer);
    }

    static navigationOptions = ({ navigation }) => {
        const {state, setParams} = navigation;

        return {
            header: null
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.centerView}>
                    <Image style={styles.icon} source={require('../../img/ic_launcher.png')} />
                    <Text style={styles.title}>梦境工厂</Text>
                    {/*<Text style={styles.summary}>让您的梦更有价值</Text>*/}
                </View>
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
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor:'#ffffff'
    },
    centerView:{

        alignItems: 'center',
        paddingBottom:100,
    },
    icon:{
        width:100,
        height:100,
    },
    title:{
        fontSize:28,
        color:'#000000',
        marginTop:10,
    },
    summary:{
        fontSize:14,
        color:'#888888',
        marginTop:10,
    }


});
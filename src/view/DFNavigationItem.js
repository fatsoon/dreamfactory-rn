/**
 * Dream Factory
 * https://github.com/fatsoon/dreamfactory-rn
 * Created by fanshuo on 2017/5/16.
 */

import React, { Component } from 'react';

import {
    StyleSheet,
    Button,
    View,
    TouchableOpacity,
    Text
} from 'react-native';

export default class DFNavigationItem extends Component{

    render(){
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <View
                    style={styles.container}
                >
                <Text
                    style={styles.text}>注册</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        width: 45,
        height: 45,
        backgroundColor: '#00000000',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text:{
        fontSize: 16,
        color: "white"
    }

});
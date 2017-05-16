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

export default class SignUpScreen extends React.Component{

    render() {
        return (
            <Button
                onPress={() => this.props.navigation.navigate('HomeTab')}
                title="完成"
            />
        );
    }

}

const styles = StyleSheet.create({

});
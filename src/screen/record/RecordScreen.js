/**
 * Dream Factory
 * https://github.com/fatsoon/dreamfactory-rn
 * Created by fanshuo on 2017/5/15.
 */

import React, { Component } from 'react';

import {
    StyleSheet,
    Button,
    Image,
    View
} from 'react-native';
import CommonStyle from '../../styles/CommonStyle.js';

export default class RecordScreen extends React.Component{


    static navigationOptions = {
        tabBarLabel: '记录',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../../img/df_tabbar_record.png')}
                style={[CommonStyle.tabbarIcon, {tintColor: tintColor}]}
            />
        ),
        title: '记录',
    };

    render() {
        return (
            <Button
                onPress={() => this.props.navigation.navigate('Login')}
                title="Go to Login"
            />
        );
    }

}

const styles = StyleSheet.create({

});
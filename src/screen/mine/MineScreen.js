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

export default class MineScreen extends React.Component{


    static navigationOptions = {
        tabBarLabel: '我',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../../img/df_tabbar_mine.png')}
                style={[CommonStyle.tabbarIcon, {tintColor: tintColor}]}
            />
        ),
        title: '我',
    };

    render() {
        return (
            <Button
                onPress={() => this.props.navigation.navigate('Notifications')}
                title="Go to notifications"
            />
        );
    }

}

const styles = StyleSheet.create({

});
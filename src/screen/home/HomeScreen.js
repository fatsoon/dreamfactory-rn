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
    View,
} from 'react-native';
import CommonStyle from '../../styles/CommonStyle.js';

export default class HomeScreen extends React.Component{



    static navigationOptions = {
        tabBarLabel: '首页',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../../img/df_tabbar_home.png')}
                style={[CommonStyle.tabbarIcon, {tintColor: tintColor}]}
            />
        ),
        title: '首页',
    };

    render() {
        return (
            <View
                style={styles.contentView}
            >
                <View
                    style={{flex:1, backgroundColor:'gray'}}

                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    contentView: {
        flex:1,
    }
});
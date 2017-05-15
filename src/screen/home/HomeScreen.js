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
    StatusBar,
} from 'react-native';
import CommonStyle from '../../styles/CommonStyle.js';
import DFNavigationBar from '../../view/DFNavigationBar.js'

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
    };

    render() {
        return (
            <View
                style={styles.contentView}
            >
                <StatusBar
                    backgroundColor="red"
                    barStyle="light-content"
                    translucent={true}
                />

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
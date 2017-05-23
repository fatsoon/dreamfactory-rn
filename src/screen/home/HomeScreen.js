/**
 * Dream Factory
 * https://github.com/fatsoon/dreamfactory-rn
 * Created by fanshuo on 2017/5/15.
 */

import React, { Component } from 'react';

import {
    StyleSheet,
    Image,
} from 'react-native';
import CommonStyle from '../../styles/CommonStyle.js';
import ScrollableTabView, { ScrollableTabBar, DefaultTabBar} from 'react-native-scrollable-tab-view';
import HomeDreamList from '../home/HomeDreamList.js'

export default class HomeScreen extends React.Component{

    constructor(props){
        super(props);
    }


    componentDidMount() {

    }

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
            <ScrollableTabView
                style={styles.container}
                tabBarBackgroundColor='white'
                tabBarActiveTextColor='#0067ba'
                tabBarInactiveTextColor='#555555'
                tabBarTextStyle={styles.tabBarText}
                tabBarUnderlineStyle={styles.tabBarUnderline}
            >
                <HomeDreamList
                    type="hot"
                    tabLabel='热门' />
                <HomeDreamList
                    type="latest"
                    tabLabel='最新' />
            </ScrollableTabView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    tabBarText: {
        fontSize: 14,
        marginTop: 13,
    },
    tabBarUnderline: {
        backgroundColor: '#0067ba'
    },
});
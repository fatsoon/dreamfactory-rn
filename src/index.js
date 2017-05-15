/**
 * Dream Factory
 * https://github.com/fatsoon/dreamfactory-rn
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Button,
    Image,
    View
} from 'react-native';
import { TabNavigator } from 'react-navigation';
import HomeScreen from './screen/home/HomeScreen.js'
import RecordScreen from './screen/record/RecordScreen.js'
import MineScreen from './screen/mine/MineScreen.js'



const DFApp = TabNavigator({
    Home: {
        screen: HomeScreen,
    },
    Record: {
        screen: RecordScreen,
    },
    Mine: {
        screen: MineScreen,
    },
}, {
    tabBarOptions: {
        activeTintColor: '#0067ba',
    },
});


export default DFApp;
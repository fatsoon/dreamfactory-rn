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
    View,
    StatusBar
} from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import HomeScreen from './screen/home/HomeScreen.js'
import RecordScreen from './screen/record/RecordScreen.js'
import MineScreen from './screen/mine/MineScreen.js'

export default class DFApp extends Component{

    constructor() {
        super()

        StatusBar.setBarStyle('light-content')
    }

    render(){
        return(
            <MyStack />
        );
    }
}

const Tab = TabNavigator(
    {
        Home: {
            screen: HomeScreen,
        },
        Record: {
            screen: RecordScreen,
        },
        Mine: {
            screen: MineScreen,
        },
    },
    {
        tabBarOptions: {
            activeTintColor: '#0067ba',
        },
    }
);


const MyStack = StackNavigator(
    {
        Home: {
            screen: Tab,
        },
    },
    {
        navigationOptions: {
            // headerStyle: { backgroundColor: color.theme }
            headerBackTitle: null,
            headerTintColor: '#0067ba',
            showIcon: true,
        },
    }
);

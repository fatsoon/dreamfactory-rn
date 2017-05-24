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
import LoginScreen from './screen/login/LoginScreen.js'
import SignUpScreen from './screen/login/SignUpScreen.js'
import LauncherScreen from './screen/launcher/LauncherScreen.js'
import DreamDetailScreen from './screen/detail/DreamDetailScreen.js'

export default class DFApp extends Component{

    constructor() {
        super()

        StatusBar.setBarStyle('light-content')
    }

    render(){
        return(
            <MyStack
                onNavigationStateChange={
                    (prevState, currentState) => {
                        console.log('onNavigationStateChange');
                    }
                }

            />
        );
    }
}

const HomeTab = TabNavigator(
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
        lazy: true,
    }
);


const MyStack = StackNavigator({
    Launcher:{
        screen: LauncherScreen,

    },
    Login:{
        screen: LoginScreen,

    },
    SignUp:{
        screen: SignUpScreen,
        navigationOptions: {
            headerBackTitle: null,
            headerTintColor: '#ffffff',
            showIcon: true,
            title: '注册',
            headerStyle:{
                backgroundColor: '#0067ba',
            },
            headerTitleStyle:{
                color: '#ffffff',
            }
        },
    },
    HomeTab: {
        screen: HomeTab,
        navigationOptions: {
            // headerStyle: { backgroundColor: color.theme }
            headerLeft:null,
            headerTintColor: '#ffffff',
            showIcon: true,
            headerStyle:{
                backgroundColor: '#0067ba',
            },
            headerTitleStyle:{
                color: '#ffffff',
            }
        },
    },
    DreamDetail: {
        screen: DreamDetailScreen,
        navigationOptions: {
            headerBackTitle: null,
            headerTintColor: '#ffffff',
            showIcon: true,
            title: '',
            headerStyle:{
                backgroundColor: '#0067ba',
            },
            headerTitleStyle:{
                color: '#ffffff',
            }
        },
    },

});

const defaultGetStateForAction = MyStack.router.getStateForAction;

MyStack.router.getStateForAction = (action, state) => {
    if (state && action.type === 'Navigation/NAVIGATE' && action.routeName === 'Login') {
        const initialNavState = {
            index: 0,
            routes: [
                {
                    key: 'Login',
                    routeName: 'Login'
                },
            ],
        };
        return initialNavState;
    }
    if (state && action.type === 'Navigation/NAVIGATE' && action.routeName === 'HomeTab') {
        const initialNavState = {
            index: 0,
            routes: [
                {
                    key: 'HomeTab',
                    routeName: 'HomeTab',
                    index: 0,
                    routes: [
                        { key: 'Home', routeName: 'Home', },
                        { key: 'Record', routeName: 'Record', },
                        { key: 'Mine', routeName: 'Mine', },
                    ],
                },
            ],
        };
        return initialNavState;
    }
    return defaultGetStateForAction(action, state);
};


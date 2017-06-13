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
import SettingScreen from './screen/mine/SettingScreen.js'
import MyProfileScreen from './screen/mine/MyProfileScreen.js'
import AccountSecurityScreen from './screen/mine/AccountSecurityScreen.js'
import ChangePasswordScreen from './screen/mine/ChangePasswordScreen.js'
import ChangeEmailScreen from './screen/mine/ChangeEmailScreen.js'
import ChangeNicknameScreen from './screen/mine/ChangeNicknameScreen.js'
import LoginScreen from './screen/login/LoginScreen.js'
import SignUpScreen from './screen/login/SignUpScreen.js'
import LauncherScreen from './screen/launcher/LauncherScreen.js'
import DreamDetailScreen from './screen/detail/DreamDetailScreen.js'
import AddRecordScreen from './screen/record/AddRecordScreen.js'
import UserDreamsScreen from './screen/userDreams/UserDreamsScreen.js'
import MyUpDreamsScreen from './screen/mine/MyUpDreamsScreen.js'
import AboutScreen from './screen/mine/AboutScreen.js'

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
            headerBackTitle: null,
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
    UserDreams: {
        screen: UserDreamsScreen,

    },
    MyUpDreams: {
        screen: MyUpDreamsScreen,

    },
    Setting: {
        screen: SettingScreen,
        navigationOptions: {
            headerBackTitle: null,
            headerTintColor: '#ffffff',
            showIcon: true,
            title: '设置',
            headerStyle:{
                backgroundColor: '#0067ba',
            },
            headerTitleStyle:{
                color: '#ffffff',
            }
        },
    },

    About: {
        screen: AboutScreen,

    },
    MyProfile: {
        screen: MyProfileScreen,
        navigationOptions: {
            headerBackTitle: null,
            headerTintColor: '#ffffff',
            showIcon: true,
            title: '个人信息',
            headerStyle:{
                backgroundColor: '#0067ba',
            },
            headerTitleStyle:{
                color: '#ffffff',
            }
        },
    },
    AccountSecurity: {
        screen: AccountSecurityScreen,
        navigationOptions: {
            headerBackTitle: null,
            headerTintColor: '#ffffff',
            showIcon: true,
            title: '账号与安全',
            headerStyle:{
                backgroundColor: '#0067ba',
            },
            headerTitleStyle:{
                color: '#ffffff',
            }
        },
    },
    ChangePassword: {
        screen: ChangePasswordScreen,
        navigationOptions: {
            headerBackTitle: null,
            headerTintColor: '#ffffff',
            showIcon: true,
            title: '修改密码',
            headerStyle:{
                backgroundColor: '#0067ba',
            },
            headerTitleStyle:{
                color: '#ffffff',
            }
        },
    },
    ChangeEmail: {
        screen: ChangeEmailScreen,
        navigationOptions: {
            headerBackTitle: null,
            headerTintColor: '#ffffff',
            showIcon: true,
            title: '修改邮箱',
            headerStyle:{
                backgroundColor: '#0067ba',
            },
            headerTitleStyle:{
                color: '#ffffff',
            }
        },
    },
    ChangeNickname: {
        screen: ChangeNicknameScreen,
        navigationOptions: {
            headerBackTitle: null,
            headerTintColor: '#ffffff',
            showIcon: true,
            title: '修改昵称',
            headerStyle:{
                backgroundColor: '#0067ba',
            },
            headerTitleStyle:{
                color: '#ffffff',
            }
        },
    },
    AddRecord: {
        screen: AddRecordScreen,
    },

});

const defaultGetStateForAction = MyStack.router.getStateForAction;

MyStack.router.getStateForAction = (action, state) => {
    //闪屏页面过去以后要从routes中删掉，只保留Login页面
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
    //登录页面过去以后要从routes中删掉，只保留HomeTab页面
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


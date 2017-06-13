/**
 * Dream Factory
 * https://github.com/fatsoon/dreamfactory-rn
 * Created by fanshuo on 2017/6/13.
 */
import React, { Component } from 'react';

import {
    StyleSheet,
    Button,
    Image,
    View
} from 'react-native';
import HomeDreamList from '../home/HomeDreamList.js'

export default class MyUpDreamsScreen extends React.Component{

    componentDidMount() {

    }

    static navigationOptions = ({navigation}) =>{
        const {params = {}} = navigation.state;
        return {
            headerBackTitle: null,
            headerTintColor: '#ffffff',
            showIcon: true,
            title: '我的赞',
            headerStyle:{
                backgroundColor: '#0067ba',
            },
            headerTitleStyle:{
                color: '#ffffff',
            },
        };
    };



    render() {
        return (
            <HomeDreamList
                type="my_up"
                navigation={this.props.navigation}
            />
        );
    }

}

const styles = StyleSheet.create({

});
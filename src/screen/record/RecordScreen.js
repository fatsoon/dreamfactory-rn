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
import HomeDreamList from '../home/HomeDreamList.js'
import DFNavigationItem from '../../view/DFNavigationItem.js'

export default class RecordScreen extends React.Component{

    componentDidMount() {

    }

    static navigationOptions = ({ navigation }) => {
        const {state, setParams} = navigation;

        return {
            tabBarLabel: '记录',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={require('../../img/df_tabbar_record.png')}
                    style={[CommonStyle.tabbarIcon, {tintColor: tintColor}]}
                />
            ),
            title: '记录',
            headerRight: (
                <DFNavigationItem
                    onPress={()=>{navigation.navigate('AddRecord')}}
                    title="记梦"
                />
            ),
            headerStyle: {
                backgroundColor: '#0067ba',
            },
            headerTitleStyle: {
                color: '#ffffff',
                fontSize: 16,
            }
        }
    };



    render() {
        return (
            <HomeDreamList
                type="my"
                navigation={this.props.navigation}
            />
        );
    }

}

const styles = StyleSheet.create({

});
/**
 * Dream Factory
 * https://github.com/fatsoon/dreamfactory-rn
 * Created by fanshuo on 2017/6/7.
 */

import React, {Component, PropTypes} from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Image,
    TextInput,
    Alert,
    Button,
    KeyboardAvoidingView,
    Modal,
    TouchableWithoutFeedback,
    Keyboard,
    AsyncStorage,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";

import NetUtil from '../../util/NetUtil.js'
import DFNavigationItem from '../../view/DFNavigationItem.js'

export default class AddRecordScreen extends Component{

    static navigationOptions = {
        headerBackTitle: null,
        headerTintColor: '#ffffff',
        showIcon: true,
        title: '记梦',
        headerStyle:{
            backgroundColor: '#0067ba',
        },
        headerTitleStyle:{
            color: '#ffffff',
        },
        headerRight: (
            <DFNavigationItem
                onPress={()=>{}}
                title="发布"
            />
        ),
    };

    constructor(props){
        super(props);
        this.state = {
            user:{},
            content:'',
        };
    }

    componentDidMount() {
        AsyncStorage.getItem("user", (error, result)=>{
            let user = JSON.parse(result);
            this.setState({
                user:user,
            });
        });
    }

    render() {
        return (

            <View
                style={styles.contentView}
            >
                <KeyboardAvoidingView
                    behavior='height'
                >
                <TextInput
                    style={styles.input}
                    placeholder='请输入内容'
                    placeholderTextColor="#c7c7cd"
                    onChangeText={(text) => this.setState({content:text})}
                    multiline={true}
                />
                </KeyboardAvoidingView>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    contentView:{
        flex:1,
        backgroundColor:'#ffffff',
        flexDirection:'column'
    },

    input:{
        height:200,
        margin: 10,
        fontSize: 15,
    }
});

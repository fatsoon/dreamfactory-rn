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
import LoadingView from '../../view/LoadingView.js'

export default class AddRecordScreen extends Component{

    static navigationOptions = ({navigation}) =>{
        const {params = {}} = navigation.state;
        return {
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
                    onPress={()=>params.headerRightButtonClicked()}
                    title="发布"
                />
            ),
        };
    };

    constructor(props){
        super(props);
        this.state = {
            user:{},
            content:'',
            modalVisible:false,
        };
    }

    componentDidMount() {
        AsyncStorage.getItem("user", (error, result)=>{
            let user = JSON.parse(result);
            this.setState({
                user:user,
            });
        });
        this.props.navigation.setParams({
            headerRightButtonClicked: this._headerRightButtonClicked.bind(this),
        });
    }

    _headerRightButtonClicked(){
        if(!this.state.content){
            Alert.alert("提示","内容不能为空");
            return;
        }
        this.setState({
            modalVisible:true,
        });
        NetUtil.add_dream(this.state.user.uid, this.state.content, this._addDreamCallBack.bind(this));
    }

    _addDreamCallBack(json){
        // this.setState({
        //     modalVisible:false,
        // });
        if(json.code == 0){
            Alert.alert("提示",
                "发布成功",
                [
                    {text: '确定', onPress: () => {
                            this.setState({
                                modalVisible:false,
                            });
                            this.props.navigation.goBack();
                        }
                    },
                ]
            );
        }
        else{
            Alert.alert("提示",json.message,[
                {text: '确定', onPress: () => {
                    this.setState({
                        modalVisible:false,
                    });
                }
                },
            ])
        }
    }

    render() {
        return (

            <View
                style={styles.contentView}
            >
                <KeyboardAvoidingView
                    behavior='position'
                >
                <TextInput
                    style={styles.input}
                    placeholder='请输入内容'
                    placeholderTextColor="#c7c7cd"
                    onChangeText={(text) => this.setState({content:text})}
                    multiline={true}
                    autoFocus={true}
                />
                </KeyboardAvoidingView>
                <LoadingView
                    modalVisible={this.state.modalVisible}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    contentView:{
        flex:1,
        backgroundColor:'#ffffff',
    },
    input:{
        height:300,
        margin: 10,
        fontSize: 15,
    }
});

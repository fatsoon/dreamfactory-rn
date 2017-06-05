/**
 * Dream Factory
 * https://github.com/fatsoon/dreamfactory-rn
 * Created by fanshuo on 2017/6/2.
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
    FlatList,
    Button,
    KeyboardAvoidingView,
    Modal,
    TouchableWithoutFeedback,
    Keyboard,
    AsyncStorage,
    ActivityIndicator,
    TouchableOpacity
} from "react-native";

import RadiusButton from '../../view/RadiusButton.js';
import NetUtil from '../../util/NetUtil.js'

export default class ChangeEmailScreen extends Component{

    static propTypes = {
    };

    static defaultProps = {
    };

    constructor(props){
        super(props);
        this.state = {
            user:{},
            oldPasswd:'',
            newPasswd:'',
            repeatPasswd:'',
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
                <View
                    style={styles.blank}
                />
                <View
                    style={styles.row}
                >
                    <TextInput
                        style={styles.input}
                        placeholder='请输入新邮箱'
                        placeholderTextColor="#c7c7cd"
                        secureTextEntry = {true}
                        onChangeText={(text) => this.setState({repeatPasswd:text})}
                    />
                </View>

                <RadiusButton
                    btnName= '确定'
                    textStyle= {{
                        fontSize: 16,
                        color: '#ffffff',
                    }}
                    btnStyle= {{
                        flex:1,
                        height: 44,
                        borderRadius: 4,
                        marginLeft:10,
                        marginRight:10,
                        marginTop: 30,
                    }}
                    underlayColor= '#064477'
                    onPress={this._onButtonClick.bind(this)} >
                </RadiusButton>

            </View>
        );
    }

    _onButtonClick(){
        NetUtil.update_password(this.state.user.uid,this.state.oldPasswd, this.state.newPasswd, this._updatePasswordCallBack.bind(this));
    }

    _updatePasswordCallBack(json){
        if(json.code == 0){
            Alert.alert("提示",
                json.message,
                [
                    {text: '确定', onPress: () => this.props.navigation.goBack()},
                ]
            )
        }
        else{
            Alert.alert("提示",json.message)
        }
    }

}

const styles = StyleSheet.create({
    contentView:{
        flex:1,
        backgroundColor:'#efeff4',
    },
    blank:{
        height:10,
    },
    row:{
        flexDirection: 'column',
        height:50,
        backgroundColor:'#ffffff',
    },
    line:{
        height: 1,
        backgroundColor: '#dddddd',
        marginLeft:15,
    },
    input:{
        flex:1,
        marginLeft: 15,
        marginRight:15,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 15,
    }
});
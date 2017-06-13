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
    TouchableOpacity,
} from "react-native";

import OptionListItemWithoutImage from '../../view/OptionListItemWithoutImage.js'
import OptionListItemRightText from '../../view/OptionListItemRightText.js'

export default class AccountSecurityScreen extends Component{

    static propTypes = {
    };

    static defaultProps = {
    };

    constructor(props){
        super(props);
        this.state = {
            user:{},
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

    componentWillUpdate(){
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

                <OptionListItemWithoutImage
                    text="修改密码"
                    onItemClick={()=>this.props.navigation.navigate('ChangePassword')}
                    showLine={true}
                    showBorderTop={true}
                    showBorderBottom={false}
                />
                <OptionListItemRightText
                    text="手机号"
                    rightText={this.state.user.phone}
                    onItemClick={()=>{}}
                    showLine={true}
                    showBorderTop={false}
                    showBorderBottom={false}
                    showArrow={false}
                />
                <OptionListItemRightText
                    text="邮箱"
                    rightText={this.state.user.email?this.state.user.email:'未填写'}
                    onItemClick={()=>this.props.navigation.navigate('ChangeEmail')}
                    showLine={false}
                    showBorderTop={false}
                    showBorderBottom={true}
                />


            </View>
        );
    }

    _onMyProfileClicked(){
        alert('aaa');
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
});
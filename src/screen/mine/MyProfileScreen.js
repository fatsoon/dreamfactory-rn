/**
 * Dream Factory
 * https://github.com/fatsoon/dreamfactory-rn
 * Created by fanshuo on 2017/5/24.
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

import OptionListItemWithoutImage from '../../view/OptionListItemWithoutImage.js'
import OptionListItemButton from '../../view/OptionListItemButton.js'
import OptionListItemRightText from '../../view/OptionListItemRightText.js'

export default class MyProfileScreen extends Component{

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

                <TouchableHighlight
                    underlayColor='#d9d9d9'
                    activeOpacity={1.0}
                    style={[avatarStyles.touchableItem]}
                    onPress={()=>{}}>
                    <View>
                        <View
                            style={[avatarStyles.row,avatarStyles.borderTop]}
                        >
                            <Text
                                style={avatarStyles.text}
                            >
                                头像
                            </Text>
                            <Image style={avatarStyles.avatar} source={{uri: this.state.user.avatar}} />

                            <Image style={avatarStyles.arrow} source={require('../../img/ic_arrow_right.png')}/>

                        </View>

                        <View style={avatarStyles.line} />

                    </View>
                </TouchableHighlight>

                <OptionListItemRightText
                    text="昵称"
                    rightText={this.state.user.nickname}
                    onItemClick={()=>this.props.navigation.navigate('ChangeNickname')}
                    showLine={false}
                    showBorderBottom={true}
                />

            </View>
        );
    }

    _onMyProfileClicked(){

    }

}

const avatarStyles = StyleSheet.create({
    touchableItem:{
        backgroundColor:'#ffffff',
    },
    borderTop:{
        borderTopWidth:0.5,
        borderTopColor:'#d9d9d9',
    },
    borderBottom:{
        borderBottomWidth:0.5,
        borderBottomColor:'#d9d9d9',
    },
    row:{
        flexDirection: 'row',
        alignItems: 'center',
        height:80,
        paddingLeft: 14,
        paddingRight:14,
    },
    line:{
        height: 0.5,
        backgroundColor: '#d9d9d9',
        marginLeft: 15,
        marginRight: 0,
    },
    text:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 15,
    },
    avatar:{
        width:50,
        height:50,
        borderRadius: 25,
    },
    rightText:{
        fontSize: 15,
        color:'#888888',
    },

    arrow:{
        width:14,
        height:14,
        marginLeft:14,
    },
});

const styles = StyleSheet.create({
    contentView:{
        flex:1,
        backgroundColor:'#efeff4',
    },
    blank:{
        height:10,
    },
});
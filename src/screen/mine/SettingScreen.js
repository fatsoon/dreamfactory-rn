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

export default class SettingScreen extends Component{

    static propTypes = {
    };

    static defaultProps = {
    };

    constructor(props){
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
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
                    text="账号与安全"
                    onItemClick={()=>this.props.navigation.navigate('AccountSecurity')}
                    showLine={false}
                    showBorderTop={true}
                    showBorderBottom={true}
                />
                <View
                    style={styles.blank}

                />

                <OptionListItemWithoutImage
                    text="关于"
                    onItemClick={()=>this.props.navigation.navigate('About')}
                    showLine={true}
                    showBorderTop={true}
                />
                <OptionListItemWithoutImage
                    text="去评分"
                    onItemClick={this._onMyProfileClicked.bind(this)}
                    showLine={false}
                    showBorderBottom={true}
                />
                <View
                    style={styles.blank}

                />

                <OptionListItemButton
                    text="退出登录"
                    onItemClick={this._onMyProfileClicked.bind(this)}
                    showLine={false}
                    showBorderTop={true}
                    showBorderBottom={true}
                />

            </View>
        );
    }

    _onMyProfileClicked(){

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
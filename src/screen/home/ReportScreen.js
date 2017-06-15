/**
 * Dream Factory
 * https://github.com/fatsoon/dreamfactory-rn
 * Created by fanshuo on 2017/6/15.
 */

import React, {Component, PropTypes} from "react";
import {
    StyleSheet,
    View,
    Alert,
    AsyncStorage,
} from "react-native";

import OptionListItemRightText from '../../view/OptionListItemRightText.js'
import NetUtil from '../../util/NetUtil.js'

export default class ReportScreen extends Component{

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

    }

    render() {
        return (
            <View
                style={styles.contentView}
            >
                <View
                    style={styles.blank}
                />

                <OptionListItemRightText
                    text="广告或骚扰"
                    onItemClick={()=>{this._report(0)}}
                    showLine={true}
                    showBorderTop={true}
                    showBorderBottom={false}
                    showArrow={false}
                />
                <OptionListItemRightText
                    text="该内容与主题无关"
                    onItemClick={()=>{this._report(1)}}
                    showLine={false}
                    showBorderTop={false}
                    showBorderBottom={true}
                    showArrow={false}
                />
            </View>
        );
    }

    _report(type){
        NetUtil.report(this.props.navigation.state.params.dream.dream.did, this.props.navigation.state.params.dream.dream.uid, this.state.user.uid, type,this._reportCallBack.bind(this));
        Alert.alert('提示',
            '举报成功',
            [
                {text: '确定', onPress: () => this.props.navigation.goBack()},
            ]
        );
    }
    _reportCallBack(data){
        console.log(data)
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
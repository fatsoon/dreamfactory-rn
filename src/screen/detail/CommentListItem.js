/**
 * Dream Factory
 * https://github.com/fatsoon/dreamfactory-rn
 * Created by fanshuo on 2017/5/21.
 */


import React, {
    Component,
    PropTypes,
} from 'react';

import {
    StyleSheet,
    PixelRatio,
    Text,
    View,
    TouchableHighlight,
    Platform,
    Image,
    TextInput,
    Picker,
    Modal
} from 'react-native';

import DateUtil from '../../util/DateUtil.js'
import MoreListModal from '../../view/MoreListModal.js'

export default class CommentListItem extends Component{
    static propTypes = {
        comment: PropTypes.object,
    };

    static defaultProps = {
        comment: null,
    };

    constructor(props){
        super(props);
        this.state = {
        };
    }


    render() {
        return (
            <View>
                <View
                    style = {styles.contentView}>
                    <View
                        style = {styles.left}
                    >
                        <Image style={styles.avatar} source={this.props.comment.user_avatar?{uri: this.props.comment.user_avatar}:require("../../img/ic_launcher.png")} />

                    </View>
                    <View
                        style = {styles.right}
                    >
                        <View style = {styles.top}>
                            <Text
                                style={styles.nickname}
                            >
                                {this.props.comment.user_name}
                            </Text>

                            <Text
                                style={styles.time}
                            >
                                {DateUtil.fomartDate(this.props.comment.create_time_long)}
                            </Text>
                        </View>
                        <Text
                            style={styles.content}
                        >
                            {this.props.comment.content}
                        </Text>
                    </View>

                </View>
                <View
                    style={styles.line}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({

    contentView:{
        flexDirection: 'row',
        padding:12,
        backgroundColor:"#F5F5F5",
    },
    left:{

    },
    right:{
        flex:1,
        marginLeft:12,
    },
    top:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    nickname:{
        color: '#333333',
        fontSize: 14,
    },
    time:{
        color: '#999999',
        fontSize: 12,
        marginLeft:12,
    },
    avatar:{
        height:40,
        width:40,
        borderRadius: 20,
    },
    content:{
        color: '#333333',
        fontSize: 13,
        marginTop:12,
        lineHeight: 20,
    },
    line:{
        height: 1,
        backgroundColor: '#dddddd',
        marginLeft: 10,
        marginRight: 10,
    },
});
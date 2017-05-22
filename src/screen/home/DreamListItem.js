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
    TextInput
} from 'react-native';

import DateUtil from '../../util/DateUtil.js'

export default class InputRow extends Component{
    static propTypes = {
        dream: PropTypes.object,
    };

    static defaultProps = {
        dream: null,
    };


    render() {
        return (
            <View style = {styles.contentView}>
                <View style = {styles.top}>
                    <Image style={styles.avatar} source={this.props.dream.user_avatar?{uri: this.props.dream.user_avatar}:require("../../img/ic_launcher.png")} />
                    <View style = {styles.topRight}>
                        <Text
                            style={styles.nickname}
                        >
                            {this.props.dream.username}
                        </Text>

                        <Text
                            style={styles.time}
                        >
                            {DateUtil.timeAgo(this.props.dream.dream.create_time_long)}
                        </Text>

                    </View>

                </View>
                <Text
                    style={styles.content}
                    numberOfLines={10}
                >
                    {this.props.dream.dream.content}
                </Text>
                <View style = {styles.bottom}>

                    <TouchableHighlight
                        underlayColor='#cacaca'
                        activeOpacity={0.5}
                        style={styles.roundButton}
                        onPress={this._onUpPress.bind(this)}>
                        <Text
                            style={styles.up}
                        >
                            赞
                        </Text>
                    </TouchableHighlight>

                    <Text
                        style={styles.bottomText}
                    >
                        {this.props.dream.dream.up_num}
                    </Text>


                    <TouchableHighlight
                        underlayColor='#cacaca'
                        activeOpacity={0.5}
                        style={styles.roundButton}
                        onPress={this._onUpPress.bind(this)}>
                        <Image style={styles.comment} source={require('../../img/ic_comment_24dp.png')} />
                    </TouchableHighlight>

                    <Text
                        style={styles.bottomText}
                    >
                        {this.props.dream.comment_num}
                    </Text>

                </View>

            </View>
        );
    }

    _onUpPress(){

    }

}

const styles = StyleSheet.create({
    contentView:{
        padding:12,
        backgroundColor:"#ffffff",
    },
    top:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    topRight:{
        marginLeft:12,
        marginRight:12,
    },
    nickname:{
        color: '#333333',
        fontSize: 15,
    },
    time:{
        color: '#999999',
        fontSize: 12,
        marginTop: 10,
    },
    avatar:{
        height:40,
        width:40,
        borderRadius: 20,
    },
    content:{
        color: '#333333',
        fontSize: 15,
        marginTop:12,
        lineHeight: 20,
    },
    bottom:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop:12,
    },
    roundButton:{
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#EEEEEE',
        alignItems: 'center',
        justifyContent: 'center',
    },
    up:{

    },
    comment:{
        width:24,
        height:24,
    },
    bottomText:{
        marginLeft: 10,
    },



    row:{
        flexDirection: 'row',
        alignItems: 'center',
        height:50,
        backgroundColor:'#ffffff',
        paddingLeft: 10,
        paddingRight:10,
    },
    line:{
        height: 1,
        backgroundColor: '#dddddd',
        marginLeft: 10,
        marginRight: 10,
    },
    icon:{
        width:20,
        height:20,
    },
    input:{
        flex:1,
        marginLeft: 5,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 15,
    }
});
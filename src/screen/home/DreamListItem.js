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
                            5小时前
                        </Text>

                    </View>

                </View>
                <Text
                    style={styles.content}
                >
                    {this.props.dream.dream.content}
                </Text>
                <View style = {styles.bottom}>
                    <Text
                        style={styles.up}
                    >
                        {"赞"+this.props.dream.dream.up_num}
                    </Text>

                    <Text
                        style={styles.up}
                    >
                        {"评论"+this.props.dream.comment_num}
                    </Text>

                </View>

            </View>
        );
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
    avatar:{
        height:40,
        width:40,
    },
    content:{
        marginTop:12,
    },
    bottom:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop:12,
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
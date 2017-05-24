/**
 * Dream Factory
 * https://github.com/fatsoon/dreamfactory-rn
 * Created by fanshuo on 2017/5/24.
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
} from 'react-native';

import DateUtil from '../../util/DateUtil.js'

export default class DreamDetailScreen extends Component{

    static propTypes = {
        dream: PropTypes.object,
    };

    static defaultProps = {
        dream: null,
    };

    constructor(props){
        super(props);
        this.state = {
        };
    }


    render() {
        return (
            <View style = {styles.contentView}>
                <View style = {styles.top}>
                    <Image style={styles.avatar} source={this.props.navigation.state.params.dream.user_avatar?{uri: this.props.navigation.state.params.dream.user_avatar}:require("../../img/ic_launcher.png")} />
                    <View style = {styles.topRight}>
                        <Text
                            style={styles.nickname}
                        >
                            {this.props.navigation.state.params.dream.username}
                        </Text>

                        <Text
                            style={styles.time}
                        >
                            {DateUtil.timeAgo(this.props.navigation.state.params.dream.dream.create_time_long)}
                        </Text>

                    </View>

                </View>
                <Text
                    style={styles.content}
                >
                    {this.props.navigation.state.params.dream.dream.content}
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
                        {this.props.navigation.state.params.dream.dream.up_num}
                    </Text>

                </View>

            </View>
        );
    }

    _onUpPress(){
        alert('up');
    }

}

const styles = StyleSheet.create({
    contentView: {
        padding: 12,
        backgroundColor: "#ffffff",
    },
    top: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    topRight: {
        marginLeft: 12,
        marginRight: 12,
    },
    nickname: {
        color: '#333333',
        fontSize: 15,
    },
    time: {
        color: '#999999',
        fontSize: 12,
        marginTop: 10,
    },
    avatar: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
    content: {
        color: '#333333',
        fontSize: 15,
        marginTop: 18,
        marginBottom: 18,
        lineHeight: 20,
    },
    bottom: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    roundButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#EEEEEE',
        alignItems: 'center',
        justifyContent: 'center',
    },
    roundButtonImage: {
        width: 24,
        height: 24,
    },
    up: {
        color: '#000000',
    },
    moreButtonView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    bottomText: {
        marginLeft: 10,
    },

});
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

export default class InputRow extends Component{
    static propTypes = {
        dream: PropTypes.object,
    };

    static defaultProps = {
        dream: null,
    };

    constructor(props){
        super(props);
        this.state = {
            language: 'Java',
            modalVisible: false,
        };
    }


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
                        style={[styles.roundButton, styles.commentButton]}
                        onPress={this._onCommentPress.bind(this)}>
                        <Image style={styles.roundButtonImage} source={require('../../img/ic_comment_24dp.png')} />
                    </TouchableHighlight>

                    <Text
                        style={styles.bottomText}
                    >
                        {this.props.dream.comment_num}
                    </Text>

                    <View
                        style={styles.moreButtonView}
                    >
                        <TouchableHighlight
                            underlayColor='#cacaca'
                            activeOpacity={0.5}
                            style={[styles.roundButton, styles.moreButton]}
                            onPress={this._onMorePress.bind(this)}>
                            <Image style={styles.roundButtonImage} source={require('../../img/ic_more_24dp.png')} />
                        </TouchableHighlight>
                    </View>

                </View>

                <MoreListModal
                    dataSource={[{name:'复制',key:'copy'},{name:'分享',key:'share'},{name:'举报',key:'report'}]}
                    modalVisible={this.state.modalVisible}
                    onItemClick={this._onMoreModalItemClick.bind(this)}
                    dismissModal={()=>this._setModalVisible(false)}
                />

            </View>
        );
    }

    _onUpPress(){
        alert('up');
    }

    _onCommentPress(){
        alert('comment');
    }

    _onMorePress(){
        this._setModalVisible(true);
    }

    _setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }
    _onMoreModalItemClick(key){
        if(key === 'copy'){
            alert('复制');
        }
        else if(key === 'share'){
            alert('分享');
        }
        else if(key === 'report'){
            alert('举报');
        }

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
        marginTop:18,
        marginBottom:18,
        lineHeight: 20,
    },
    bottom:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    roundButton:{
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#EEEEEE',
        alignItems: 'center',
        justifyContent: 'center',
    },
    roundButtonImage:{
        width:24,
        height:24,
    },
    commentButton:{
        marginLeft: 18,
    },
    up:{
        color:'#000000',
    },
    moreButtonView:{
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    bottomText:{
        marginLeft: 10,
    },
    modalView:{
        flex:1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },


});
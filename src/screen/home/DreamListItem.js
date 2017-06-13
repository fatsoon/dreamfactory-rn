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
    Modal,
    AsyncStorage
} from 'react-native';

import DateUtil from '../../util/DateUtil.js'
import NetUtil from '../../util/NetUtil.js'
import MoreListModal from '../../view/MoreListModal.js'


export default class DreamListItem extends Component{
    static propTypes = {
        dream: PropTypes.object,
    };

    static defaultProps = {
        dream: null,
    };

    constructor(props){
        super(props);
        this.state = {
            modalVisible: false,
            hasUp:props.dream.has_up,
            upNumber:props.dream.dream.up_num,
        };
    }

    componentDidMount() {
        AsyncStorage.getItem("user", (error, result)=>{
            this.user = JSON.parse(result);
        });
    }

    render() {
        return (
            <View>
                <TouchableHighlight
                    underlayColor='#E5E5E5'
                    style = {styles.contentView}
                    activeOpacity={1.0}
                    onPress={this._onItemPress.bind(this)}>
                    <View>
                        <View style = {styles.top}>
                            <TouchableHighlight
                                activeOpacity={0.5}
                                style={styles.avatar}
                                onPress={this._onAvatarPress.bind(this)}>
                                <Image style={styles.avatar} source={this.props.dream.user_avatar?{uri: this.props.dream.user_avatar}:require("../../img/ic_avatar_default.jpg")} />
                            </TouchableHighlight>
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
                                underlayColor={this.state.hasUp==0?'#cacaca':'#e34346'}
                                activeOpacity={1.0}
                                style={this.state.hasUp==0?styles.roundButton:styles.roundButtonHasUp}
                                onPress={this._onUpPress.bind(this)}>
                                <Text
                                    style={this.state.hasUp==0?styles.up:styles.hasUp}
                                >
                                    赞
                                </Text>
                            </TouchableHighlight>

                            <Text
                                style={styles.bottomText}
                            >
                                {this.state.upNumber}
                            </Text>


                            <TouchableHighlight
                                underlayColor='#cacaca'
                                activeOpacity={1.0}
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
                                    activeOpacity={1.0}
                                    style={[styles.roundButton, styles.moreButton]}
                                    onPress={this._onMorePress.bind(this)}>
                                    <Image style={styles.roundButtonImage} source={require('../../img/ic_more_24dp.png')} />
                                </TouchableHighlight>
                            </View>

                        </View>
                    </View>
                </TouchableHighlight>
                <MoreListModal
                    dataSource={[{name:'复制',key:'copy'},{name:'分享',key:'share'},{name:'举报',key:'report'}]}
                    modalVisible={this.state.modalVisible}
                    onItemClick={this._onMoreModalItemClick.bind(this)}
                    dismissModal={()=>this._setModalVisible(false)}
                />
            </View>
        );
    }

    _onItemPress(){
        this.props.navigation.navigate('DreamDetail',{dream:this.props.dream});
    }

    _onAvatarPress(){
        this.props.navigation.navigate('UserDreams',{userId:this.props.dream.uid});
    }

    _onUpPress(){
        if(this.state.hasUp == 0){
            NetUtil.up_dream(this.user.uid, this.props.dream.dream.did, ()=>{});
            //优先用户体验，此处应当不考虑返回结果，立即更新状态
            this.setState({
                hasUp:1,
                upNumber:this.state.upNumber+1,
            });
        }
        else{
            NetUtil.cancel_up_dream(this.user.uid, this.props.dream.dream.did, ()=>{});
            //优先用户体验，此处应当不考虑返回结果，立即更新状态
            this.setState({
                hasUp:0,
                upNumber:this.state.upNumber-1,
            });
        }
    }

    _onCommentPress(){
        this.props.navigation.navigate('DreamDetail',{dream:this.props.dream});
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
    roundButtonHasUp: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#fc4a4e',
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
    hasUp: {
        color: '#ffffff',
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
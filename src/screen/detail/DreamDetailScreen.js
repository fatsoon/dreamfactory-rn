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
} from 'react-native';

import DateUtil from '../../util/DateUtil.js'
import CommentListItem from './CommentListItem.js'
import NetUtil from '../../util/NetUtil.js'

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
            commentDataSource:[],
            modalVisible:false,
            disabledSendButton:true,
            comment:'',
            sendingComment:false,
        };
    }

    componentDidMount() {
        this._getComments();
    }


    render() {
        return (
            <View
                style={mainStyles.contentView}
            >
                <FlatList
                    style={mainStyles.commentListView}
                    data={this.state.commentDataSource}
                    renderItem={({item}) => this._commentsRenderItem(item)}
                    keyExtractor={(item, index) => item.cid}
                    ListHeaderComponent={this._renderHeader}
                />
                <View
                    style={{backgroundColor:'#0067ba',height:2}}

                />
                <View
                    style={mainStyles.bottomInputView}
                >

                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={()=>this.setState({modalVisible:true, disabledSendButton:true})}
                    >
                        <View
                            style={{
                                height:30,
                                borderWidth:1,
                                borderColor:'#cecece',
                                borderRadius:15,
                                marginLeft:15,
                                marginRight:15,
                                justifyContent:'center',
                                paddingLeft:10,
                                paddingRight:10,
                            }}
                        >
                            <Text
                                style={{
                                    color:'#a5a5a5'
                                }}

                            >写评论</Text>

                        </View>


                    </TouchableOpacity>


                </View>
                <Modal
                    animationType='fade'
                    transparent={true}
                    visible={this.state.modalVisible}
                >
                    <View
                        style={{
                            flex:1,
                            justifyContent: 'flex-end',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        }}
                    >
                        <TouchableWithoutFeedback
                            onPress={()=>this.setState({modalVisible:false})}
                        >
                            <View
                                style={{flex:1}}
                            />
                        </TouchableWithoutFeedback>
                        <KeyboardAvoidingView
                            behavior='position'
                        >
                            <View
                                style={{backgroundColor:'#efefef'}}
                            >
                                <View
                                    style={{flexDirection:'row',height:50,alignItems:'center'}}
                                >
                                    <Button
                                        color="#000000"
                                        title="取消"
                                        onPress={()=>this.setState({modalVisible:false})}
                                    />
                                    <View
                                        style={{flex:1,justifyContent:'center',alignItems:'center'}}
                                    >
                                        <Text
                                            style={{fontSize:18,color:'#000000'}}
                                        >写评论</Text>
                                    </View>
                                    {this.state.sendingComment
                                        ?<ActivityIndicator
                                            style={{marginRight:20,}}
                                    />
                                        :<Button
                                        color="#000000"
                                        title="发送"
                                        disabled={this.state.disabledSendButton}
                                        onPress={this._sendComment.bind(this)}
                                    />
                                    }

                                </View>
                                <View
                                    style={mainStyles.inputContainer}
                                >
                                <TextInput
                                    style={mainStyles.input}
                                    onChangeText={this._onChangeText.bind(this)}
                                    placeholderTextColor="#c7c7cd"
                                    multiline={true}
                                    autoFocus={true}
                                />
                                </View>

                            </View>

                        </KeyboardAvoidingView>
                    </View>
                </Modal>
            </View>
        );
    }

    _renderHeader = () => {
        return <DreamDetailHeader
                    dream={this.props.navigation.state.params.dream} />;
    };

    _commentsRenderItem(item){
        return(
            <CommentListItem
                comment={item}
                navigation={this.props.navigation}
            ></CommentListItem>
        );
    }

    _getComments(){
        NetUtil.get_dream_comments(this.props.navigation.state.params.dream.dream.did, this._getCommentsCallBack.bind(this));
    }

    _getCommentsCallBack(json){
        if(json.code == 0){
            this.setState({
                commentDataSource: json.comments,
            });
        }
        else{
            Alert.alert("提示",json.message);
        }
    }

    _onChangeText(text){
        if(!text || text.length == 0){
            this.setState({
                disabledSendButton: true
            });
        }
        else{
            this.setState({
                disabledSendButton: false,
                comment:text,
            });
        }
    }

    _sendComment(){
        this.setState({
            sendingComment:true,
        });
        AsyncStorage.getItem("user", (error, result)=>{
            this.user = JSON.parse(result);
            NetUtil.add_comment(this.user.uid, this.props.navigation.state.params.dream.dream.did, this.state.comment, this._addCommentCallBack.bind(this));
        });
    }

    _addCommentCallBack(json){
        this.setState({
            sendingComment:false,
        });
        if(json.code == 0){
            this.setState({
                modalVisible: false,
            });
            this._getComments();
        }
        else{
            Alert.alert("提示",json.message);
        }
    }

}

class DreamDetailHeader extends Component{

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

    componentDidMount() {
    }


    render() {
        return (
            <View>
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
                    </View>
                </View>
                <View
                    style={styles.line}
                />
            </View>
        );
    }

    _onUpPress(){
        alert('up');
    }
}

const mainStyles = StyleSheet.create({
    contentView:{
        flex:1,
    },
    commentListView: {
        flex:1,
        backgroundColor: '#F5F5F5',
    },
    bottomInputView:{
        height:45,
        backgroundColor:'#fcfcfc',
        justifyContent:'center'
    },
    inputContainer:{
        backgroundColor:'#ffffff',
        borderColor:'#bebebe',
        borderWidth:1,
        padding:4,
        marginLeft:15,
        marginRight:15,
        marginBottom:15,
    },
    input:{
        backgroundColor:'#ffffff',
        height:100,
        fontSize:14,
    },
    submitButton:{

    },
});

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
    bottomText: {
        marginLeft: 10,
    },
    line:{
        height: 1,
        backgroundColor: '#dddddd',
    },
});
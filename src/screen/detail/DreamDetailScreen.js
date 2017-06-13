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
import DateUtil from "../../util/DateUtil.js";
import CommentListItem from "./CommentListItem.js";
import NetUtil from "../../util/NetUtil.js";

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
                            style={mainStyles.bottomInputTextContainer}
                        >
                            <Text
                                style={mainStyles.bottomInputText}

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
                        style={addCommentStyles.contentView}
                    >
                        <TouchableWithoutFeedback
                            onPress={()=>this.setState({modalVisible:false})}
                        >
                            <View
                                style={addCommentStyles.topFillView}
                            />
                        </TouchableWithoutFeedback>
                        <KeyboardAvoidingView
                            behavior='position'
                        >
                            <View
                                style={addCommentStyles.bottomView}
                            >
                                <View
                                    style={addCommentStyles.titleBar}
                                >
                                    <Button
                                        color="#000000"
                                        title="取消"
                                        onPress={()=>this.setState({modalVisible:false})}
                                    />
                                    <View
                                        style={addCommentStyles.titleContainer}
                                    >
                                        <Text
                                            style={addCommentStyles.titleText}
                                        >写评论</Text>
                                    </View>
                                    {this.state.sendingComment
                                        ?<ActivityIndicator
                                            style={addCommentStyles.sendButtonProgressView}
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
                                    style={addCommentStyles.inputContainer}
                                >
                                <TextInput
                                    style={addCommentStyles.input}
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

const addCommentStyles = StyleSheet.create({
    contentView:{
        flex:1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    topFillView:{
        flex:1
    },
    bottomView:{
        backgroundColor:'#efefef'
    },
    titleBar:{
        flexDirection:'row',height:50,alignItems:'center'
    },
    titleContainer:{
        flex:1,justifyContent:'center',alignItems:'center'
    },
    titleText:{
        fontSize:18,color:'#000000'
    },
    sendButtonProgressView:{
        marginRight:20,
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
});

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
            upNumber:props.dream.dream.up_num,
            hasUp:props.dream.has_up,
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
                <View style = {headerStyles.contentView}>
                    <View style = {headerStyles.top}>
                        <Image style={headerStyles.avatar} source={this.props.dream.user_avatar?{uri: this.props.dream.user_avatar}:require("../../img/ic_avatar_default.jpg")} />
                        <View style = {headerStyles.topRight}>
                            <Text
                                style={headerStyles.nickname}
                            >
                                {this.props.dream.username}
                            </Text>

                            <Text
                                style={headerStyles.time}
                            >
                                {DateUtil.timeAgo(this.props.dream.dream.create_time_long)}
                            </Text>

                        </View>

                    </View>
                    <Text
                        style={headerStyles.content}
                    >
                        {this.props.dream.dream.content}
                    </Text>
                    <View style = {headerStyles.bottom}>

                        <TouchableHighlight
                            underlayColor={this.state.hasUp==0?'#cacaca':'#e34346'}
                            activeOpacity={1.0}
                            style={this.state.hasUp==0?headerStyles.roundButton:headerStyles.roundButtonHasUp}
                            onPress={this._onUpPress.bind(this)}>
                            <Text
                                style={this.state.hasUp==0?headerStyles.up:headerStyles.hasUp}
                            >
                                赞
                            </Text>
                        </TouchableHighlight>

                        <Text
                            style={headerStyles.bottomText}
                        >
                            {this.state.upNumber}
                        </Text>
                    </View>
                </View>
                <View
                    style={headerStyles.line}
                />
            </View>
        );
    }

    _onUpPress(){
        if(this.state.hasUp == 0){
            NetUtil.up_dream(this.user.uid, this.props.dream.dream.did, this._upCallBack.bind(this));
            //优先用户体验，此处应当不考虑返回结果，立即更新状态
            this.setState({
                hasUp:1,
                upNumber:this.state.upNumber+1,
            });
        }
        else{
            NetUtil.cancel_up_dream(this.user.uid, this.props.dream.dream.did, this._cancelUpCallBack.bind(this));
            //优先用户体验，此处应当不考虑返回结果，立即更新状态
            this.setState({
                hasUp:0,
                upNumber:this.state.upNumber-1,
            });
        }

    }

    _upCallBack(json){
        //什么都不做，不考虑返回结果
    }
    _cancelUpCallBack(json){
        //什么都不做，不考虑返回结果
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
    bottomInputTextContainer:{
        height:30,
        borderWidth:1,
        borderColor:'#cecece',
        borderRadius:15,
        marginLeft:15,
        marginRight:15,
        justifyContent:'center',
        paddingLeft:10,
        paddingRight:10,
    },
    bottomInputText:{
        color:'#a5a5a5'
    },
});

const headerStyles = StyleSheet.create({
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
    roundButtonHasUp: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#fc4a4e',
        alignItems: 'center',
        justifyContent: 'center',
    },
    up: {
        color: '#000000',
    },
    hasUp: {
        color: '#ffffff',
    },
    bottomText: {
        marginLeft: 10,
    },
    line:{
        height: 1,
        backgroundColor: '#dddddd',
    },
});
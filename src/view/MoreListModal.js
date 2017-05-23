/**
 * Dream Factory
 * https://github.com/fatsoon/dreamfactory-rn
 * Created by fanshuo on 2017/5/23.
 */

import React, {
    Component,
    PropTypes,
} from 'react';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    FlatList,
    Modal,
    TouchableHighlight,
    TouchableWithoutFeedback
} from 'react-native';


class MoreListItem extends Component{

    _onPress(){
        this.props.onPressItem(this.props.item.key);
    }

    render(){
        return(
            <TouchableHighlight
                underlayColor='#cacaca'
                activeOpacity={1.0}
                style={[styles.itemButton]}
                onPress={this._onPress.bind(this)}>
                <Text
                    style={styles.itemText}
                >
                    {this.props.item.name}
                </Text>
            </TouchableHighlight>
        );
    }

}

export default class MoreListModal extends Component{

    static propTypes = {
        modalVisible: PropTypes.bool,
        dismissModal: PropTypes.func,
    };

    static defaultProps = {
        modalVisible: false,
        dataSource: [],
        onItemClick: (key)=>{},
        dismissModal: ()=>{},
    };

    constructor(props){
        super(props);
        this.state = {
            modalVisible: props.modalVisible,
            dataSource: props.dataSource,
        };
    }

    componentDidMount() {


    }
    componentWillUnmount() {

    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        this.setState({
            modalVisible: nextProps.modalVisible,
        });
    }

    _onItemClick(key){
        this.props.onItemClick(key);
    }

    _renderItem(item){
        return (
            <MoreListItem
                item={item}
                onPressItem={this._onItemClick.bind(this)}
            />
        );
    }

    render() {
        return (
            <Modal
                animationType='fade'
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={this.props.dismissModal}
            >
                <View
                    style={styles.modalView}
                >
                    {/*点击空白区域使modal消失*/}
                    <TouchableWithoutFeedback
                        onPress={this.props.dismissModal}
                    >
                        <View
                            style={{flex:1}}
                        />
                    </TouchableWithoutFeedback>
                    <View
                        style={styles.bottomView}
                    >
                        <FlatList
                            style={styles.myListView}
                            data={this.state.dataSource}
                            renderItem={({item}) => this._renderItem(item)}
                            ItemSeparatorComponent={()=><View style={styles.separator}></View>}
                        />

                    </View>
                    <TouchableHighlight
                        underlayColor='#cacaca'
                        activeOpacity={1.0}
                        style={[styles.itemButton, styles.cancelButton]}
                        onPress={this.props.dismissModal}
                    >
                        <Text
                            style={styles.itemText}
                        >
                            取消
                        </Text>
                    </TouchableHighlight>
                </View>
            </Modal>
        );
    }


}


const styles = StyleSheet.create({
    modalView:{
        flex:1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    bottomView:{

    },
    separator:{
        height: 1,
        backgroundColor:'#E5E5E5',
    },
    myListView:{
        maxHeight:300,
        backgroundColor:'#e5e5e5',
    },
    itemButton:{
        backgroundColor:'#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },

    itemText:{
        color:'#000000',
        margin:15,
        fontSize: 16,
    },
    cancelButton:{
        marginTop:10,
    },
});
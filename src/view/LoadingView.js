/**
 * Dream Factory
 * https://github.com/fatsoon/dreamfactory-rn
 * Created by fanshuo on 2017/6/8.
 */

import React, {Component, PropTypes} from "react";
import {
    StyleSheet,
    View,
    Modal,
    ActivityIndicator,
} from 'react-native';

export default class LoadingView extends Component{

    static propTypes = {
        modalVisible: PropTypes.bool,
    };

    static defaultProps = {
        modalVisible: false,
    };

    constructor(props){
        super(props);
        this.state = {
            modalVisible:props.modalVisible,
        };
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            modalVisible: nextProps.modalVisible,
        });
    }

    render(){
        return (
            <Modal
                animationType='fade'
                transparent={true}
                visible={this.state.modalVisible}
            >
                <View
                    style={styles.contentView}
                >
                    <View
                        style={styles.container}
                    >
                        <ActivityIndicator
                            animating={true}
                            size="large"
                            color="#ffffff"
                        />
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    contentView:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container:{
        width:150,
        height:150,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:8,
    },

});
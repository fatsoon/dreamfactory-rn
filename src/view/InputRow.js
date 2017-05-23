/**
 * Created by mac on 2017/5/16.
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
        placeHolder: PropTypes.string,
        iconSource: Image.propTypes.source,
        showLine: PropTypes.bool,
        onChangeText: PropTypes.func,
        secureTextEntry: PropTypes.bool,
        keyboardType: PropTypes.string,
    };

    static defaultProps = {
        showLine: false,
        secureTextEntry: false,
        keyboardType: 'default',
    };


    render() {
        return (
            <View style = {{
                backgroundColor:"#ffffff"}}>
                <View
                    style={styles.row}
                >
                    <Image style={styles.icon} source={this.props.iconSource} />
                    <TextInput
                        style={styles.input}
                        onChangeText={this.props.onChangeText}
                        placeholder={this.props.placeHolder}
                        placeholderTextColor="#c7c7cd"
                        secureTextEntry = {this.props.secureTextEntry}
                        keyboardType={this.props.keyboardType}
                    />
                </View>

                {this.props.showLine?<View style={styles.line} />:null}

            </View>
        );
    }

}

const styles = StyleSheet.create({
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
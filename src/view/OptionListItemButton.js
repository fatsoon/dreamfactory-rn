/**
 * Dream Factory
 * https://github.com/fatsoon/dreamfactory-rn
 * Created by fanshuo on 2017/6/1.
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

export default class OptionListItemButton extends Component{
    static propTypes = {
        showLine: PropTypes.bool,
        onItemClick: PropTypes.func,
        text: PropTypes.string,
        showBorderTop:PropTypes.bool,
        showBorderBottom:PropTypes.bool,
    };

    static defaultProps = {
        showLine: false,
        showBorderTop: false,
        showBorderBottom: false,
    };


    render() {
        return (
            <TouchableHighlight
                underlayColor='#d9d9d9'
                activeOpacity={1.0}
                style={[styles.touchableItem]}
                onPress={this.props.onItemClick}>
                <View>
                    <View
                        style={[styles.row,this.props.showBorderTop?styles.borderTop:null,this.props.showBorderBottom?styles.borderBottom:null]}
                    >
                        <Text
                            style={styles.text}
                        >
                            {this.props.text}
                        </Text>
                    </View>

                    {this.props.showLine?<View style={styles.line} />:null}

                </View>
            </TouchableHighlight>
        );
    }

}

const styles = StyleSheet.create({
    touchableItem:{
        backgroundColor:'#ffffff',
    },
    borderTop:{
        borderTopWidth:0.5,
        borderTopColor:'#d9d9d9',
    },
    borderBottom:{
        borderBottomWidth:0.5,
        borderBottomColor:'#d9d9d9',
    },
    row:{
        flexDirection: 'row',
        alignItems: 'center',
        height:45,
        justifyContent:'center',
    },
    line:{
        height: 0.5,
        backgroundColor: '#d9d9d9',
        marginLeft: 15,
        marginRight: 0,
    },
    text:{
        fontSize: 15,
    },
});
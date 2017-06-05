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

export default class OptionListItemWithoutImage extends Component{
    static propTypes = {
        showLine: PropTypes.bool,
        onItemClick: PropTypes.func,
        text: PropTypes.string,
        rightText: PropTypes.string,
        showBorderTop:PropTypes.bool,
        showBorderBottom:PropTypes.bool,
        showArrow:PropTypes.bool,
    };

    static defaultProps = {
        showLine: false,
        showBorderTop: false,
        showBorderBottom: false,
        showArrow: true,
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
                        <Text
                            style={styles.rightText}
                        >
                            {this.props.rightText}
                        </Text>
                        {this.props.showArrow?<Image style={styles.arrow} source={require('../img/ic_arrow_right.png')} />:null}

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
        paddingLeft: 14,
        paddingRight:14,
    },
    line:{
        height: 0.5,
        backgroundColor: '#d9d9d9',
        marginLeft: 15,
        marginRight: 0,
    },
    text:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 15,
    },
    rightText:{
        fontSize: 15,
        color:'#888888',
    },

    arrow:{
        width:14,
        height:14,
        marginLeft:14,
    },
});
/**
 * Dream Factory
 * https://github.com/fatsoon/dreamfactory-rn
 * Created by fanshuo on 2017/5/16.
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
} from 'react-native';

export default class RadiusButton extends Component{
    static propTypes = {
        btnName: PropTypes.string,
        textStyle: Text.propTypes.style,
        btnStyle: TouchableHighlight.propTypes.style,
        underlayColor:       TouchableHighlight.propTypes.underlayColor,
    };

    static defaultProps = {
        btnName: 'Button',
        underlayColor: '#4169e1',
    };


    render() {
        return (
            <View style = {{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',}}>
                <TouchableHighlight
                    underlayColor={this.props.underlayColor}
                    activeOpacity={0.5}
                    style={[styles.center, styles.btnDefaultStyle, this.props.btnStyle]}
                    onPress={this.props.onPress}>
                    <Text style={[styles.textDefaultStyle, this.props.textStyle]}>{this.props.btnName}</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    center: {
        justifyContent:'center',
        alignItems: 'center',
    },
    btnDefaultStyle: {
        height: 44,
        backgroundColor: '#0067ba',
        borderColor: '#0067ba',
        borderRadius: 4,
        borderWidth: (Platform.OS==='ios' ? 1.0 : 1.5) / PixelRatio.get(),
    },
    textDefaultStyle: {
        fontSize: 16,
        color: '#ffffff',
    },
});
/**
 * Dream Factory
 * https://github.com/fatsoon/dreamfactory-rn
 * Created by fanshuo on 2017/5/15.
 */

import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight,Image,StyleSheet } from 'react-native';

export default class DFNavigationBar extends Component {

    static defaultProps = {
        onBack: PropTypes.func.isRequired,
        title: PropTypes.func.isRequired,
        rightButtonText:PropTypes.func.isRequired,
        onClickedRightButton:PropTypes.func.isRequired,
    };

    _getRightButtonView(){
        if(this.props.rightButtonText == 'none'){
            return (
                <View style={{width: 48, height: 48}}/>
            );
        }
        else{
            return (
                <TouchableHighlight onPress={this.props.onClickedRightButton}>
                    <View
                        style={{width: 48, height: 48,backgroundColor: 'red',justifyContent: 'center', alignItems: 'center'}}
                    >
                        <Text
                            style={{fontSize:16, color:"white"}}>{this.props.rightButtonText}</Text>
                    </View>
                </TouchableHighlight>
            );
        }
    }

    render () {
        return (
            <View style={styles.bar}>
                <TouchableHighlight onPress={this.props.onBack}
                                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                        style={{backgroundColor: 'red', width: 48, height: 48, resizeMode: 'center'}}
                        source={require('../img/df_home_title_btn_back.png')}
                    />
                </TouchableHighlight>
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 16, color: 'white'}}>{this.props.title}</Text>
                </View>
                {this._getRightButtonView()}

            </View>
        )
    }
}

const styles = StyleSheet.create({
    bar: {
        backgroundColor: 'red',
        height: 48,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

});
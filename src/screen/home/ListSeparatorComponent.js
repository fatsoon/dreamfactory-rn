/**
 * Dream Factory
 * https://github.com/fatsoon/dreamfactory-rn
 * Created by fanshuo on 2017/5/18.
 */


import React, {
    Component,
    PropTypes,
} from 'react';

import {
    StyleSheet,
    View,
} from 'react-native';

export default class ListSeparatorComponent extends Component{

    constructor(props){
        super(props);
    }

    componentDidMount() {


    }
    componentWillUnmount() {

    }

    render() {
        return (
            <View style={styles.contentView}>

            </View>
        );
    }

}


const styles = StyleSheet.create({
    contentView: {
        height: 10,
        backgroundColor: '#E5E5E5'
    },
});
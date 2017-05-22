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
    ActivityIndicator,
} from 'react-native';

export default class ListFooterComponent extends Component{

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
                <ActivityIndicator
                    animating={true}
                    size="small"
                />
            </View>
        );
    }

}


const styles = StyleSheet.create({
    contentView: {
        backgroundColor: '#E5E5E5',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
    },

});
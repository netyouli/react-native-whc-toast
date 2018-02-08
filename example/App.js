/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    View,
    TouchableHighlight,
    StyleSheet,
    Text,
} from 'react-native';

import Toast, {Duration, Position} from 'react-native-whc-toast';

export default class App extends Component<{}> {
    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight
                    style={[styles.button, {borderColor: 'red'}]}
                    underlayColor={'#f1f1f1'}
                    onPress={() => {
                        this.refs.toast.showTop('react-native-whc-toast');
                    }}
                >
                    <Text style={styles.text}>toast top</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={[styles.button, {borderColor: 'gray'}]}
                    underlayColor={'#f1f1f1'}
                    onPress={() => {
                        this.refs.toast.showCenter('react-native-whc-toast react-native-whc-toast react-native-whc-toast react-native-whc-toast react-native-whc-toast');
                    }}
                >
                    <Text style={styles.text}>toast center</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={[styles.button, {borderColor: '#13227a'}]}
                    underlayColor={'#f1f1f1'}
                    onPress={() => {
                        this.refs.toast.showBottom('react-native-whc-toast');
                    }}
                >
                    <Text style={styles.text}>toast bottom</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={[styles.button, {borderColor: '#1296db'}]}
                    underlayColor={'#f1f1f1'}
                    onPress={() => {
                        this.refs.customToast.show('react-native-whc-toast');
                    }}
                >
                    <Text style={styles.text}>curstom toast</Text>
                </TouchableHighlight>

                <Toast ref='toast'/>
                <Toast ref='customToast'
                       textStyle={{
                           color: '#fff',
                       }}
                       style = {{
                           backgroundColor: '#1296db',
                       }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding:30,
        paddingTop: 150,
        paddingBottom:150,
    },
    button: {
        height: 50,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#fff',
                                borderRadius: 5,
                                borderWidth:1,
    },
    text: {
        color: '#333',
        fontSize: 18,
    }
});

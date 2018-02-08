
//  Created by WHC on 18/2/1.
//  Copyright © 2017年 WHC. All rights reserved.
//
//  Github <https://github.com/netyouli/react-native-whc-toast>
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.


import React , {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Animated,
    Easing,
    Text,
    ViewPropTypes,
    View,
} from 'react-native';

const notExist = -1;

export const Position = {
    /**显示在顶部**/
    top: 'top',
    /**显示在中间**/
    center: 'center',
    /**显示在底部**/
    bottom: 'bottom',
};
export const Duration = {
    /**显示短周期**/
    short: 1500,
    /**显示长周期**/
    long: 2500,
    /**一直显示**/
    infinite: 0,
};

export default class Toast extends Component {

    static Position = Position;
    static Duration = Duration;

    static propTypes = {
        position: PropTypes.oneOf([
            Position.top,
            Position.center,
            Position.bottom,
        ]),
        style: ViewPropTypes.style,
        textStyle: Text.propTypes.style,
        fadeInDuration: PropTypes.number,
        fadeOutDuration: PropTypes.number,
        duration: PropTypes.number,
        opacity: PropTypes.number,
        positionValue:PropTypes.number,
    };

    static defaultProps = {
        style: {},
        position: Position.bottom,
        textStyle: {},
        fadeInDuration: 300,
        fadeOutDuration: 300,
        duration: Duration.long,
        opacity: 0.9,
        positionValue: 100,
    };


    constructor(props) {
        super(props);
        this.state = {
            message: null,
        };
        this.opacity = new Animated.Value(0);
        this._initVariate();
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    _initVariate = () => {
        this.position = notExist;
        this.duration = notExist;
        this.didShow  = false;
        this.timer && clearTimeout(this.timer);
    };

    _startAnimation = () => {
        this.didShow = true;
        const {
            duration,
            opacity,
            fadeInDuration,
        } = this.props;
        let tmpDuration = duration;
        if (this.duration !== notExist) {
            tmpDuration = this.duration;
        }
        this.opacity.setValue(0);
        Animated.timing(this.opacity, {
            toValue: opacity,
            duration: fadeInDuration,
            easing: Easing.out(Easing.linear),
        }).start(() => {
            if (tmpDuration !== Duration.infinite) {
                this.timer = setTimeout(() => {
                    this.close();
                }, tmpDuration);
            }
        });
    };

    /**
     * 显示toast在指定位置
     * @param message 显示的消息
     * @param duration 显示周期毫秒
     * @param position 显示的位置
     */
    show(message = null, duration = Duration.long, position = Position.bottom) {
        if (this.didShow) {
            this.close(true);
        }
        this.duration = duration;
        this.position = position;
        this.setState((state) => {
            state.message = message;
            return state;
        });
    }

    /**
     * 顶部显示toast
     * @param message 显示的消息
     * @param duration 显示周期毫秒
     */
    showTop(message = null, duration = Duration.long) {
        this.show(message, duration, Position.top);
    }

    /**
     * 中间显示toast
     * @param message 显示的消息
     * @param duration 显示周期毫秒
     */
    showCenter(message = null, duration = Duration.long) {
        this.show(message, duration, Position.center);
    }

    /**
     * 底部显示toast
     * @param message 显示的消息
     * @param duration 显示周期毫秒
     */
    showBottom(message = null, duration = Duration.long) {
        this.show(message, duration, Position.bottom);
    }

    /**
     * 隐藏toast
     * @param isNow 是否立即隐藏
     */
    close(isNow = false) {
        if (isNow) {
            this.setState((state) => {
                state.message = null;
                return state;
            });
            this._initVariate();
        }else {
            const {
                opacity,
                fadeOutDuration
            } = this.props;
            this.opacity.setValue(opacity);
            Animated.timing(this.opacity, {
                toValue: 0,
                duration: fadeOutDuration,
                easing: Easing.out(Easing.linear),
            }).start(() => {
                this.show();
                this._initVariate();
            });
        }
    }

    render() {
        const {
            style,
            textStyle,
            positionValue,
            position,
        } = this.props;
        const {message} = this.state;
        const visible = message != void 0 && message.length > 0;
        let positionType = position;
        if (this.position !== notExist) {
            positionType = this.position;
        }
        visible && this._startAnimation();
        let toastStyle = {};
        switch (positionType) {
            case Position.top:
                toastStyle.top = positionValue;
                break;
            case Position.center:
                toastStyle.top = 0;
                toastStyle.bottom = 0;
                break;
            case Position.bottom:
                toastStyle.bottom = positionValue;
                break;
        }
        return (
            visible ? <View style = {[styles.toast, {...toastStyle}]}
                            pointerEvents = 'box-none'>
                <Animated.View style = {[styles.textView, {...style, opacity: this.opacity}]}>
                    <Text style = {[styles.text, {...textStyle}]}>
                        {message}
                    </Text>
                </Animated.View>
            </View> : null
        );
    }
}


const styles = StyleSheet.create({
    toast: {
        elevation: 1000,
        zIndex: 10000,
        left: 10,
        right: 10,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textView: {
        padding: 10,
        backgroundColor: '#000',
        borderRadius: 5,
    },
    text: {
        color: 'white',
        fontSize: 14,
    },
});


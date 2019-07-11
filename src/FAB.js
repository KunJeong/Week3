import React from 'react';
import { TouchableWithoutFeedback, Animated, Text, View, StyleSheet, PanResponder, Dimensions } from 'react-native'
import { Icon } from 'react-native-elements';

export default class FAB extends TouchableWithoutFeedback{
    constructor(props) {
        super(props);
        this.state = {
          scale : new Animated.Value(1),
          pan: new Animated.ValueXY()
        }
    }
    componentWillMount() {
        this.panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
 
            onPanResponderGrant: (evt, gestureState) => {
                Animated.spring(
                this.state.scale,
                {
                    toValue: 1.3,
                    bounciness: 15,
                    speed: 40,
                    useNativeDriver: true
                }
                ).start()
            },
            onPanResponderMove: Animated.event([null, {
                dx: this.state.pan.x,
                dy: this.state.pan.y
            }]),
            onPanResponderRelease: (e, gesture) => {
                Animated.parallel([
                    Animated.spring(
                        this.state.pan,
                        {
                        toValue:{x:0,y:0},
                        bounciness: 8,
                        speed: 20,
                        useNativeDriver: true
                        }
                    ).start(),
                    Animated.spring(
                        this.state.scale,
                        {
                        toValue: 1,
                        bounciness: 15,
                        speed: 40,
                        useNativeDriver: true
                        }
                    ).start()
                ])
            }
        })
    }

    render(){
      let { pan, scale } = this.state;
      let [translateX, translateY] = [pan.x, pan.y];
      let rotate = '0deg';
      let imageStyle = {
        width: 60,
        height: 60,
        borderRadius: 30,
        transform: [{translateX}, {translateY}, {rotate}, {scale}],
        backgroundColor: '#667788',
        justifyContent: 'center',
      };
      
        return(    
            <View style={styles.absolute}>
                <Animated.View
                {...this.panResponder.panHandlers} 
                style={imageStyle}>
                  <Icon
                  name = 'add'
                  color = '#fff'
                  size = {40}
                  />
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    height: 60,
    width: 60  
  }
});
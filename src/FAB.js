import React from 'react';
import {TouchableWithoutFeedback, Animated, Text, View, StyleSheet, PanResponder, Dimensions} from 'react-native'
import { Icon } from 'react-native-elements';

export default class FAB extends TouchableWithoutFeedback{
    constructor(props) {
        super(props);
        this.state = {
          scale : new Animated.Value(1),
          pan: new Animated.ValueXY()
        }
        this.panResponder = PanResponder.create({
          // onStartShouldSetPanResponder : () => true,
          onMoveShouldSetResponderCapture: () => true,
          onMoveShouldSetPanResponderCapture: () => true,

          onPanResponderGrant: (evt, gestureState) => {
            Animated.spring(
              this.state.scale,
              {
                toValue: 1.3,
                bounciness: 15,
                speed: 40
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
                  speed: 20
                }
              ).start(),
              Animated.spring(
                this.state.scale,
                {
                  toValue: 1,
                  bounciness: 15,
                  speed: 40
                }
              ).start()
            ])
              
          }
        })
    }
    style = {
      position: 'absolute',
        
      //bottom: Animated.subtract(50, Animated.divide(this.state.size, 2)),
      // right: Animated.subtract(50, Animated.divide(this.state.size, 2)),
      width: 60,
      height: 60,
      // width: this.state.size,
      // height: this.state.size,
      //transform: [{translateX: 0}, {this.state.scale}],
      borderRadius: 30,
      //borderRadius: Animated.divide(this.state.size, 2),
      backgroundColor: '#667788',
      justifyContent: 'center',
      
    }
    onPressIn = () => {
        Animated.spring(
            this.state.size,
            {
              toValue: 80,
              bounciness: 15,
              speed: 40
            }
        ).start()
    }
    onPressOut = () => {
        Animated.spring(
            this.state.size,
            {
              toValue: 60,
              bounciness: 15,
              speed: 40
            }
        ).start()
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
          <View style={styles.container}>
            <View style={styles.absolute}>
              {/* <TouchableWithoutFeedback
              onPressIn={this.onPressIn.bind(this)}
              onPressOut={this.onPressOut.bind(this)}
              > */}
                <Animated.View
                {...this.panResponder.panHandlers} 
                style={imageStyle}>
                  <Icon
                  name = 'add'
                  color = '#fff'
                  size = {40}
                  />
                </Animated.View>
              {/* </TouchableWithoutFeedback> */}
            </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  absolute: {
    position: 'absolute', backgroundColor: '#FFFFFF', right: 20, bottom: 20, height: 60, width: 60  
  }
});

//export default FAB;
import React from 'react';
import { TouchableWithoutFeedback, Animated, Text, View, StyleSheet, PanResponder, Dimensions } from 'react-native'
import { Icon } from 'react-native-elements';

export default class FAB extends TouchableWithoutFeedback{
    constructor(props) {
        super(props);
        this.state = {
          scale: new Animated.Value(1),
        // height: new Animated.Value(60),
        // width: new Animated.Value(60),
        // border: new Animated.Value(30),
					pan: new Animated.ValueXY(),
					width : 47.2,
			leftOffset : 15,
			height : 80,
      topOffset : 99,
      cellToRight: 0,
      cellToBottom: 0
        }
    }
    componentWillMount() {
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
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
            onPanResponderMove:
							Animated.event([
								null,
								{
                dx: this.state.pan.x,
								dy: this.state.pan.y
								}
							],
							{listener: (evt, gestureState) => this.findCellIndex(gestureState.moveX, gestureState.moveY)}
							)
						,
            onPanResponderRelease: (e, gesture) => {
                // if(this.isDropArea(gesture)){
                //     Animated.parallel([
                //         Animated.spring(
                //             this.state.scale,
                //             {
                //                 toValue: 1,
                //                 bounciness: 15,
                //                 speed: 40,
                //                 // useNativeDriver: true
                //             }
                //         ).start(),
                //         Animated.spring(
                //             this.state.border,
                //             {
                //                 toValue: 2,
                //                 bounciness: 15,
                //                 speed: 40,
                //                 // useNativeDriver: true
                //             }
                //         ).start(),
                //         Animated.spring(
                //             this.state.height,
                //             {
                //                 toValue: 20,
                //                 bounciness: 15,
                //                 speed: 40,
                //                 // useNativeDriver: true
                //             }
                //         ).start(),
                //         Animated.spring(
                //             this.state.width,
                //             {
                //                 toValue: 60,
                //                 bounciness: 15,
                //                 speed: 40,
                //                 // useNativeDriver: true
                //             }
                //         ).start(),
                //     ])
                // }
                // else {
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
                        ).start(),
                    ])
                // }
                
            }
        })
    }
    findCellIndex = (locationX, locationY) => {
	
			const cellToRight = Math.floor((locationX-this.state.leftOffset) / this.state.width);
			const cellToBottom = Math.floor((locationY-this.state.topOffset) / this.state.height);
	
			// const currentcellIndex =
			// 	cellToRight + 7 * cellToBottom;
      // return currentcellIndex;
      this.setState({cellToRight: cellToRight, cellToBottom: cellToBottom});
    };

    // renderStrip = (cellToRight, cellToBottom) => {
    //   const width = 47.2;
		// 	const leftOffset = 15;
		// 	const height = 80;
		// 	const topOffset = 99;
    //   return(
        
    //   )
    // }
 
    render(){
      let { pan, scale } = this.state;
      let [translateX, translateY] = [pan.x, pan.y];
      let rotate = '0deg';
      let imageStyle = {
        
        width: 60,
        height: 60,
        borderRadius: 30,
        elevation: 6,
        // borderRadius: this.state.border ,
        transform: [{translateX}, {translateY}, {rotate}, {scale}],
        // width: this.state.width,
        // height: this.state.height,
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
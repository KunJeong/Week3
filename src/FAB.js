import React from 'react';
import { TouchableWithoutFeedback, Animated, Text, View, StyleSheet, PanResponder, Dimensions } from 'react-native'
import { Icon } from 'react-native-elements';

export default class FAB extends TouchableWithoutFeedback{
    constructor(props) {
        super(props);
        this.state = {
          scale: new Animated.Value(1),
					pan: new Animated.ValueXY(),
					width : 47.2,
					leftOffset : 15,
					height : 80.2,
					topOffset : 84.5,
					cellToRight: 0,
          cellToBottom: 0,
          icon: true
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
              if(this.props.isDropArea(gesture)){
                this.setState({icon: false})
                setTimeout(()=>{Animated.parallel([
                  Animated.spring(
                      this.state.pan,
                      {
                          toValue:{x:-130,y:-255},
                          bounciness: 8,
                          speed: 2,
                          useNativeDriver: true
                      }
                  ).start(),
                  Animated.spring(
                      this.state.scale,
                      {
                          toValue: 15,
                          bounciness: 15,
                          speed: 2,
                          useNativeDriver: true
                      }
                  ).start(),
              ])}, 0);
                
                this.props.onButtonDrop();
                
                setTimeout(()=>{
                  this.setState({icon: true})
                  Animated.parallel([
                    Animated.spring(
                        this.state.pan,
                        {
                            toValue:{x:0,y:0},
                            bounciness: 8,
                            speed: 15,
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
                  ])}, 0);
              }
              else{
                  this.setState({icon: true})
                  Animated.parallel([
                    Animated.spring(
                        this.state.pan,
                        {
                            toValue:{x:0,y:0},
                            bounciness: 8,
                            speed: 15,
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
                }
            }
        })
    }
    findCellIndex = (locationX, locationY) => {
			const cellFromLeft = Math.floor((locationX-this.state.leftOffset) / this.state.width);
			const cellFromTop = Math.floor((locationY-this.state.topOffset) / this.state.height);
      this.props.changeSelected(cellFromTop, cellFromLeft)
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
                  {this.state.icon? <Icon
                  name = 'add'
                  color = '#fff'
                  size = {40}
                  />
                    : null
                  }
                  
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
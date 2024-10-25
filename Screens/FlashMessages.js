import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
var flshview = null;
export default class FlashMessages extends React.Component {
	constructor(props) {
		super(props);
     console.log("props:",props)
		this.state = {
            fadeAnim : new Animated.Value(0),
            flshmessage:'nk',
            duration:2000,
            animated:true,
            type:'default',
            position:'center',
            animationDuration:1500
        }
       this.showMessagee = this.showMessagee.bind(this);
    }
  componentDidMount() {
    const fadeIn = Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    });
    const fadeOut = Animated.timing(this.state.fadeAnim, {
      toValue: 0,
      duration: 2900,
      useNativeDriver: false,
    });
    Animated.sequence([fadeIn, Animated.delay(300), fadeOut]).start();
    return () => {
      fadeIn.stop();
      fadeOut.stop();
    };
  }
  showMessagee (message,duration,animated,type,position,animationDuration) {
    console.log(message,duration)
    return(
      <Text onLayout={()=>console.log(message)}>{message}</Text>
    );
    this.state.flshmessage = message
      console.log(this.state.flshmessage,message);
   this.forceUpdate()
}
  render(){
  return (
    <Animated.View style={[styles.container, { opacity: this.state.fadeAnim,backgroundColor:this.props.backcolor,zIndex:50,top:this.props.position,...this.props.position=='0%'?{width:'100%',borderRadius:0,left:'0%'}:{left:'5%',borderRadius:5}}]}>
     <Text style={[styles.message,{color:this.props.textcolor}]}>{this.props.message}</Text>
     </Animated.View>
      );
  }
  }
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '90%',
    padding: 10,
    backgroundColor: '#4CAF50',
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    zIndex:15
  },
  message: {
    textAlign: 'center',
  },
});

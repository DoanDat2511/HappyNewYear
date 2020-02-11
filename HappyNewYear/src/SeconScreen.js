import React , {Component} from 'react'
import {View , Text ,StyleSheet ,TouchableOpacity} from 'react-native'
import Sound from 'react-native-sound';

export default class SeconScreen extends Component{
    // constructor(props){
    //     super(props)
    //     this.state={
    //         count : 0
    //     }
    // }
    //  sound = new Sound(
    //     "https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/advertising.mp3",
    //     Sound.MAIN_BUNDLE,
    //     error => {
    //       if (error) {
    //         console.log("failed to load the sound", error);
    //         return;
    //       }
    //       sound.play(() => sound.release());
    //     }
    //   );

    // playSound = () => {
    //     this.sound.play()
       
        
    // }
  
    componentDidMount(){
        const sound = new Sound('dat.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    // do something
  }
  
  // play when loaded
  sound.play();
});
    }
    
    render(){
      
        return(

            <View style={styles.container}>
             
                <TouchableOpacity onPress={
                    this.playSound
                }>
                    <Text>BAMÍ</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'green'
    },
    text : {
        fontSize:200,
        fontWeight:'bold'
    }
})
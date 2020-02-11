import React , {Component} from 'react'
import {View , Text ,StyleSheet ,TouchableOpacity} from 'react-native'


export default class FirstScreen extends Component{
    constructor(props){
        super(props)
        this.state={
            count : 0,
            tempe:'red'
        }
    }
    countER =()=>{
        setInterval((()=>{
            this.setState({
                count:this.state.count+1
            })
            
        }
          ), 1000);
        //   if(this.state.count = 4)
        //   {
        //     this.props.navigation.navigate("MakeItRain")
        //   }
        // this.props.navigation.navigate('FirstScreen')
        
    }
    render(){
      
        return(

            <View style={styles.container}>
               
                <TouchableOpacity onPress={
                   ()=>{
                    setInterval((()=>{
                        this.setState({
                            count:this.state.count+1
                        })
                        if(this.state.count===1){
                            this.setState({
                                tempe:'rgb(132,163,92)'
                            })
                        }
                        if(this.state.count===2){
                            this.setState({
                                tempe:'rgb(239,97,60)'
                            })
                        }
                        if(this.state.count===3){
                            this.setState({
                                tempe:'rgb(69,147,246)'
                            })
                        }
                        if(this.state.count===4 ){
                            this.props.navigation.navigate('MakeltRain')
                            return
                          }
                    }
                      ), 1000);                
                   }
                }>
                   <Text style= {[styles.text,{color:this.state.tempe}]}>{this.state.count}</Text>
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
        // backgroundColor:'#73d8ff'
    },
    text : {
        fontSize:200,
        fontWeight:'bold',
        color:'white'
    }
})
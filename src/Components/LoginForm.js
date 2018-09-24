import React, { Component } from 'react'; 
import {StyleSheet ,TextInput ,View ,ActivityIndicator} from 'react-native';  
import firebase from 'firebase';
import { Container, Header, Content, Form, Item, Input, Label ,Button ,Text } from 'native-base';
export default class LoginForm extends Component { 

  state={  
    email:'',
    password:'',
    error:'', 
    loading:false,
  }; 
  onButtonPress=()=>{    
    const {email , password}= this.state; 
    this.setState({loading:true , error:''});
    firebase.auth().signInWithEmailAndPassword(email, password) 
    .then(this.setState({error:'loggedin'})) 
    .catch(()=>{  
      firebase.auth().createUserWithEmailAndPassword(email,password) 
      .catch(()=>{  
        this.setState({error:'Authentication Failed' , loading:false , email:'' , password: ''}); 
      })
    })
    console.log("Button has been Pressed");
  } 
  Loader(){  
    if(this.state.loading){  
      if(this.state.error!='loggedin'){ 
      return( <View style={styles.ButtonStyle}> 
              <ActivityIndicator size="large" color="#0000ff"/>  
              <Text> Please Wait </Text>
              </View>
            );   
      } 
      else if(this.state.error==='loggedin'){   
        return(  
        <View style={{flex:1}}>  
        <Text> Successfully Loggedin</Text>
        </View>
        );

      } 
      
    }
    else {  
      return(   
              
                 <View style={styles.ButtonStyle}>   
                 <Button  
                info  
                bordered 
                onPress={this.onButtonPress} 
                >  
                <Text>Log in</Text>
                </Button> 
                </View>

            );
      }
  }  
  render() {
    return (
      <Container style={styles.InputStyle}>
        <Content >
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
                <Input  
                onChangeText={email=>this.setState({ email })}    
                onChange={event=>console.log(event.target)} 
                autoCorrect={false} 
                autoCapitalize="none" 
                value={this.state.email}
                />
            </Item>
            <Item floatingLabel last>
                <Label>Password</Label>
                <Input   
                secureTextEntry={true} 
                onChangeText={password=>this.setState({ password })} 
                value={this.state.password}
                />
            </Item>  
                {this.Loader()}  
                <Text>{this.state.error}</Text>
          </Form>
        </Content>
      </Container>
    );
  }
} 

const styles=StyleSheet.create({  
  InputStyle:{  
    backgroundColor:'white',
  }, 
  ButtonStyle:{  
    flex:1, 
    margin:10, 
    flexDirection:'row', 
    alignItems:'center',
    justifyContent:'center',

  }
});
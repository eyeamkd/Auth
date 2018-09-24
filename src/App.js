import React , {Component} from 'react';
import {View, Text ,StyleSheet} from 'react-native';  
import {Button} from 'native-base'; 
import firebase from 'firebase';  
import HeaderBar from './Components/HeaderBar.js'; 
import LoginForm from './Components/LoginForm.js';


class App extends Component{   

	state={  
		loggedIn:false,
	} 
	componentWillMount(){   
		const config = {
					    apiKey: "AIzaSyCZ62gFy2FBQQeDpnatYMR4QWsyT5gbhLk",
					    authDomain: "auth-d3804.firebaseapp.com",
					    databaseURL: "https://auth-d3804.firebaseio.com",
					    projectId: "auth-d3804",
					    storageBucket: "auth-d3804.appspot.com",
					    messagingSenderId: "638046649335"
					  };
  		firebase.initializeApp(config); 
  		firebase.auth().onAuthStateChanged((user)=>{  
		if(user){  
			this.setState({ loggedIn:true}) 
			console.log(this.state.loggedIn);
		} 
		else {  
			this.setState({loggedIn:false})
		}
		});
	} 
	
	renderCompo(){   
		console.log(this.state.loggedIn+"inside the render compo");
		if(this.state.loggedIn===true){  
			return(  
				 <View style={styles.ButtonStyle}>   
                 <Button  
	                info  
	                bordered 
	                onPress={()=>firebase.auth().signOut()} 
	              >  
                <Text>Log out</Text>
                </Button> 
                </View>

				);
		} 
		else if(this.state.loggedIn===false) {   
		return(  
			<View style={styles.LoginFormStyle}>  
					<LoginForm status={this.state.loggedIn}/>  
			</View>
			) ;
			
	} 
}
	render(){  
		return (   
			<View style={styles.ViewStyle}> 
				<View style={styles.HeaderStyle}>  
					<HeaderBar/>
				</View> 
				{this.renderCompo()}
			</View>
			);
	}
} 

const styles=StyleSheet.create({  
	ViewStyle:{  
		flex:1,
	},
	HeaderStyle:{  
		flex:1, 
	}, 
	LoginFormStyle:{  
		flex:1,
	},  
	 ButtonStyle:{  
	    flex:1, 
	    margin:10, 
	    flexDirection:'row', 
	    alignItems:'center',
	    justifyContent:'center',

  }

}) 

export default App;
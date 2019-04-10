import React, { Component } from 'react';
import { StyleSheet, View, Text,TextInput,TouchableOpacity,Button,KeyboardAvoidingView } from 'react-native';
import {saveDeckTitle} from '../Utils/api';
import {addDeck} from '../Actions/index';
import {connect} from 'react-redux';


class AddDeck extends Component {
    state ={
        text :''
    }
    
    submitTitle =()=>{

        const {text} =this.state    
       
        saveDeckTitle(text)
        this.props.dispatch(addDeck(text))
        this.props.navigation.navigate('DeckView', {entryId : text} )
        this.setState({text :""})
       
        
    }

    render() { 
       const {text} =this.state
        return ( 
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>New Deck Name...</Text>
                <TextInput style={styles.input}
                           onChangeText={(text)=>this.setState({text})} 
                           value={text} ></TextInput>
                <TouchableOpacity style={styles.submitBtn} onPress={this.submitTitle}>
                        <Text style={styles.submitBtnText}>Submit</Text>
                    </TouchableOpacity>                
            </View>
           </KeyboardAvoidingView>
         );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
		width: 200,
		height: 44,
		padding: 8,
		borderWidth: 5,
		borderColor: '#ffffff',
		margin: 50,
		borderRadius: 8
	},
	title: {
		fontSize: 30,
		color: '#ffffff',
		textAlign: 'center'
	},
	submitBtn: {
		borderWidth: 0.5,
		borderColor: '#CB4335',
		padding: 10,
		backgroundColor: '#CB4335',
		borderRadius: 7,
		overflow: 'hidden'
    },
    submitBtnText:{
        color: '#ffffff',
		fontSize: 22,
		textAlign: 'center'
    },
    card: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 10,
		backgroundColor: '#A569BD',
		alignSelf: 'stretch',
		borderRadius: 10,
		shadowColor: 'rgba(0,0,0,0.34)',
        shadowOffset: {
        width: 0,
        height: 3
      },
        shadowRadius: 4,
        shadowOpacity: 1
  }
});
  
 
export default connect()(AddDeck);


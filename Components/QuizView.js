import React,{Component} from 'react'
import { NavigationActions } from 'react-navigation'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import AddButton from './AddButton';
import InfoButton from './InfoButton';

class QuizView extends Component {
    state = { 
        questionNumber: 0,
		showQuestion: false,   
		correct: 0,
		incorrect: 0,
		disableAddBtn : false
     }

     submitAnswer = (answer) => {	
	
	const { questionNumber } = this.state
	const deck = this.props.navigation.state.params.entryId
	const {decks} = this.props
	const correct = decks[deck].questions[questionNumber].correctAnswer

	if(answer === correct){
		this.setState({ correct: this.state.correct + 1 })
	}else {
		this.setState({ incorrect: this.state.incorrect + 1 })
	}
	this.setState({ questionNumber: this.state.questionNumber + 1, showQuestion: false })
	
	
}

replayQuiz = () => {
			this.setState({
				questionNumber: 0, 
				showQuestion: false,
				correct: 0,
				incorrect: 0,
			})
		}


goBack = () => {
			this.props.navigation.dispatch(NavigationActions.back({ key: null }))
		}

showAnswer = () => (
	!this.state.showQuestion ? this.setState({ showQuestion: true })
	: this.setState({ showQuestion: false })
)

    render() { 
		
        const {questionNumber} = this.state
        const {decks}=this.props;
        const deck = this.props.navigation.state.params.entryId
		const number = this.state.questionNumber + 1
		
		if (questionNumber === decks[deck].questions.length){
			return(
			<View style={styles.container}>
			 <View style={styles.card}>
			  <Text style={styles.mainText}> You got {this.state.correct} out of {decks[deck].questions.length} !</Text>
				{this.state.correct > this.state.incorrect ?  
				<Text style={{fontSize: 90}}>😄</Text>
			     : <Text style={{fontSize: 90}}>😭😭😭</Text>}
				
				 <AddButton styles={styles} text={'TryAgain'} color={"#CB4335"} onPress={this.replayQuiz}/>
				 <AddButton styles={styles} text={'Back'} color={"#4A235A"} onPress={this.goBack}/>
			   </View>				
			</View>
			)
		}

        return ( 
            <View style={styles.container}>
              <View style={styles.card}>
                <Text  style={styles.questions}>{number} / {decks[deck].questions.length}</Text>

                {!this.state.showQuestion ? <Text style={styles.mainText}>{decks[deck].questions[questionNumber].question}</Text>
					 : <Text style={styles.mainText}>{decks[deck].questions[questionNumber].answer}</Text>}


                {!this.state.showQuestion ? <InfoButton style={styles.answer} text={'Show Answer'} onPress={this.showAnswer}></InfoButton>
					: <InfoButton style={styles.answer} text={'Show Question'} onPress={this.showAnswer}></InfoButton>}

                <AddButton text={"Correct"} styles={styles} color={"#CB4335"} disable={this.state.disableAddBtn}
                            onPress={() => this.submitAnswer('true')}/>
                <AddButton text={"Incorrect"} styles={styles} color={"#4A235A"} 
                           onPress={() => this.submitAnswer('false')}/>
                           
                </View>
            </View>
         );
    }
}

const styles = StyleSheet.create({
    container: {
		flex: 1, 
		justifyContent: 'center',
		alignItems: 'center'
    },
    andriodBtn :{
        padding: 10,
   	    borderRadius: 7,
   	    height: 45,
    	margin: 5,
    	width: 160  
    },
    submitBtnText: {
    	color: '#ffffff',
    	fontSize: 26,
    	textAlign: 'center',
  },
  questions: {
  		top: 0,
  		alignSelf: 'flex-start',
  		left: 0,
  		color: '#ffffff',
  		fontSize: 20,
  		margin: 5,
  		position: 'absolute',
  },
  	answer: {
  		color: '#ffffff',
  		fontSize: 20,
  		margin: 20,
  },
 	 card: {
		flex: 1,
		justifyContent: 'space-around',
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
	},
	mainText: {
		fontSize: 40,
		color: '#ffffff',
		marginTop: 40,
		textAlign: 'center'
	}

})


const mapStateToProps =(decks)=>{
    return {
        decks
    }
}
 
export default connect(mapStateToProps) (QuizView);

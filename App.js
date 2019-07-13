import {Calendar, CalendarList, Agenda} from './src/react-native-calendars';
import React, { Component } from 'react';
// import {LocaleConfig} from 'react-native-calendars';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	TextInput,
	Button,
	TouchableOpacity,
	Alert
} from 'react-native';
// import { Button } from 'react-native-elements';


// LocaleConfig.locales['fr'] = {
//   monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
//   monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
//   dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
//   dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.'],
//   today: 'Aujourd\'hui'
// };

// LocaleConfig.defaultLocale = 'fr';

// class dotdate extends Component {
//   render() {
//     return (
//       <View style={{alignItems: 'center'}}>
//         <Text>Hello {this.props.name}!</Text>
//       </View>
//     );
//   }
// }

class CustomText extends Component {
  render() {
    return (
      <Text style={{backgroundColor: "blue"}}>{this.props.text}</Text>
    );
  }
}

// class CustomDay extends Day {
// 	constructor(props){
// 		super(props);
// 	};
// 	dayComponent={({date, state}) => {
//    		return (
//    			<TouchableOpacity style={styles.button}
// 				onPress={this.onPress}
// 			>
// 	   		<View style={styles.day}>
// 				<Text>{date.day}</Text>
// 				<Text>{this.state.markedText}</Text>
// 			</View>
// 		   	</TouchableOpacity>);
//    	}}
// }

// class Date extends Component {
// 	constructor (props) {
// 	 	super(props)
// 	 	this.state = {
// 		selectedDate: 'HI'
// 	 	}
// 	 	this.updateDate = this.updateDate.bind(this)
// 	}

// 	updateDate (input) {
//   		this.setState({selectedDate: input})
// 	}

// 	render() {
// 		return (
// 	      <View style={styles.container}>

// 	        <Button
//           		color="green"
//           		title={this.state.selectedDate}
//           		onPress={(e) => this.updateDate("BYE!!")}
//           	/>
//           	<Text>{this.state.selectedDate}</Text>
// 	      </View>
// 		);
// 	}
// }

// const vacation = {key:'vacation', color: 'red', selectedDotColor: 'blue'};
// const massage = {key:'massage', color: 'blue', selectedDotColor: 'blue'};
// const workout = {key:'workout', color: 'green'};

export default class App extends Component {
	constructor (props) {
	 	super(props)
	 	this.state = {
	 		multi_period_Text: "HI!",
	 		// markedColor: "",
	 		// markedDates:13,
			D: 0,
			month:"",
	 	}
	 	this.updateDate = this.updateDate.bind(this)
	}

	onPress = () => {
    	this.setState({
    		D: this.state.D + 1
   		})
	}

	updateDate (input) {
  		this.setState({D: input})
	}

	// daay(props) {
	// 	if(props.day === this.state.markedDates){
	// 		return (<CustomText text= {this.state.markedText !== 0 ? this.state.markedText: null}/>)
	// 	}
	// }

	// static getDerivedStateFromProps(nextProps, prevState) {
 //    if (prevState.markedText !== nextProps.markedText) {
 //      return {markedText: nextProps.markedText}
 //    }

 //    return null;
 //  }


 	selectedDay(props) {
 		Alert.alert(JSON.stringify(props))
 		// <Text style={{marginTop: 300}}> { this.state.markedText !== "" ? this.state.markedText: "BYE!"}</Text>
 	}


	render() {
		// const currentMonth = 
		// const currentYear = 
		// const { selectedDate } = this.state
			return (
			<View style={styles.container}>
				<CalendarList style={styles.calendar}
   					onDayPress={(day) => this.selectedDay(day)}
					horizontal={true}
					pagingEnabled={true}
					calendarHeight={500}
					markedDates={{
					  	'2019-07-10': {
					      periods: [
					        { startingDay: true, endingDay: true, color: '#5f9ea0', text: this.state.multi_period_Text },
					        // { startingDay: false, endingDay: true, color: '#ffa500' },
					        // { startingDay: true, endingDay: false, color: '#f0e68c' },
					      ]
					    },
					    '2019-07-11': {
					      periods: [
					        { startingDay: true, endingDay: false, color: '#5f9ea0', text: "정!" },
					        // { startingDay: false, endingDay: true, color: '#ffa500' },
					        // { startingDay: true, endingDay: false, color: '#f0e68c' },
					      ]
					    },
					    '2019-07-12': {
					      periods: [
					        { startingDay: false, endingDay: false, color: '#5f9ea0', text: "석!" },
					        // { color: 'transparent' },
					        // { startingDay: false, endingDay: false, color: '#f0e68c' },
					      ]
					    },
					    '2019-07-13': {
					      periods: [
					        { startingDay: false, endingDay: true, color: '#5f9ea0', text: "훈!" },
					        // { color: 'transparent' },
					        // { startingDay: false, endingDay: false, color: '#f0e68c' },
					      ]
					    },
					  }}
					markingType={'multi-period'}
				/>
				{/*<TextInput style={{height: 40,borderColor: 'gray', borderWidth: 1}}
		        	onChangeText={(text) => this.setState({multi_period_Text: text})}
		        />*/}
		        <Text>{this.state.month}</Text>
			</View>
			);
	}
}

const styles = StyleSheet.create({
	red: {
		color: 'red',
	},
});
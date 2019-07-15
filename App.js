
import React, { Component } from 'react';
import FAB from './src/FAB';
import {
  Text,
  View,
  StyleSheet,
  Alert
} from 'react-native';
import {Agenda} from './src/react-native-calendars';
import * as appStyle from './src/react-native-calendars/style';
import XDate from 'xdate';
import dateutils from './src/react-native-calendars/dateutils';

export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calendarOpened: false,
      selectedTop: -1,
      selectedLeft: -1,
      currentMonth: 0,
      items: {
        '2019-07-10': {
          periods: [
            { startingDay: true, endingDay: true, color: '#5f9ea0', text: '가족여행', details: '가족들이랑 여행을 갈거예요어쩌구저쩍ㅁㄴ얼멍루머ㅏㄴㅇ루만우람ㄴㅇ루만어루만ㅇ루마넝루만어루만어루ㅏㅁㅇ누람ㄴ어루ㅏㅁㄴ어ㅜ라ㅓㅁㅇ'},
            { startingDay: true, endingDay: true, color: '#d33465', text: '휴식', details: '쉴래.'},
          ]
        },
        '2019-07-11': {
          periods: []
        },
        '2019-06-10':{
          periods: [
            { startingDay: true, endingDay: false, color: '#00afff', text: '여행을떠나고싶어욧', details: '가족들이랑 여행을 갈거예요어쩌구저쩍ㅁㄴ얼멍루머ㅏㄴㅇ루만우람ㄴㅇ루만어루만ㅇ루마넝루만어루만어루ㅏㅁㅇ누람ㄴ어루ㅏㅁㄴ어ㅜ라ㅓㅁㅇ'},
            { startingDay: true, endingDay: true, color: '#d33465', text: '휴식', details: '쉴래.'},
          ]
        },
        '2019-06-11':{
          periods: [
            { startingDay: false, endingDay: true, color: '#5f9ea0', text: '여행을떠나고싶어욧', details: '가족들이랑 여행을 갈거예요어쩌구저쩍ㅁㄴ얼멍루머ㅏㄴㅇ루만우람ㄴㅇ루만어루만ㅇ루마넝루만어루만어루ㅏㅁㅇ누람ㄴ어루ㅏㅁㄴ어ㅜ라ㅓㅁㅇ'}
          ]
        }
      },
    };
  }
  _onCalendarToggled(calendarOpened){
      this.setState({calendarOpened: calendarOpened, selectedLeft: -1})
  }

  _isDropArea(gesture){
    if(!this.state.calendarOpened) return false;
			const cellFromLeft = Math.floor((gesture.moveX-15) / 47.2);
			const cellFromTop = Math.floor((gesture.moveY-84.5) / 80.2);
      return(this.validCell(cellFromTop, cellFromLeft));
  }
  validCell(cellFromTop, cellFromLeft){
    if(cellFromTop < 0) return false;
    if(cellFromTop > 5) return false;
    if(cellFromLeft < 0) return false;
    if(cellFromLeft > 6) return false;
    var month = new XDate();
    month.setFullYear(this.state.currentMonth.year);
    month.setMonth(this.state.currentMonth.month - 1);
    month.setDate(1);
    const min = month.getDay();
    const max = XDate.getDaysInMonth(this.state.currentMonth.year, this.state.currentMonth.month-1);
    // Alert.alert(min.toString());
    if(cellFromTop * 7 + cellFromLeft < min) return false;
    if(cellFromTop * 7 + cellFromLeft > min + max - 1) return false;
    return true;
  }

  _changeSelected(cellFromTop, cellFromLeft){
    if(!this.state.calendarOpened) return;
    if(!this.validCell(cellFromTop, cellFromLeft)){
      cellFromLeft = -1, cellFromTop = -1
    }
    if(this.state.selectedTop != cellFromTop){
      this.setState({selectedTop: cellFromTop})
    }
    if(this.state.selectedLeft != cellFromLeft){
      this.setState({selectedLeft: cellFromLeft})
    }
  }
  
  onIndexChange(){
    const top = this.state.selectedTop * 80.2 + 84.5;
    const left = this.state.selectedLeft * 47.2 + 15;
    if(this.state.calendarOpened && this.state.selectedLeft >=0){
      return(
        <View style={{
            position: 'absolute',
            left: left,
            top: top,
            width: 47.2,
            height: 80, 
            backgroundColor: 'rgba(200,200,200,0.5)'
          }}>
        </View>
      )
    }
  }
  
  render() {
    return (
			<View style={styles.box}>
				<Agenda
          items={this.state.items}
          horizontal={true}
          calendarHeight={700}
					loadItemsForMonth={this.loadItems.bind(this)}
					renderItem={this.renderItem.bind(this)}
					renderDay={this.renderDay.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          renderEmptyData={this.renderEmptyData.bind(this)}
					rowHasChanged={this.rowHasChanged.bind(this)}
					markingType={'multi-period'}
          markedDates={this.state.items}
          onCalendarToggled={this._onCalendarToggled.bind(this)}
					// theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
					//renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
				/>
        {this.onIndexChange()}
				<FAB
          isDropArea={this._isDropArea.bind(this)}
          changeSelected = {this._changeSelected.bind(this)}
        />
			</View>
    );
  }

  loadItems(month) {
    this.setState({currentMonth: month, selectedLeft: -1, selectedTop: -1})
    for (let i = -15; i < 85; i++) {
      const time = month.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = this.timeToString(time);
      if (!this.state.items[strTime]) {
        this.state.items[strTime] = {periods: []};
      }
    }
  }

  renderItem(item) {
    return (
      <View style={[styles.item, {backgroundColor: item.color}]}>
        <Text style={styles.title}>{item.text}</Text>
        <Text style={{marginTop: 12, color: '#ffffff'}}>{item.details}</Text>
      </View>
    );
  }

	renderDay(date, item) {
    const today = dateutils.sameDate(date, XDate()) ? styles.today : undefined;
    if (date) {
      return (
        <View style={styles.day}>
          <Text allowFontScaling={false} style={[styles.dayNum, today]}>{date.getDate()}</Text>
          <Text allowFontScaling={false} style={[styles.dayText, today]}>{XDate.locales[XDate.defaultLocale].dayNamesShort[date.getDay()]}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.day}/>
      );
    }
	}

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>No schedules!</Text></View>
    );
  }
  renderEmptyData() {
    return (
      <View style={styles.emptyDate}><Text>No date selected!</Text></View>
    );
  }
  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  
	box: {
		height: '100%',
		// paddingLeft: 5,
		// paddingRight: 5,
	  },
  item: {
    // backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
	},
	dayNum: {
		fontSize: 28,
		fontWeight: '200',
		color: appStyle.agendaDayNumColor
	},
	dayText: {
		fontSize: 14,
		fontWeight: '300',
		color: appStyle.agendaDayTextColor,
		marginTop: -5,
		backgroundColor: 'rgba(0,0,0,0)'
	},
	day: {
		width: 63,
		alignItems: 'center',
		justifyContent: 'flex-start',
		marginTop: 30
	},
	today: {
		color: appStyle.agendaTodayColor
	},
});
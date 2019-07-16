
import React, { Component } from 'react';
import FAB from './src/FAB';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  DatePickerAndroid,
  Modal,
  Alert
} from 'react-native';
import {Agenda} from './src/react-native-calendars';
import * as appStyle from './src/react-native-calendars/style';
import XDate from 'xdate';
import dateutils from './src/react-native-calendars/dateutils';

import { ColorPicker } from 'react-native-color-picker'

export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calendarOpened: false,
      selectedTop: -1,
      selectedLeft: -1,
      currentYear: 0,
      currentMonth: 0,
      currentDay: 0,
      endingYear: 0,
      endingMonth: 0,
      endingDay: 0,
      text: '',
      details: '',
      color:"#ffffff",
      modalVisible: false,
      colorVisible: false,
      items: {
        '2019-07-10': {
          periods: [
            { startingDay: true, endingDay: true, color: '#5f9ea0', text: '가족여행', details: '가족들이랑 여행을 갈거예요어쩌구저쩍ㅁㄴ얼멍루머ㅏㄴㅇ루만우람ㄴㅇ루만어루만ㅇ루마넝루만어루만어루ㅏㅁㅇ누람ㄴ어루ㅏㅁㄴ어ㅜ라ㅓㅁㅇ'},
            { startingDay: true, endingDay: true, color: '#d33465', text: '발표', details: '죄송합니다 제가 밤을 새서 제정신이 아니예요'},
          ]
        },
        '2019-07-11': {
          periods: []
        },
        '2019-06-10':{
          periods: [
            { startingDay: true, endingDay: false, color: '#00afff', text: '몰입캠프', details: '몰입은 중요합니다 왜냐하면 발표를 해야하기 때문입니다'},
            { startingDay: true, endingDay: true, color: '#d33465', text: '휴식', details: '쉴 휴, 먹을 식'},
          ]
        },
        '2019-06-11':{
          periods: [
            { startingDay: false, endingDay: true, color: '#00afff', text: '몰입캠프', details: '몰입은 중요합니다 왜냐하면 발표를 해야하기 때문입니다'}
          ]
        }
      },
    };
  }

  setColorVisible(visible) {
    this.setState({colorVisible: visible});
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  async onBeginningDatePress(){
    try {
      var date = new Date();
      date.setFullYear(this.state.currentYear, this.state.currentMonth-1, this.state.currentDay);
      const {action, year, month, day} = await DatePickerAndroid.open({           
        date: date
      });
      if(action == DatePickerAndroid.dateSetAction){
        this.setState({currentYear: year})
        this.setState({currentMonth: month+1})
        this.setState({currentDay: day})
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }   
  }

  async onEndingDatePress(){
    try {
      var date = new Date();
      date.setFullYear(this.state.endingYear, this.state.endingMonth-1, this.state.endingDay);
      const {action, year, month, day} = await DatePickerAndroid.open({           
        date: date
      });
      if(action == DatePickerAndroid.dateSetAction){
        this.setState({endingYear: year})
        this.setState({endingMonth: month+1})
        this.setState({endingDay: day})
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }   
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
    month.setFullYear(this.state.currentYear);
    month.setMonth(this.state.currentMonth - 1);
    month.setDate(1);
    const min = month.getDay();
    const max = XDate.getDaysInMonth(this.state.currentYear, this.state.currentMonth-1);
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
  _onButtonDrop(){
    var month = new XDate();
    month.setFullYear(this.state.currentYear);
    month.setMonth(this.state.currentMonth - 1);
    month.setDate(1);
    const min = month.getDay();
    this.setState({currentDay: this.state.selectedTop * 7 + this.state.selectedLeft-min+1, endingDay: this.state.selectedTop * 7 + this.state.selectedLeft-min+1})
    this.setState({selectedLeft : -1, selectedTop: -1, text: '', details:''});
    setTimeout(()=>{
      this.setModalVisible(true)}
      , 0);
  }
  
  _onDonePress(){
    const pad = "00"
    const mon = pad.substring(0, pad.length - this.state.currentMonth.toString().length) + this.state.currentMonth
    for(var dayIterator = this.state.currentDay; dayIterator <= this.state.endingDay; dayIterator++){
      const day = pad.substring(0, pad.length - dayIterator.toString().length) + dayIterator;
      const strTime = this.state.currentYear.toPrecision(4) + '-' + mon + '-' + day;
      if(!this.state.items[strTime]){
        this.state.items[strTime] = {periods: []};
      }
      if(this.state.text !== ''){
        var start = false;
        var end = false;
        if(dayIterator == this.state.currentDay){
          start = true
        }
        if(dayIterator == this.state.endingDay){
          end = true
        }
        this.state.items[strTime].periods.push({
          startingDay: start,
          endingDay: end,
          color: this.state.color,
          text: this.state.text,
          details: this.state.details
        });
      }
    }

    
    const newItems = {}; 
    Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
    this.setState({
      items: newItems
    });

    this.setModalVisible(false);
  }
  render() {
    return (
      <View>
        <Modal 
          coverScreen={true}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}>
          <View style={{backgroundColor: "#667788", height: "100%"}}>
          <TouchableOpacity
                style ={{position: 'absolute', left: 15, top: 20}}
                onPress={() => {
                  this.setColorVisible(true);
                }}>
                <View style={{width: 33.2, height: 25, borderRadius: 2 , backgroundColor: this.state.color}}/>
              </TouchableOpacity>
            <TouchableOpacity style={{position: 'absolute', top: 16, right: 15}}
              onPress={this._onDonePress.bind(this)}>
              <Text style={{ fontSize: 18, padding: 3, color: "white", fontWeight: 'bold'}}>Done</Text>
            </TouchableOpacity>
            <TextInput
                style={{marginLeft:55, marginTop:5, width: 250, color:'white', fontSize: 25, fontFamily: 'bold'}}
                placeholder="New Schedule"
                onChangeText={(text) => this.setState({text: text})}
                value={this.state.text}
              />
            <View style={{}}>
              
            <View style={{flexDirection : 'row', marginLeft: 5}}>
              <TouchableOpacity style={[styles.button]} onPress={this.onBeginningDatePress.bind(this)}>
                <Text style={{textAlign: 'center', fontSize: 15, color: "white", width: 110}} >{this.state.currentYear +" - "+ this.state.currentMonth +" - "+ this.state.currentDay}</Text>
              </TouchableOpacity>
              <Text style={{fontSize: 15, textAlign: 'center', color: "white"}} >~</Text>
              <TouchableOpacity style={[styles.button]} onPress={this.onEndingDatePress.bind(this)}>
                <Text style={{textAlign: 'center', fontSize: 15, color: "white", width: 110}} >{this.state.endingYear +" - "+ this.state.endingMonth +" - "+ this.state.endingDay}</Text>
              </TouchableOpacity>
            </View>
              <TextInput
                style={{marginLeft: 15, height: 50, color: "white"}}
                placeholder="Details..."
                onChangeText={(text) => this.setState({details: text})}
                value={this.state.details}
              />
            </View>
            
              
            <View style={{marginTop: 22}}>
              <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.colorVisible}
                onRequestClose={() => {
                  this.setColorVisible(!this.state.colorVisible);}}>
                <View style={{backgroundColor: "#667788", height: "100%"}}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setColorVisible(false);
                    }}>
                    <Text style={{fontSize: 18, padding: 3, textAlign: 'center', marginTop: 20, marginLeft: 255, color: "white", width: 110, fontWeight: 'bold'}}>Done</Text>
                  </TouchableOpacity>
                  <ColorPicker
                    onColorSelected={color => this.setState({color: color})}
                    style={{flex: 1, marginLeft: 30, marginRight: 30, marginBottom: 50}}
                  />
                  <Text style={{textAlign: "center", fontSize: 30, marginBottom: 50, color: "white"}}> {this.state.color}</Text>
                </View>
              </Modal>
            </View>
          </View>
        </Modal>
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
					rowHasChanged={()=>{true}}
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
          onButtonDrop={this._onButtonDrop.bind(this)}
        />
			</View>
      </View>
    );
  }

  loadItems(month) {
    this.setState({currentMonth: month.month, endingMonth: month.month, currentYear: month.year, endingYear: month.year,selectedLeft: -1, selectedTop: -1})
    for (let i = -15; i < 85; i++) {
      const time = month.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = this.timeToString(time);
      if (!this.state.items[strTime]) {
        this.state.items[strTime] = {periods: []};
      }
    }
    const newItems = {}; 
    Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
    this.setState({
      items: newItems
    });
    this.setModalVisible(false);
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
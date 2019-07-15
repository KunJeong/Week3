
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  Button,
  TextInput,
  TouchableOpacity,
  DatePickerAndroid,
  Modal,
  Image,
  TouchableWithoutFeedback,
  Json
} from 'react-native';
import { TriangleColorPicker, ColorPicker } from 'react-native-color-picker'
import {Agenda} from './src/react-native-calendars';


class CustomText extends Component {
  render() {
    return (
      <TriangleColorPicker
        onColorSelected={color => alert(`Color selected: ${color}`)}
        style={{flex: 1}}
      />
    )
  }
}


export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title:"",
      schedule:"",
      modalVisible: false,
      colorVisible: false,
      BeginningYear:"YYYY",
      BeginningMonth:"MM",
      BeginningDay:"DD",
      EndingYear:"YYYY",
      EndingMonth:"MM",
      EndingDay:"DD",
      Color:"#FFFFFF",
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
      const {action, year, month, day} = await DatePickerAndroid.open({           
        date: new Date()
      });
      if(action == DatePickerAndroid.dateSetAction){
        this.setState({BeginningYear: year})
        this.setState({BeginningMonth: month+1})
        this.setState({BeginningDay: day})
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }   
  }

  async onEndingDatePress(){
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({           
        date: new Date()
      });
      if(action == DatePickerAndroid.dateSetAction){
        this.setState({EndingYear: year})
        this.setState({EndingMonth: month+1})
        this.setState({EndingDay: day})
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }   
  }

  render() {
    return(
      <View style={{marginTop: 22}}>
        <Modal
          coverScreen={true}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}>
          <View style={{backgroundColor: "#667788", height: "100%"}}>
            <TouchableOpacity
              onPress={() => {
                this.setModalVisible(false);
              }}>
              <Text style={{fontSize: 18, padding: 3, textAlign: 'center', marginTop: 20, marginLeft: 255, color: "white", width: 110, fontWeight: 'bold'}}>Done</Text>
            </TouchableOpacity>
            <View style={{marginTop: 120, alignItems:'center'}}>
              <TextInput
                style={{height: 40, borderColor: "white", borderWidth: 0.5, width: 200, color: "white"}}
                placeholder="Put your title in here!"
                onChangeText={(text) => this.setState({title: title})}
                value={this.state.text}
              />
              <TextInput
                style={{height: 40, borderColor: "white", borderWidth: 0.5, marginTop: 10, width: 200, color: "white"}}
                placeholder="Put your schedule in here!"
                onChangeText={(text) => this.setState({schedule: schedule})}
                value={this.state.text}
              />
            </View>
            <View style={{flexDirection : 'row', marginLeft: 25, marginTop: 20, alignItems: 'center'}}>
              <TouchableOpacity style={[styles.button, {borderColor: "white", borderWidth: 0.5, margin: 10, padding: 3}]} onPress={this.onBeginningDatePress.bind(this)}>
                <Text style={{textAlign: 'center', fontSize: 15, color: "white", width: 110}} >{this.state.BeginningYear +" - "+ this.state.BeginningMonth +" - "+ this.state.BeginningDay}</Text>
              </TouchableOpacity>
              <Text style={{fontSize: 15, margin: 10, padding: 3, textAlign: 'center', color: "white"}} >~</Text>
              <TouchableOpacity style={[styles.button, {borderColor: "white", borderWidth: 0.5, margin: 10, padding: 3}]} onPress={this.onEndingDatePress.bind(this)}>
                <Text style={{textAlign: 'center', fontSize: 15, color: "white", width: 110}} >{this.state.EndingYear +" - "+ this.state.EndingMonth +" - "+ this.state.EndingDay}</Text>
              </TouchableOpacity>
            </View>
              <TouchableOpacity
                style ={{alignItems: 'center'}}
                onPress={() => {
                  this.setColorVisible(true);
                }}>
                <View style={{marginTop:10, width: 50, height: 50, borderRadius: 100/2, backgroundColor: this.state.Color}}/>
              </TouchableOpacity>
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
                    onColorSelected={color => this.setState({Color: color})}
                    style={{flex: 1, marginLeft: 30, marginRight: 30, marginBottom: 50}}
                  />
                  <Text style={{textAlign: "center", fontSize: 30, marginBottom: 50, color: "white"}}> {this.state.Color}</Text>
                </View>
              </Modal>
            </View>
          </View>
        </Modal>
        <TouchableOpacity
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text>Show Modal</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
});
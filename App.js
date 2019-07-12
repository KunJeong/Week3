/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment, Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
	FlatList,
	TouchableOpacity
} from 'react-native';

import {Badge} from 'react-native-elements';

import FAB from './src/FAB';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

class MyListItem extends React.PureComponent {
  // _onPress = () => {
  //   this.props.onPressItem(this.props.id);
  // };

  render() {
    const textColor = this.props.selected ? 'red' : 'black';
    return (
      // <TouchableOpacity onPress={this._onPress}>
        <View style={styles.item}>
          <Text style={styles.time}>{this.props.title}</Text>
        </View>
      // </TouchableOpacity>
    );
  }
}
class MyListItemTwo extends React.PureComponent {
  // _onPress = () => {
  //   this.props.onPressItem(this.props.id);
  // };

  render() {
    const textColor = this.props.selected ? 'red' : 'black';
    return (
      // <TouchableOpacity onPress={this._onPress}>
        <View style={styles.itemTwo}>
          <Text style={styles.textTwo}>{this.props.title}</Text>
        </View>
      // </TouchableOpacity>
    );
  }
}

class App extends Component{
  _keyExtractor = (item, index) => item.id;

  _renderItem = ({item}) => (
    <MyListItem
      id={item.id}
      title={item.title}
    />
	);
	_renderItemTwo = ({item}) => (
    <MyListItemTwo
      id={item.id}
      title={item.title}
    />
	);
  render(){
    return (
			<View style={styles.scrollView}>
				<View style={styles.sectionContainer}>
						<Text style={styles.sectionTitle}>Today</Text>
				</View>
				<View style={{flexDirection: "row"}}>
					<FlatList
						style={{flex: 1}}
						data={
							[
								{id: 'a', title: 'AM 1'}, 
								{id: 'b', title: '2'}, 
								{id: 'c', title: '3'}, 
								{id: 'd', title: '4'},
								{id: 'e', title: '5'},
								{id: 'f', title: '6'},
								{id: 'g', title: '7'},
								{id: 'h', title: '8'},
								{id: 'i', title: '9'},
								{id: 'j', title: '10'},
								{id: 'k', title: '11'},
								{id: 'l', title: '12'},
								{id: 'm', title: 'PM 1'},
								{id: 'n', title: '2'},
								{id: 'o', title: '3'},
								{id: 'p', title: '4'},
								{id: 'q', title: '5'},
								{id: 'r', title: '6'},
								{id: 's', title: '7'},
								{id: 't', title: '8'},
								{id: 'u', title: '9'},
								{id: 'v', title: '10'},
								{id: 'w', title: '11'},
								{id: 'x', title: '12'},
								{id: 'y', title: ''},
							]}
						keyExtractor={this._keyExtractor}
						renderItem={this._renderItem}
						showsVerticalScrollIndicator={false}
					/>
					<FlatList
						style={{flex: 1}}
						data={
							[
								{id: 'a', title: 'Wake up'},
								{id: 'b', title: 'School'},
								{id: 'c', title: 'Coding'},
								{id: 'd', title: 'Basketball'},
							]}
						keyExtractor={this._keyExtractor}
						renderItem={this._renderItemTwo}
						showsVerticalScrollIndicator={false}
					/>
				</View>
				<FAB/>
			</View>
    );
	}
};

const styles = StyleSheet.create({
	item: {
		// marginTop: 2,
		// marginBottom: 2,
		// paddingBottom:2,
		marginLeft: 20,
		height: 45,
		width: 150,
		borderBottomWidth: 1, 
		// borderRadius: 4,
		// backgroundColor: '#dddddd'  
		// backgroundColor: '#eeeeee',
		// borderTopColor: '#000000'
	},
	time:{ 
		textAlign:'right',
		paddingRight: 5,
		backgroundColor : '#ffffff',
		position: 'absolute',
		width: 40,
		height: 20,
		top: 35 ,
		left: 0
	},
	textTwo:{
		textAlign: 'center',
		textAlignVertical: 'center',
	},
  scrollView: {
		flex:1,
		backgroundColor: '#ffffff'
    // backgroundColor: Colors.lighter, 
	},
	itemTwo:{ 
		justifyContent: 'center', 
		// alignItems: 'center' ,
		marginTop: 10,
		marginLeft:20,
		height: 45,
		width:150,
		borderRadius: 4,
		backgroundColor: '#eeccaa'
	},
  body: {
    // backgroundColor: Colors.white,
  },
  sectionContainer: {
    paddingTop: 20,
		paddingHorizontal: 24,
		paddingBottom: 20,
		backgroundColor: '#eecc99',
		elevation: 4
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

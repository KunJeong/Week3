import React, {Component} from 'react';
import {ActivityIndicator, Button, Alert} from 'react-native';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import XDate from 'xdate';
import PropTypes from 'prop-types';
import styleConstructor from './style';
import {weekDayNames} from '../../dateutils';
import {CHANGE_MONTH_LEFT_ARROW, CHANGE_MONTH_RIGHT_ARROW} from '../../testIDs';
import {Icon} from 'react-native-elements';


class CalendarHeader extends Component {
  static displayName = 'IGNORE';
  
  static propTypes = {
    theme: PropTypes.object,
    hideArrows: PropTypes.bool,
    month: PropTypes.instanceOf(XDate),
    addMonth: PropTypes.func,
    showIndicator: PropTypes.bool,
    firstDay: PropTypes.number,
    renderArrow: PropTypes.func,
    hideDayNames: PropTypes.bool,
    weekNumbers: PropTypes.bool,
    onPressArrowLeft: PropTypes.func,
    onPressArrowRight: PropTypes.func
  };

  static defaultProps = {
    monthFormat: 'MMMM yyyy'
  };

  constructor(props) {
    super(props);
    this.style = styleConstructor(props.theme);
    this.addMonth = this.addMonth.bind(this);
    this.substractMonth = this.substractMonth.bind(this);
    this.onPressLeft = this.onPressLeft.bind(this);
    this.onPressRight = this.onPressRight.bind(this);
    this.state = {
      today: XDate().getMonth() + XDate().getFullYear()* 12,
      current: this.props.month.getMonth() + this.props.month.getFullYear()* 12
    }
  }

  addMonth() {
    this.props.addMonth(1);
  }

  substractMonth() {
    this.props.addMonth(-1);
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.month.toString('yyyy MM') !== this.props.month.toString('yyyy MM')) {
      return true;
    }
    if (nextProps.showIndicator !== this.props.showIndicator) {
      return true;
    }
    if (nextProps.hideDayNames !== this.props.hideDayNames) {
      return true;
    }
    return false;
  }

  onPressLeft() {
    const {onPressArrowLeft} = this.props;
    if (typeof onPressArrowLeft === 'function') {
      return onPressArrowLeft(this.substractMonth, this.props.month);
    }
    return this.substractMonth();
  }

  onPressRight() {
    const {onPressArrowRight} = this.props;
    if (typeof onPressArrowRight === 'function') {
      return onPressArrowRight(this.addMonth, this.props.month);
    }
    return this.addMonth();
  }

  _onPressButton() {
    const {onPressArrowLeft} = this.props;
    if (typeof onPressArrowLeft === 'function') {
      return onPressArrowLeft(this.substractMonth, XDate().addMonths(1));
    }
    return this.substractMonth();
  }

  render() {
    let leftArrow = <View />;
    let rightArrow = <View />;
    let weekDaysNames = weekDayNames(this.props.firstDay);
    const {testID} = this.props;

    if (!this.props.hideArrows) {
      leftArrow = (
        <TouchableOpacity
          onPress={this.onPressLeft}
          style={this.style.arrow}
          hitSlop={{left: 20, right: 20, top: 20, bottom: 20}}
          testID={testID ? `${testID}-${CHANGE_MONTH_LEFT_ARROW}`: CHANGE_MONTH_LEFT_ARROW}
        >
          {this.props.renderArrow
            ? this.props.renderArrow('left')
            : <Icon
                name='chevron-left'
                // type='antdesign'
                color='#778899'
              />}
        </TouchableOpacity>
      );
      rightArrow = (
        <TouchableOpacity
          onPress={this.onPressRight}
          style={this.style.arrow}
          hitSlop={{left: 0, right: 20, top: 20, bottom: 20}}
          testID={testID ? `${testID}-${CHANGE_MONTH_RIGHT_ARROW}`: CHANGE_MONTH_RIGHT_ARROW}
        >
          {this.props.renderArrow
            ? this.props.renderArrow('right')
            : <Icon
                name='chevron-right'
                // type='antdesign'
                color='#778899'
              />}
        </TouchableOpacity>
      );
    }

    let indicator;
    if (this.props.showIndicator) {
      indicator = <ActivityIndicator color={this.props.theme && this.props.theme.indicatorColor}/>;
    }

    return (
      <View style={this.props.style}>
        <View style={this.style.header}>
          {leftArrow}
          <View style={{ flexDirection: 'row' }}>
            <Text allowFontScaling={false} style={this.style.monthText} accessibilityTraits='header'>
              {this.props.month.toString(this.props.monthFormat)}
            </Text>
            {indicator}
          </View>
          
          <TouchableOpacity
            onPress={this._onPressButton.bind(this)}
            hitSlop={{left: 20, right: 20, top: 20, bottom: 20}}
            style={{
              position: 'absolute',
              right: 60
            }}>
          <Icon
            name='today'
            color='#778899'
            />
          </TouchableOpacity>
          {rightArrow}
        </View>
        {
          !this.props.hideDayNames &&
          <View style={this.style.week}>
            {this.props.weekNumbers && <Text allowFontScaling={false} style={this.style.dayHeader}></Text>}
            {weekDaysNames.map((day, idx) => (
              <Text 
                allowFontScaling={false} 
                key={idx} 
                accessible={false} 
                style={this.style.dayHeader} 
                numberOfLines={1} 
                importantForAccessibility='no'
              >
                {day}
              </Text>
            ))}
          </View>
        }
      </View>
    );
  }
}

export default CalendarHeader;

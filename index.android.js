
import React from 'react';
import formatTime from 'minutes-seconds-milliseconds';
import{
  Text,
  View,
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  Alert,
} from 'react-native';


var StopWatch = React.createClass({

  getInitialState: function(){
    return {
      timeElapsed: null
    }
  },
  render: function (){
    return <View style={styles.container}>
      <View style={[styles.header,this.border('yellow')]}>
        <View style={[styles.timerWrapper,this.border('red')]}>
          <Text>
            {formatTime(this.state.timeElapsed)}
          </Text>
        </View>
        <View style={[this.border('green'),styles.buttonWrapper]}>
          {this.startStopButton()}
          {this.lapButton()}
        </View>
      </View>
      <View style={[styles.footer,this.border('blue')]} >
        <Text>
          This Is List Laps
        </Text>
      </View>
    </View>
  },
  startStopButton : function (){
    return <TouchableHighlight
      underlayColor="gray"
      onPress={this.handleStartPress}
      >
      <Text>
        Start
      </Text>
    </TouchableHighlight>
  },
  lapButton: function(){
    return <View>
      <Text>
        Lap
      </Text>
    </View>
  },
  border: function(color){
    return {
      borderWidth: 4,
      borderColor: color,
    }
  },
  handleStartPress: function(){
    var startTime = new Date();

    setInterval(() => {
      this.setState({
        timeElapsed: new Date() - startTime
      });
  } , 30); //run this function in every 30 mile-second

    // Alert.alert("Data",startTime);
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1, //fill the entire screen
    alignItems: 'stretch',//wide as left and right as u can
  },
  header: {//Yellow
    flex: 1,
  },
  footer: {//Blue
    flex: 1,
  },
  timerWrapper: {
    flex: 5, //takes up 5/8ths of avaliable space
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 3, //takes up 3/8ths of avaliable space
    flexDirection: 'row', // default is coulmn
    justifyContent: 'space-around', //put item in center as row by spacing between
    alignItems: 'center', //center item in div
  }
});

AppRegistry.registerComponent('stopwatch', () => StopWatch);

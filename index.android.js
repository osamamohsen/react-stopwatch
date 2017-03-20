
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
      timeElapsed: null,
      running: false,
      startTime: null,
      laps: [],
    }
  },
  render: function (){
    return <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.timerWrapper}>
          <Text style={styles.timer}>
            {formatTime(this.state.timeElapsed)}
          </Text>
        </View>
        <View style={styles.buttonWrapper}>
          {this.startStopButton()}
          {this.lapButton()}
        </View>
      </View>
      <View style={styles.footer} >
          {this.displayLaps()}
      </View>
    </View>
  },
  displayLaps: function(){ // display array of laps
    return this.state.laps.map(function(time,index){ // time: carry time , index: carry index
      return <View  key={index} style={styles.lab}>
        <Text style={styles.labText}>
          #No of {index + 1}
        </Text>
        <Text style={styles.labText}>
          {formatTime(time)}
        </Text>
      </View>
    });
  },
  startStopButton : function (){
    var styleButton = this.state.running ? styles.stopButton : styles.startButton;
    return <TouchableHighlight
      underlayColor="gray"
      onPress={this.handleStartPress}
      style={[styles.button , styleButton]}
      >
      <Text>
        { this.state.running ? 'Stop' : 'Start'}
      </Text>
    </TouchableHighlight>
  },
  lapButton: function(){
    return <TouchableHighlight
       style={styles.button}
       onPress={this.handleLapPress}
       underlayColor="gray">
      <Text>
        Lap
      </Text>
    </TouchableHighlight>
  },
  handleLapPress: function(){ //handle-Lap-Press
    var lap = this.state.timeElapsed;

    this.setState({
      startTime: new Date(),
      laps: this.state.laps.concat([lap]), // concat => push element in array
    });
  },
  handleStartPress: function(){ //handle-start-press
    var startTime = new Date();

    if(this.state.running){
      clearInterval(this.interval); // clearInterval built in function clear interval
      this.setState({running:false});
      return; // timer is stop now
    }

    this.setState({startTime : new Date()});

    this.interval = setInterval(() => {
      this.setState({
        timeElapsed: new Date() - this.state.startTime ,
        running: true,
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
  },
  timer: {
    fontSize: 60,
  },
  button: {
    borderWidth: 2,
    height: 100,
    width: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButton: {
    borderColor: 'green',
  },
  stopButton: {
    borderColor: 'red',
  },
  lab: {
    justifyContent: 'space-around',
    'flexDirection': 'row'
  },
  labText: {
    fontSize: 30
  }
});

AppRegistry.registerComponent('stopwatch', () => StopWatch);

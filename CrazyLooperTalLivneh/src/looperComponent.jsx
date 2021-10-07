import React, { component, useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';
import styled , {keyframes} from 'styled-components';

//list of all audio files names
const audioFilesNamesList = [1,2,3,4,5,6,7,8,9];
//list of all audio files path
const audioFilesList = [];
//saves the looper status (off /on) for global use
let looperStatus = false;
//interval  to change timeout according to loop time
let loopInterval;
//saves the sound playing status
let soundIsPlaying=false;
//saves the sound which controlles the loop
let controlingAudio;

//pad component//
class Pad extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    isPadOn: false,
    audioFile: new Audio(`/src/sounds/${this.props.id}.mp3`),
    };
    this.onPadClickFunc = this.onPadClickFunc.bind(this);
  }
  //on click
   onPadClickFunc(){
    this.state.isPadOn ? this.padOffClick() :  this.padOnClick();
    this.setState((state) => {
    return {isPadOn: !state.isPadOn}
    });
    }

//clicked on
padOnClick(){
  audioFilesList.push(this.state.audioFile);
  playAll();
}

//clicked off
 padOffClick(){ 
 (this.state.audioFile).pause();
 (this.state.audioFile).currentTime = 0;
 audioFilesList.splice(audioFilesList.indexOf(this.state.audioFile), 1);
 audioFilesList.length == 0 ? soundIsPlaying=false : (
   this.state.audioFile == controlingAudio ? (
   soundIsPlaying=false ,playAll()) : "");
  }

render(){
return(
  <PadButton className={this.state.isPadOn ? "panIsOn col m-2":"col m-2"} onClick={this.onPadClickFunc}>Suond Number:<br/>{this.props.id}</PadButton>
)
}
}

//pads table component//
class PadsTable extends React.Component{
render(){
return(
  <PadTableStyle className="row">
       {audioFilesNamesList.map((audioFile, index) => (
        (index+1) == 1 ||  (index+1) == 4 ||  (index+1) == 7 ? 
         <PadsRow className="padsRow row clearfix">
          <Pad className="col-4 m-2" id={audioFile} key={audioFile}/>
          <Pad className="col-4 m-2" id={audioFile+1} key={audioFile+1}/>
          <Pad className="col-4 m-2" id={audioFile+2} key={audioFile+3}/>
         </PadsRow>
         :""
        ))}  
</PadTableStyle>
)
}
}

//play-and-stop-button component//
class PlayStopBtn extends React.Component{
constructor(props) {
    super(props);
    this.state = {
    isBtnOn: false,
    };
    this.onPlayStopBtnClickFunc = this.onPlayStopBtnClickFunc.bind(this);
}

//change the state of the play-stop-button component
   onPlayStopBtnClickFunc(){
    this.setState(prevState => ({
    isBtnOn: !prevState.isBtnOn
    }));
    //checking what was the button clicked for, using global variabel
    looperStatus ? this.stopBtnClick() : this.playBtnClick();
  }

//clicked to play
  playBtnClick(){
    looperStatus= !looperStatus;
    playAll();
  }

//clicked to stop
 stopBtnClick(){
   looperStatus= !looperStatus;
 audioFilesList.length > 0 ? audioFilesList.map(audioToPlay=> {(audioToPlay).pause(),(audioToPlay).currentTime = 0}, clearInterval(loopInterval),soundIsPlaying = false) : "";
 }

render(){
return(
  <PlayStopBtnStyle className={this.state.isBtnOn ? "LooperIsOn col-6 offset-3":"col-6 offset-3"}  onClick={this.onPlayStopBtnClickFunc}> {this.state.isBtnOn ? "CrazyLooper is on" :"CrazyLooper is off"}</PlayStopBtnStyle>
)
}
}

//entire looper component//
class Looper extends React.Component{
constructor(props) {
    super(props);
    this.state = {
    isLooperOn: false,
    };
}

render(){
return(
  <div id="looper" className="flex-row justify-content-center">
  <PlayStopBtn/>
  <PadsTable/>
  </div>
)
}
}

export default Looper;

//checks looperStatus status and audio playing status 
const playAll=()=> {
looperStatus ? ( 
  audioFilesList.length > 0 ? (
  soundIsPlaying ? console.log("CurrntlyPlaying") : (mapSoundsToPlay())
  ) : (console.log("noSound")))
   : console.log("looperIsOff");
  }

//play all selected sounds
const mapSoundsToPlay=()=>{
  audioFilesList.map(audioToPlay=>{
  (audioToPlay).play(),
  soundIsPlaying= true,
  controlingAudio= audioToPlay,
  (audioToPlay).onended=()=> {soundIsPlaying=false; playAll();}})
}

//***pads table and row styles***//
const PadTableStyle = styled.div`{
margin:0;
height: 80vw;
max-height: 455px;
}`
const PadsRow = styled.div`{
margin:0;
}`

//***buttons animation***//
const padColorAnimation = keyframes`
    0% {
        background: linear-gradient(90deg, #00d2ff 0%, #3a47d5 100%)
    }
    10% {
        background: linear-gradient(90deg, #d53369 0%, #daae51 100%)
    }
    20% {
        background: linear-gradient(90deg, #FDBB2D 0%, #3A1C71 100%)
    }
    30% {
        background: linear-gradient(90deg, #FDBB2D 0%, #22C1C3 100%)
    }
    40% {
        background: linear-gradient(90deg, #f8ff00 0%, #3ad59f 100%)
    }
    50% {
        background: linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%)
    }
    60% {
        background: linear-gradient(90deg, #0700b8 0%, #00ff88 100%)
    }
    70% {
        background: linear-gradient(90deg, #3F2B96 0%, #A8C0FF 100%)
    }
    80% {
        background: linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%)
    }
    90% {
        background: linear-gradient(90deg, #4b6cb7 0%, #182848 100%)
    }
    100% {
        background: linear-gradient(90deg, #00d2ff 0%, #3a47d5 100%)
    }
`;

//***pads style***//
const PadButton = styled.button`{
  background-color: transparent;
  color: white;
  border: 1px solid #12130F;
  border-radius: 8px;
  text-align: center;
  font-size: 20px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }

  &.panIsOn {
  animation-name: ${padColorAnimation};
  animation-duration: 5s;
  animation-iteration-count: infinite;
    box-shadow:none}

`;

//***PlayStopBtn style***//
const PlayStopBtnStyle = styled.button`{
	background:white;
	border-radius:28px;
	border:1px solid #8F8073;
	display:inline-block;
	cursor:pointer;
	color:#8F8073;
	font-family:Arial;
	font-size:17px;
	padding:16px 31px;
	text-decoration:none;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin-top: 20px;
  margin-bottom: 20px;}

  &.LooperIsOn{
    color:white;
  animation-name: ${padColorAnimation};
  animation-duration: 5s;
  animation-iteration-count: infinite;
     box-shadow:none;
 };
  }
}`

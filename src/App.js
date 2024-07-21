import React, { useEffect } from 'react';
import { Widget, addResponseMessage, renderCustomComponent, addUserMessage, toggleWidget} from 'react-chat-widget';
import openingMenu from './customComponents/openingMenu';
import OverlayTrigger from './customComponents/OverlayTrigger';
import Feedback from './customComponents/Feedback';
import ContactInfo from "./customComponents/ContactInfo";
import LocationMap from "./customComponents/LocationMap";
import VideoResponse from "./customComponents/VideoResponse";
import 'react-chat-widget/lib/styles.css';
import './App.css';
import './my_rcw.css';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import Tooltip from '@mui/material/Tooltip';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Grid } from "@mui/material";

const questionFile = require('./tempData/questions.json');

function App() {
  /**
   * On Load/Render
   */
  useEffect(() => {
    renderCustomComponent(openingMenu, {questions: questionFile, actionHandler: openingButton}, false);
  },);

  /***
   * Chat Header Home Button Action 
   * */
  const homeClick = () =>{
    renderCustomComponent(openingMenu,{questions: questionFile, actionHandler: openingButton}, false);
  }

  /****
   * Chat Header Feedback Button Action
   * */
  const feedbackClick = () =>{
    renderCustomComponent(Feedback, {parentMessage: addResponseMessage});
  }

  /**
   * Handle Opening Menu Button action
  */
  const openingButton = (stringValue)=>{
    addUserMessage(stringValue);
    handleNewUserMessage(stringValue);
  }

  /***
   * * Over ride MUI default tooltip z index to be in front
   * */
  const theme = createTheme({
    zIndex: {
      tooltip: 100001,
    },
  });

  /** 
   * Send User input message to backend to process
   * For Testing purposes; identify special keywords to show special features
   */
  const handleNewUserMessage = (newMessage) => {
    /**
     * Ideally, send Message to appropriated backend for natural language processing
     * For concept, use keywords to show appropriate response
     * */
    if(newMessage.toLowerCase().includes("resume")){
      renderCustomComponent(OverlayTrigger, {title: "Resume", location: 'https://www.w3docs.com/uploads/media/default/0001/01/540cb75550adf33f281f29132dddd14fded85bfc.pdf'}, false);
    } else if(newMessage.toLowerCase().includes("contact information")){
      renderCustomComponent(ContactInfo, {parentMessage: addResponseMessage}, false);      
    }else if(newMessage.toLowerCase().includes("locate")){
      let mapMessage = "I am currently based on the East coast of USA.";
      renderCustomComponent(LocationMap,{coordinates:[39.716972, -72.792379], message:mapMessage},false); 
    }else if(newMessage.toLowerCase().includes("hire you")){
      renderCustomComponent(VideoResponse, {url: "https://www.youtube.com/embed/dQw4w9WgXcQ/&autoplay=1", details: "Here's a video."},false); 
    }else{
      addResponseMessage("What an interesting request. Let me think about it.");
    }
  };


  const chatHeader = ( 
    <div id = "chatHeader">
      <div id = "chatHeaderText">
      <span style={{fontSize: "1.25rem"}}> Welcome</span>
      </div>
         
      <ThemeProvider theme={theme}>
      <div id = "chatHeaderIcon">

      <Grid container direction="row" alignItems="center" wrap="nowrap">
        <Grid item>
          <Tooltip title = "Home Menu">
            <IconButton aria-label="home" color='default' sx={ { borderRadius: 5 } } onClick={() => { homeClick() }}><HomeIcon style={{fontSize: "1.5rem"}} /></IconButton>
          </Tooltip>
        </Grid>
        <Grid item>
        <Tooltip title = "Feedback">
        <IconButton aria-label="feedback" color='default' sx={ { borderRadius: 5 } } onClick={() => { feedbackClick() }}><ThumbsUpDownIcon style={{fontSize: "1.15rem"}} /></IconButton>
      </Tooltip>
        </Grid>
        <Grid item className="closeIcon">
        <Tooltip title = "Close Chat">
        <IconButton aria-label="close" color='default' sx={ { borderRadius: 5 } } onClick={() => { toggleWidget() }}><CloseIcon style={{fontSize: "1.5rem"}} /></IconButton>
        </Tooltip>
        </Grid>
      </Grid>
      </div>
      </ThemeProvider>
      
    </div>
  );
  

  return (
    <div className="App">
      <div className='Page-Header'>
      Welcome to Selina's Sandbox!
      </div>
      <div className="Page-Body">
        <p>This page is where Selina likes to test out new ideas. </p>
        <p>Currently the page is under development.</p>
        <br></br>
        <p>
          It is only a proof of concept. 
        </p>

      </div>

      {/*
      <div className='Chat'>      
        <Widget 
        handleNewUserMessage={handleNewUserMessage}
        title= {chatHeader}
        emojis = {true}
        subtitle=""
        showCloseButton={false}
        senderPlaceHolder = "Type a Question Here!"
        showTimeStamp={true}
        />
  
      </div>
      */}

    </div>
  );
}

export default App;

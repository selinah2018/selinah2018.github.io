/***
 * Opening Menu in chat window. 
 * Show short intro text and then possible questions. 
 * */

import React from 'react';
import "./openingMenu.css"
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function openingMenu(props) {
    const theme = createTheme({      
    typography: {
        button: {
            textTransform: 'none',
            justifyContent: "flex-start"
        }
    }
    });

    const handleButtonClick = (event)=>{
        props.actionHandler(event.currentTarget.value);
    }

  return (
    <div className="openingBubble">
        <div className="openingText">
        <p>Welcome to Selina's sandbox!</p>
        <p>Everything here is just used for testing purposes.</p>
        </div>

        <div className="openingButtons">
        <ThemeProvider theme={theme}>
            <Button 
                onClick={handleButtonClick}
                value={props.questions.opening_questions[0].question}
                className="menuButton">
            {props.questions.opening_questions[0].question}
            </Button>

            <Button 
                onClick={handleButtonClick}
                value={props.questions.opening_questions[1].question}
                className="menuButton">
            {props.questions.opening_questions[1].question}
            </Button>

            <Button 
                onClick={handleButtonClick}
                value={props.questions.opening_questions[2].question}
                className="menuButton">
            {props.questions.opening_questions[2].question}
            </Button>
        </ThemeProvider>
           
        </div>
    </div>
  );
}

export default openingMenu;

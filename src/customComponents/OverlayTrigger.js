/**
 * Overlay Window Button 
 * To create DOM and render new DOM above existing chat window
 */

import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import OverlayWindow from './OverlayWindow';

function OverlayTrigger(props) {
     function overlayWindow(e){
      e.target.disabled = true; //Prevent double tap
      setTimeout(function() {
        e.target.disabled = false;
    }, 2000);
    
      const chatContainer = document.getElementsByClassName("rcw-conversation-container")[0];
      const overContainer = document.createElement("div");
      overContainer.id = "overLayContainer";
      chatContainer.appendChild(overContainer);
      ReactDOM.render(<OverlayWindow props = {props}/>, document.getElementById("overLayContainer"));
    }
  
  const theme = createTheme({      
    typography: {
        button: {
            textTransform: 'none',
            justifyContent: "flex-start"
        }
    }
    });

    //Show time of button generated
    const timeNow = new Date().toLocaleTimeString([], {hour12: true, hour: '2-digit', minute:'2-digit'}).replace("AM","").replace("PM","");

    return (
      <div className = "rcw-response-overlayTrigger">
        <div className="rcw-response" onClick={(e) => {overlayWindow(e)}}> 
          <ThemeProvider theme={theme}>
            <div className="rcw-message-text" >
            <Button size="small" sx={{ padding: 0}}>Click Here to Preview: {props.title}</Button>
            </div>
            </ThemeProvider>
        </div>
        <div className="rcw-timestamp">
          <p>{timeNow}</p>
        </div>

      </div>
    
  );
}

export default OverlayTrigger;

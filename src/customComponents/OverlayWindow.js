
/****
 * Overlay Component that appears above chat window layer
 * */

import React, {useState,} from 'react';
import "./OverlayWindow.css"
import Tooltip from '@mui/material/Tooltip';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { unmountComponentAtNode } from 'react-dom';

function OverlayWindow(props) {
    /***
     * Over ride MUI default tooltip z index to be in front
     * */
    const theme = createTheme({
        zIndex: {
          tooltip: 100001,
        },
      });
      
    
    const [defaultSize, setSize] = useState(true); //size is in reference if can maximize to larger than conversation window 
    //move tooltip to front

    function closeOverlay(){
        unmountComponentAtNode(document.getElementById("overLayContainer")); //unmount component
        document.getElementById("overLayContainer").remove(); //remove div
    }

    function expandOverlay(){
        setSize(defaultSize!==true); //change to alternate setting of button to expand/compress depending on current size
        if(defaultSize === true){
            //change to larger size according to viewport height/ viewport weight
            document.getElementById("overLayContainer").style.height = "85vh";
            document.getElementById("overLayContainer").style.width = "90vw";
            setTimeout(() => {
                document.getElementsByClassName('loadDocument')[0].src = document.getElementsByClassName('loadDocument')[0].src;
            }, "750") //.75 seconds delay according to transition time
        }
        else{
            //revert back to original chat window height/ width
            document.getElementById("overLayContainer").style.height = "100%";
            document.getElementById("overLayContainer").style.width = "100%";
            setTimeout(() => {
                document.getElementsByClassName('loadDocument')[0].src = document.getElementsByClassName('loadDocument')[0].src;
              }, "750") //.75 seconds delay according to transition time
        }
    }

    return (
    <div className='overlay'>  
    <ThemeProvider theme={theme}>
        <div className='overlayHeader'>
                <div className="overlayExpandShrink">
                {
                    defaultSize?
                    <Tooltip className = "overlayToolTip" title = "Expand" placement='top'>
                    <IconButton aria-label="expand" color='default' onClick={() => {expandOverlay()}}><ZoomOutMapIcon style={{fontSize: "1.5rem"}} /></IconButton>
                    </Tooltip>
                    :
                    <Tooltip className = "overlayToolTip" title = "Shrink" placement='top'>
                    <IconButton aria-label="shrink" color='default' onClick={() => {expandOverlay()}}><ZoomInMapIcon style={{fontSize: "1.5rem"}} /></IconButton>
                    </Tooltip>
                }
                </div>
                
                <Tooltip className = "overlayToolTip" title = "Close" placement='top'>
                <IconButton aria-label="close" color='default' onClick={() => {closeOverlay()}}><CloseIcon style={{fontSize: "1.5rem"}} /></IconButton>
                </Tooltip>

            </div>
    </ThemeProvider>
            
            <div className='overlayContent'>
                <iframe
                title={props.props.title}
                src={props.props.location}
                className='loadDocument'
                />
            </div>
        
       
    </div>
  );
}

export default OverlayWindow;

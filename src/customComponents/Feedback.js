/***
 * User experience is important and therefore, their feedback about their experience is crucial in order to improve the UX. 
 * 
 * */

import React from 'react';
import './Feedback.css';
import Rating from '@mui/material/Rating';
import { Button } from "@mui/material";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';



const labels = {
    0: '',
    1: 'Disappointing (A lot of things are broken)\n',
    2: 'Poor (I see room for improvement)\n',
    3: 'Average (Nothing special)\n',
    4: 'Good (I like it!)\n',
    5: 'Excellent (I would hire you!)\n',
};
function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}


function Feedback(props){
    const timeNow = new Date().toLocaleTimeString([], {hour12: true, hour: '2-digit', minute:'2-digit'}).replace("AM","").replace("PM","");
    const [starValue, setStarValue] = React.useState(5);
    const [feedbackValue, setFeedbackValue] = React.useState(undefined);
    const [hover, setHover] = React.useState(0);
    const [disabledTF, setDisable] = React.useState(false);

    /****
     * Show more form details depending on star rating
     * */
    function showAdditional(showField){
        if((showField <=3) && (showField>0)){
            return (
                <div className="rcw-feedback-negative">
                    <p>Can you tell me where I need to improve?</p>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox/>} label="Broken Features" disabled = {disabledTF}/>
                        <FormControlLabel control={<Checkbox/>} label="Bad Design" disabled = {disabledTF}/>
                    <TextField
                        className = "feedback_textarea"
                        label="Feedback"
                        multiline
                        rows={2}
                        sx= {{width:"90%", fontFamily:"inherit", resize:"none"}}
                        placeholder= "Write what went wrong here!"
                        disabled={disabledTF}
                        onChange={(event)=>{setFeedbackValue(event.target.value)}}
                        />
                    </FormGroup>
            </div>)
        }
        else if (showField>=4){
            return(
                <div className="rcw-feedback-positive">
                     <FormGroup>
                    <TextField
                        className = "feedback_textarea"
                        label="Feedback"
                        multiline
                        rows={2}
                        sx= {{width:"90%", fontFamily:"inherit", resize:"none"}}
                        placeholder= "Write what you liked here!"
                        disabled={disabledTF}
                        onChange={(event)=>{setFeedbackValue(event.target.value)}}
                        />
                    </FormGroup>
                </div>)
        }
    }

    return (
        <div className="rcw-response-feedback">
            <div className = "feedback">
                <center>
                    <p>Rank this chat experience!</p>
                    <Rating 
                        name="size-large"
                        defaultValue={starValue}
                        size="large" 
                        value={starValue}
                        getLabelText={getLabelText}
                        disabled={disabledTF}
                        onChange={(event, newValue) => {
                            setStarValue(newValue);
                        }}
                        
                        onChangeActive={(event, newHover) => {
                            setHover(newHover);
                        }}
                        />
                    <br></br>
                    {labels[hover !== -1 ? hover : 0]}
                    <br></br>
                    {showAdditional(starValue)}

                    <Button
                        variant="outlined"
                        disabled={disabledTF}
                        onClick={() => {
                            console.log("Star Rating: " + starValue + "; Feedback: " + feedbackValue);
                            alert('This is just a proof of concept; feedback is NOT recorded.');
                            setDisable(true);
                            props.parentMessage("Thanks for your feedback. I'll keep on improving!");
                            
                        }}
                        sx={{ marginTop: "2%",textTransform: 'capitalize' }}
                    >
                    Send Feedback
                    </Button>
                </center>
            </div>
            <div className="rcw-timestamp">
                <p>{timeNow}</p>
            </div>
        </div>
        

    );
}

export default Feedback;

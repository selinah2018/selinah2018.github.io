/****
 * 
 * Keep Contact Options in one message bubble
 * */

import "./ContactInfo.css";
import { Button } from "@mui/material";
import {useState} from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { createTheme, ThemeProvider, styled, Icon } from '@mui/material';
import isEmail from 'validator/lib/isEmail';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

function ContactInfo(props){
    const timeNow = new Date().toLocaleTimeString([], {hour12: true, hour: '2-digit', minute:'2-digit'}).replace("AM","").replace("PM","");


    //default schedule meetings for next workday (ignores holidays) starting at 9AM
    var currentDoW = new Date(new Date().setHours(9, 0, 0)); //current day at 9AM 
    if(currentDoW.getDay()===5){
        //avoid scheduling meeting Friday onto Saturday
        currentDoW.setTime(currentDoW.getTime()+3*1000*60*60*24);
    }else if(currentDoW.getDay()===6){
        //avoid scheduling meeting Saturday onto Sunday
        currentDoW.setTime(currentDoW.getTime()+2*1000*60*60*24);
    }else {
        //all schedule next workday
        currentDoW.setTime(currentDoW.getTime()+1*1000*60*60*24);
    }
    const ISOnextWorkDay = currentDoW.toISOString();
    const timeOffset = (new Date(ISOnextWorkDay)).getTimezoneOffset() * 60000; //offset in milliseconds
    const localISOTime = (new Date(new Date(ISOnextWorkDay) - timeOffset)).toISOString().substring(0, ISOnextWorkDay.lastIndexOf(":"));
    
    const [contactOption, setContactOption] = useState('');
    const [meetingDT, setMeetingDT]=useState(localISOTime);
    const [attendList, setAttendList] = useState([]); //https://javascript.plainenglish.io/how-to-add-to-an-array-in-react-state-3d08ddb2e1dc
    const [currentAttendee, setAttendee] = useState("");
    const [currentMessage, setCurrentMessage] = useState("");
    const [disabledTF, setDisable] = useState(false);
    const [errorTF, setError] = useState(false);
    const [errorMessage, setErrorMessage]= useState("Invalid Input");

    /**
     * Styling Social Media Icons using MUI styling
     * change icon size, margin and color to match existing theme
    */
    const theme = createTheme({
        components: {
          MuiIcon: {
            variants: [
              {
                props: { variant: 'social' },
                style: {
                  fontSize: "xx-large",
                },
              },
            ],
          },
        },
      })

      const SocialMediaIcon = styled(Icon)(({ theme }) => ({
        fontSize: "xx-large",
        margin: 10,
        color:'var(--social_media_icon_color)'
      }))

    /***
     * For schedule meeting, handle fields for scheduling meeting
     * //Need to check for duplicates and verify email address
     * */
    function handleAttendList (){
        if(currentAttendee===""){
            //prevent submitting empty fields
            setErrorMessage("Empty Email Address.");
            setError(true);
        }else if(attendList.includes(currentAttendee)){
            //prevent duplicates
            setErrorMessage("Email is already exists.");
            setError(true);
        }else if(!isEmail(currentAttendee)){
            //prevent invalid emails
            setErrorMessage("Email Invalid");
            setError(true);

        }else{
            setError(false);
            setAttendList(attendList =>[currentAttendee, ...attendList]); //have the neweset attendee at top of list
            setAttendee(''); //Clear attendee text field so user doesn't have to clear it to type next person
        }
    };
    /**
     * Remove Attendees from list (typing error etc...)
     * */
    function removeAttendList(remoteAttendee){
        const filteredAttendList = attendList.filter((item)=>{return item!==remoteAttendee});
        setAttendList(filteredAttendList);
    }

    /**
     * 
     * */
    function showAdditional(showField){
        if(showField==="email"){
            return <p>Selina's email is: [email address].</p>
        }else if(showField==="phone"){
            return <p>Selina's phone number is: [phone number].</p>
        }else if(showField==="videoCall"){
            return (<div>
                <p>Let's schedule a meeting.</p>
                <p>When would you like the meeting?</p>
                <TextField
                    required
                    id="datetime-meeting"
                    label="Talk to Selina"
                    type="datetime-local"
                    defaultValue={localISOTime}
                    sx={{ width: "100%" }}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    disabled={disabledTF}
                    onChange={(event)=>{
                        setMeetingDT(event.target.value)}}
                />
                <p style={{marginBottom: "0"}}>Where should I send the meeting invite? </p> {/**Ask email address of attendees + - to add*/}
                {/**How to create google meeting?*/}
                <div style={{minHeight: "70px"}}><TextField 
                    disabled={disabledTF}
                    className="add_attendee"
                    label="Attendee email"
                    variant="standard" 
                    required 
                    sx={{marginLeft: "2%", width:"75%"}} 
                    error = {errorTF}
                    helperText={errorTF && errorMessage}
                    value = {currentAttendee} 
                    onChange = {(event)=> {setAttendee(event.target.value)}}
                    onKeyPress={(event) => {
                        if (event.key === 'Enter') {
                            //enter button pressed while typing in emails; auto add to list (dont need to press button)
                            event.preventDefault();
                            handleAttendList();
                        }
                      }} 
                    />
                    <Button disabled={disabledTF}  sx={{paddingTop: "8%", paddingBottom: "4%", paddingX: "0"}} onClick={handleAttendList}><AddIcon/></Button>
                    </div>
                {/*Map attendee list to list off attendees*/}
                    {attendList.map((email, index)=>{
                        return (<div key={email} disabled={disabledTF} className="attendingList">
                            <Button className="attendingListIcon" sx={{display:"none", fontSize:"small", marginRight: "3%", padding:"0", minWidth: "0"}} onClick={()=>{removeAttendList(email)}} disabled = {disabledTF}>
                                <DeleteIcon sx={{verticalAlign:"bottom"}}/>
                            </Button>
                                <p style={{display:"inline"}}>{email}</p>
                        </div>)
                    
                    })}
                <br></br>
                <center>
                <Button
                    variant="outlined"
                    disabled={disabledTF} 
                    onClick={() => {
                        //needs valid date time and attendee list
                        if(attendList.length===0){
                            setErrorMessage("Empty Attendee List.");
                         setError(true);   
                        }else if(attendList.length!==0){
                            setError(false); //clear attendee field error messages
                            setAttendee(''); //clear attendee field
                            setDisable(true);
                            props.parentMessage("Okay, if this date and time works with Selina, attendees will receive an email invite.");
                            console.log("Send Meeting Invite to: " + attendList + "\n to meet at "+meetingDT);
                            alert('This is just a proof of concept; this meeting is NOT scheduled.');
                        }
                        
                    }}
                    sx={{ marginTop: "2%",textTransform: 'capitalize' }}
                >
                Submit
                </Button>
            </center>
            </div>);
        }else if(showField==="socialMedia"){
            return (<div><br></br><center>
                <ThemeProvider theme={theme}>
                    <a target="_blank" rel="noreferrer" href="https://www.facebook.com/"><SocialMediaIcon component={FacebookIcon } /></a>
                    <a target="_blank" rel="noreferrer" href="https://www.instagram.com/"><SocialMediaIcon component={InstagramIcon } /></a>
                    <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/"><SocialMediaIcon component={LinkedInIcon } /></a>
                    <a target="_blank" rel="noreferrer" href="https://www.twitter.com/"><SocialMediaIcon component={TwitterIcon} /></a>
                </ThemeProvider>

            <br></br>
            </center></div>)

        }else if(showField==="leaveMessage"){
            return(<div className="leaveMessage" style={{width:"100%"}}>
                <TextField 
                    disabled={disabledTF}
                    className="leave_message"
                    label="Leave Message for Selina"
                    variant="filled" 
                    required 
                    multiline
                    rows={4}
                    error = {errorTF}
                    helperText={errorTF &&"Empty Response"}
                    sx={{marginTop: "4%", width:"100%"}} 
                    value = {currentMessage} 
                    onChange = {(event)=> {setCurrentMessage(event.target.value)}}
                    />

                <center><Button
                    variant="outlined"
                    disabled={disabledTF}
                    onClick={() => {
                        if(currentMessage===""){
                            setError(true);
                        }
                        else{
                            setDisable(true);
                            setError(false);
                            console.log("Send this message to Selina: " + currentMessage);
                            props.parentMessage("Okay, the message has been sent.");

                            alert('This is just a proof of concept; this message is NOT sent.');
                        }
                        
                    }}
                    sx={{ marginTop: "2%",textTransform: 'capitalize' }}
                >
                Submit
                </Button></center>
                
                </div>)

        }

    };

    return (
        <div className="rcw-response-meeting">
        <div className="rcw-response-meeting-info">
            <p>How do you want to contact her?</p>
            <FormControl sx={{ m: 1, width: "100%", margin: "0"}}>
                <InputLabel id="contact-info-label">Select Contact Method</InputLabel>
                <Select
                    labelId="contact-info-label"
                    id="contact-info-select"
                    value={contactOption}
                    label="Select Contact Method"
                    onChange={(event) => {
                        setContactOption(event.target.value);
                    }}
                    disabled={disabledTF}
                    MenuProps={{
                        style: {zIndex: 100001},
                        PaperProps: {
                            style: {
                              maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                              width: 250,
                            },
                          },
                    }}
                >
                <MenuItem value=""> <em>None</em> </MenuItem>
                <MenuItem value={"email"}>Email (preferred)</MenuItem>
                <MenuItem value={"phone"}>Phone Call/Voicemail</MenuItem>
                <MenuItem value={"videoCall"}>Schedule a Video Chat</MenuItem>
                <MenuItem value={"socialMedia"}>Social Media</MenuItem>
                <MenuItem value={"leaveMessage"}>Leave a Message</MenuItem>
                </Select>
            </FormControl>
            {showAdditional(contactOption)}

            
        </div>
        <div className="rcw-timestamp">
                <p>{timeNow}</p>
            </div>
        </div>
    );
}

export default ContactInfo;

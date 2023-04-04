/**
 * Chat window show video embedded video 
 * 
*/

function VideoResponse(props) {
    const classNames = ["rcw-response rcw-message-text", "rcw-snippet"];
    const timeNow = new Date().toLocaleTimeString([], {hour12: true, hour: '2-digit', minute:'2-digit'}).replace("AM","").replace("PM","");

    return (
    <div className="rcw-message-video">
        <div className= {classNames.join(" ")}>
            <p>{props.details} </p>
            <br></br>
            <iframe src={props.url+"?autoplay=1&mute=1"} 
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen>
            </iframe>
        </div>
        <div className="rcw-timestamp">
                <p>{timeNow}</p>
            </div>
    </div>
    );
}

export default VideoResponse;

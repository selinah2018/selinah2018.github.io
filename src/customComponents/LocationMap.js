import './LocationMap.css';
//Mapping Imports for leaflet via react-leaflet
import { MapContainer, TileLayer,CircleMarker, Tooltip} from 'react-leaflet';

function LocationMap(props) {
    const timeNow = new Date().toLocaleTimeString([], {hour12: true, hour: '2-digit', minute:'2-digit'}).replace("AM","").replace("PM","");
    const centerCoordinates= props.coordinates; //latitude, longitude]
    const purpleOptions = { color: '#544765' };

    return (
    <div className="rcw-response-map">
        <div className="rcw-response-map-interface">
            <MapContainer center={centerCoordinates} zoom={4.25} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <CircleMarker
            center={centerCoordinates}
            pathOptions={purpleOptions}
            radius={75}>
            <Tooltip>Somewhere here!</Tooltip>
        </CircleMarker>
            </MapContainer>
            <br></br>
            <p>{props.message}</p>
        </div>
        <div className="rcw-timestamp">
                <p>{timeNow}</p>
            </div>

    </div>
    );
}

export default LocationMap;

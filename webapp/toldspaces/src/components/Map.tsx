import React, {useEffect, useRef, useState} from "react";
import {createTheme} from '@mui/material/styles';
// @ts-ignore
import mapboxgl from '!mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export const theme = createTheme();
const mapContainerStyle = {
    width: "100%",
    height: "400px",
}

const Map = () => {

    const mapContainerRef = useRef()
    const [map, setMap] = useState(null)
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(15);

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiaG93emF0NzUiLCJhIjoiY2w1cDhhcDN5MWwwYTNwcGE4eHJicnRzYyJ9.5YeygozhwnsQPnILsFrsxg'

        // @ts-ignore
        const initializeMap = ({setMap, mapContainerRef}) => {
            console.log("initialising map", lat.valueOf())
            const map = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: "mapbox://styles/mapbox/streets-v11",
                center: [lat.valueOf(), lng.valueOf()],
                zoom: zoom.valueOf()
            });

            map.on("load", () => {
                setMap(map);
                map.resize();
            });

            map.addControl(new mapboxgl.NavigationControl(), "top-right")
            new mapboxgl.Marker({color: '#1E3873'}).setLngLat([-0.098301, 50.862563]).addTo(map)
            map.flyTo({
                center: [-0.098301, 50.862563]
            });
        };

        if (!map) {
            initializeMap({setMap, mapContainerRef});
        }

        return () => {
            if (!map) {
                map.remove()
            }
        };
    }, []);

    // @ts-ignore
    return <div ref={mapContainerRef} style={mapContainerStyle}/>
}

export default Map
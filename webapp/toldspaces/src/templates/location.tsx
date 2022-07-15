import * as React from "react";
import {graphql, PageProps} from "gatsby";
import {GatsbyImage, getImage} from "gatsby-plugin-image"
import {IGatsbyImageData} from "gatsby-plugin-image/dist/src/components/gatsby-image.browser";
import Typography from "@mui/material/Typography";
import MainLayout from "../layouts/MainLayout";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
// import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

// const Item = styled(Paper)(({theme}) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
// }));

const LocationTemplate = ({data, pageContext}: PageProps<Queries.Query>) => {
    // mapboxgl.accessToken = 'pk.eyJ1IjoiaG93emF0NzUiLCJhIjoiY2w1bWtyMWZzMGM1MzNqa2MwbzMzeHc4dSJ9.QFdrWEOBIFmXoUED1cAs7g';
    //
    //
    // const map = new mapboxgl.Map({
    //     container: 'map', // container ID
    //     style: 'mapbox://styles/mapbox/streets-v11', // style URL
    //     center: [-74.5, 40], // starting position [lng, lat]
    //     zoom: 9, // starting zoom
    //     projection: 'globe' // display the map as a 3D globe
    // });
    // map.on('style.load', () => {
    //     map.setFog({}); // Set the default atmosphere style
    // });

    console.log("data", data)
    console.log("pageContext", pageContext)
    let allLocationsJson = data.allLocationsJson;
    let locationJson = allLocationsJson.nodes[0];

    let imageFile = locationJson.image!;
    // @ts-ignore
    let img: IGatsbyImageData = getImage(imageFile);
    return (
      <MainLayout>
          <Container sx={{py: 8}} maxWidth="md">
              <Grid sx={{flexGrow: 1}} container spacing={2}>
                  <Grid item>
                      <Card variant="outlined" sx={{maxWidth: 300}}>
                          <CardContent>
                              <Typography variant={"h6"} color="text.secondary" gutterBottom>
                                  {locationJson.name}
                              </Typography>
                              <Typography variant={"h7"} color="text.secondary" gutterBottom>
                                  {locationJson.text}
                              </Typography>
                              <GatsbyImage image={img} alt={locationJson.name!}/>
                          </CardContent>
                          <CardActions>
                              <Button size="medium">Learn More</Button>
                          </CardActions>
                      </Card>
                  </Grid>
                  <Grid item>
                      <Card variant="outlined" sx={{maxWidth: 300}}>
                          <CardContent>
                              <Typography variant={"h6"} color="text.secondary" gutterBottom>
                                  FIND ME IF YOU CAN
                              </Typography>

                          </CardContent>
                          <CardActions>
                              <Button size="medium">Learn More</Button>
                          </CardActions>
                      </Card>
                  </Grid>
              </Grid>
          </Container>
      </MainLayout>
    )
}

export default LocationTemplate

export const query = graphql`
    query LocationTemplateQuery($sid:String!) {
        allLocationsJson(filter:{sid: {eq: $sid}})
        {
            nodes
            {
                sid
                name
                text
                image
                {
                    childImageSharp{
                        fluid(maxWidth:1000, quality:100){
                            ...GatsbyImageSharpFluid
                        }
                        gatsbyImageData(placeholder:TRACED_SVG,formats:JPG)
                    }
                }
                description
                coords
                {
                    lat
                    lng
                }
            }
        }
    }`



import React from 'react';
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
import Map from "../components/Map";

// @ts-ignore
import mapboxgl from '!mapbox-gl';

const LocationTemplate = ({data, pageContext}: PageProps<Queries.Query>) => {
    console.log("data", data)
    console.log("pageContext", pageContext)
    let allLocationsJson = data.allLocationsJson;
    let locationJson = allLocationsJson.nodes[0];

    let imageFile = locationJson.image!;
    // @ts-ignore
    let img: IGatsbyImageData = getImage(imageFile);
    return (
      <MainLayout>
          <Container xs={{py: 8}} maxWidth="md">
              <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 2, sm: 6, md: 12}}>
                  <Grid item xs={2} sm={4} md={12}>
                      <Card variant="outlined">
                          <CardContent>
                              <Typography variant={"h5"} color="text.primary" gutterBottom>
                                  <p>{locationJson.name}</p>
                              </Typography>
                              <Typography variant={"h7"} color="text.secondary" gutterBottom>
                                  <p>{locationJson.text}</p>
                              </Typography>
                              <Map/>
                          </CardContent>
                      </Card>
                  </Grid>
                  <Grid item xs={2} sm={4} md={12}>
                      <Card variant="outlined">
                          <CardContent>
                              <Typography variant={"h6"} color="text.secondary" gutterBottom>
                                  FIND ME IF YOU CAN
                              </Typography>
                              <GatsbyImage image={img} alt={locationJson.name!}/>
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
                        gatsbyImageData(placeholder:TRACED_SVG,formats:JPG, transformOptions: { fit: FILL })
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



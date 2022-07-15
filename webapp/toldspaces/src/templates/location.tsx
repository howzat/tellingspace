import {graphql, PageProps} from "gatsby";
import {GatsbyImage, getImage} from "gatsby-plugin-image"
import {IGatsbyImageData} from "gatsby-plugin-image/dist/src/components/gatsby-image.browser";
import * as React from "react";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import {styled} from "@mui/material/styles";
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import {Copyright} from "../components/Copyright";
import MainLayout from "../layouts/MainLayout";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

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
          <Box>
              <h1>{locationJson.name}</h1>
              <h2>{locationJson.text}</h2>
              <Stack spacing={2}>
                  <Item>Item 1</Item>
                  <Item>Item 2</Item>
                  <Item><GatsbyImage image={img} alt={locationJson.name!}/></Item>
              </Stack>
          </Box>
          <Box sx={{bgcolor: 'background.paper', p: 6}} component="footer">
              <Typography variant="h6" align="center" gutterBottom>
                  Footer
              </Typography>
              <Typography
                variant="subtitle1"
                align="center"
                color="text.secondary"
                component="p"
              >
                  TOLDSPACES is an experiment in making things outside
              </Typography>
              <Copyright/>
          </Box>
      </MainLayout>
    )
}

export default LocationTemplate

export const query = graphql`
    query LocationTemplateQuery($sid:String!) {
        allLocationsJson(filter: {sid: {eq: $sid}}) {
            nodes {
                sid
                name
                text
                image {
                    childImageSharp {
                        gatsbyImageData(
                            placeholder: DOMINANT_COLOR,
                            formats: JPG
                            width: 200
                        )
                    }
                }
                description
                coords {
                    lat
                    lng
                }
            }
        }
    }`
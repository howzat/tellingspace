import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import React from "react"
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Navigation} from "../components/Navigation";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {graphql, PageProps} from "gatsby";
import {IGatsbyImageData} from "gatsby-plugin-image/dist/src/components/gatsby-image.browser";
import {GatsbyImage, getImage} from "gatsby-plugin-image";

function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="https://toldspaces.com/">
              TOLDSPACES.COM
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
      </Typography>
    );
}


const theme = createTheme();

export const NewNavigationFromLocationsQuery = (data: Queries.LocationsJsonConnection): JSX.Element => {
    return <Navigation data-testid="nav" links={
        data.nodes.map((node) => {
            return {to: `/locations/${node.sid}`, text: node.text}
        })
    }
    />
}

const IndexPage = ({data}: PageProps<Queries.Query>) => {

    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    let locations = data.allLocationsJson.nodes;

    const imageMap = new Map<string, IGatsbyImageData>()
    locations.map((location) => {
        // @ts-ignore
        let i: IGatsbyImageData = getImage(location.image!);
        imageMap.set(location.sid, i)
    })

    return (
      <ThemeProvider theme={theme}>
          <CssBaseline/>
          <AppBar position="relative">
              <Toolbar>
                  <Typography variant="h9" color="inherit" noWrap>
                      TOLDSPACES
                  </Typography>
              </Toolbar>
          </AppBar>
          <main>
              {/* Hero unit */}
              <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 8,
                    pb: 6,
                }}
              >
                  <Container maxWidth="sm">
                      <Typography
                        component="h4"
                        variant="h5"
                        align="center"
                        color="text.primary"
                        gutterBottom
                      >
                          LOCATIONS
                      </Typography>
                      <Typography variant="h5" align="center" color="text.secondary" paragraph>
                          Story Fragments throughout the park
                      </Typography>
                      <Stack
                        sx={{pt: 4}}
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                      >
                          <Button variant="contained">Main call to action</Button>
                          <Button variant="outlined">Secondary action</Button>
                      </Stack>
                  </Container>
              </Box>
              <Container sx={{py: 8}} maxWidth="md">
                  {/* End hero unit */}
                  <Grid container spacing={4}>
                      {locations.map((location) => (
                        <Grid item key={location.sid} xs={12} sm={6} md={4}>
                            <Card
                              sx={{height: '100%', display: 'flex', flexDirection: 'column'}}
                            >
                                {/*<CardMedia*/}
                                {/*  component="img"*/}
                                {/*  sx={{*/}
                                {/*      // 16:9*/}
                                {/*      pt: '56.25%',*/}
                                {/*  }}*/}
                                {/*  image={location.image!}*/}
                                {/*  alt="random"*/}
                                {/*/>*/}
                                <GatsbyImage image={imageMap.get(location.sid)} alt={location.name!}/>
                                <CardContent sx={{flexGrow: 1}}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Heading
                                    </Typography>
                                    <Typography>
                                        {location.text}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" href={`locations/${location.sid}`}>View</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                      ))}
                  </Grid>
              </Container>
          </main>
          {/* Footer */}
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
          {/* End footer */}
      </ThemeProvider>
    )
}

export default IndexPage


export const query = graphql`
    query IndexPageQuery {
        allLocationsJson {
            nodes {
                sid
                name
                text
                image {
                    childImageSharp {
                        gatsbyImageData(placeholder: DOMINANT_COLOR, formats: JPG)
                    }
                }
                description
                coords {
                    lat
                    lng
                }
            }
        }
    }
`

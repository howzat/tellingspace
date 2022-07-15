import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import React from "react"
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {createTheme} from '@mui/material/styles';
import {IGatsbyImageData} from "gatsby-plugin-image/dist/src/components/gatsby-image.browser";
import {GatsbyImage, getImage} from "gatsby-plugin-image";
import {useAllLocations} from "../hooks/use-locations";
import MainLayout from "../layouts/MainLayout";

export const theme = createTheme();

const IndexPage = (): JSX.Element => {

    const locations: Array<Queries.LocationsJson> = useAllLocations()
    const imageMap = new Map<string, IGatsbyImageData>()
    locations.map((location) => {
        // @ts-ignore
        let i: IGatsbyImageData = getImage(location.image!);
        imageMap.set(location.sid, i)
    })

    return (

      <MainLayout foo={'ddd'}>
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
                      <Button variant="contained">This, that</Button>
                      <Button variant="outlined">and the other</Button>
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
                                    {location.name}
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
      </MainLayout>
    )
}

export default IndexPage
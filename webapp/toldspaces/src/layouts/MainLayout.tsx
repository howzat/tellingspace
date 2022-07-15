import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import React from "react"
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {NewNavigationFromLocationsQuery} from "../components/Navigation";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {IGatsbyImageData} from "gatsby-plugin-image/dist/src/components/gatsby-image.browser";
import {getImage} from "gatsby-plugin-image";
import {Copyright} from "../components/Copyright";
import {useAllLocations} from "../hooks/use-locations";
import {PageProps} from "gatsby";

export const theme = createTheme();

export type MainLayoutProps = {
    children?: React.ReactNode
}
const MainLayout = (props: PageProps<MainLayoutProps>) => {

    const locations: Array<Queries.LocationsJson> = useAllLocations()
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
                  <Typography variant="h6" component="div" color="inherit" noWrap
                              sx={{flexGrow: 1}}>TOLDSPACES</Typography>
                  {NewNavigationFromLocationsQuery()}
              </Toolbar>
          </AppBar>
          <main>
              <>
                  {props.children}
              </>
          </main>
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
      </ThemeProvider>

    )
}

export default MainLayout
import React from "react"
import MainLayout from "../layouts/MainLayout";
import Map from "../components/Map";
import Container from "@mui/material/Container";

const MapPage = (): JSX.Element => {

    return (
      <MainLayout>
          <Container maxWidth="sm">
              <Map/>
          </Container>
      </MainLayout>
    )
}

export default MapPage
import React from "react"
import {MainLayout} from "../layouts/MainLayout";
import {graphql, PageProps} from "gatsby";
import flatprint from "../flatprint";

const LocationTemplate = ({data, pageContext}: PageProps<Queries.LocationsJson>) => {

    flatprint("data", data)
    flatprint("pageContext", pageContext)
    return (
      <>
          <MainLayout>
              <h1>Location Page </h1>
          </MainLayout>
      </>
    )
}

export default LocationTemplate

export const query = graphql`
    query queryBySid($sid:String) {
        allLocationsJson(filter: {sid: {eq: $sid}}) {
            nodes {
                sid
                name
                text
                image
                description
                coords {
                    lat
                    lng
                }
            }
        }
    }
`
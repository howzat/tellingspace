import React from "react"
import {NewNavigationFromLocationsQuery} from "../components/Navigation";
import {graphql, useStaticQuery} from "gatsby";


export const MainLayout = (props: any): JSX.Element => {

  const data = useStaticQuery(graphql`{
      allLocationsJson {
          nodes {
              sid
              text
          }
      }
  }`)

    return (
      <>
          {NewNavigationFromLocationsQuery(data.allLocationsJson)}
          {props.children}
      </>
    )
}
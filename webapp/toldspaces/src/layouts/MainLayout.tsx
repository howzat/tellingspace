import React from "react"
import {NewNavigationFromLocationsQuery} from "../components/Navigation";
import {graphql, useStaticQuery} from "gatsby";

export type MainLayoutProps = {
    children?: React.ReactNode
}

export const MainLayout = ({children}: MainLayoutProps): JSX.Element => {

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
          {children}
          <ol>
              <li>this</li>
              <li>that</li>
              <li>the other</li>
          </ol>
      </>
    )
}
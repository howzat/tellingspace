import React from "react"
import {Navigation, NavigationProps} from "../components/Navigation";
import {graphql, useStaticQuery} from "gatsby";

export type MainLayoutProps = {
  navigationItems: NavigationProps
  children?: React.ReactNode
}

export const MainLayout = ({navigationItems}: MainLayoutProps): JSX.Element => {
  console.log("MainLayout navigationItems", navigationItems)

  const data = useStaticQuery(graphql`
    query NavigationItemsQuery {
      allLocationsJson {
        nodes {
          sid
        }
      }
    }
  `)

  let items: NavigationProps = {
    links: [{
      text: "element 1",
      to: "string 1",
    }, {
      text: "element 2",
      to: "string 2",
    }]
  }

  // const links: Array<LinkData> = data.map( (sid:string) => { {text: sid, to: sid } as LinkData})

  return (
    <>
      <Navigation links={items.links}/>
      <ol>
        <li>this</li>
        <li>that</li>
        <li>the other</li>
      </ol>
    </>
  )
}


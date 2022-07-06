import React from "react"
import {MainLayout} from "../layouts/MainLayout";
import {SiteNavigationProps} from "../components/Navigation";
import {graphql} from "gatsby";
import flatprint from "../flatprint";

export type LocationTemplateProps = {
  data: LocationProps
  pageContext?: any
}

export type LocationProps = {
  sids: Array<string>
  sid: string
}

const LocationTemplate = ({data, pageContext}: LocationTemplateProps) => {

  flatprint("data", data)
  flatprint("pageContext", pageContext)

  let items: SiteNavigationProps = {
    links: [{
      text: "element 1",
      to: "string 1",
    }, {
      text: "element 2",
      to: "string 2",
    }]
  }

  console.log("LocationTemplate items", items)
  return (
    <>
        <h1>So this is christmas</h1>
        <p>And what have we done</p>
        <MainLayout navigationItems={items}><h1>Location Page </h1></MainLayout>
    </>
  )
}

export default LocationTemplate

export const query = graphql`
  query queryBySid($sid:String) {
      allLocationsJson(filter: {sid: {eq: $sid}}) {
          nodes {
              sid
          }
      }
  }
`
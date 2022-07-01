import React from "react"
import {MainLayout} from "../layouts/MainLayout";
import {SiteNavigationProps} from "../components/Navigation";
import {graphql} from "gatsby";

export type LocationTemplateProps = {
  data: LocationProps
  pageContext?: any
}

export type LocationProps = {
  sids: Array<string>
  sid: string
}

const LocationTemplate = ({data, pageContext}: LocationTemplateProps) => {

  console.log("data", data)
  console.log("pageContext", pageContext)
  console.log("data.sid", pageContext.pc.sid)
  console.log("data.sids", pageContext.pc.sids)

  let items: SiteNavigationProps = {
    links: [{
      text: "element 1",
      to: "string",
    }, {
      text: "element 2",
      to: "string",
    }]
  }

  console.log("LocationTemplate items", items)
  return (
    <>
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
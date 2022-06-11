import React from "react"
import {MainLayout} from "../layouts/MainLayout";
import {SiteNavigationProps} from "../components/Navigation";

const LocationTemplate = (data: any) => {

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
      <MainLayout name={"ben"} navigationItems={items}><h1>Location Page </h1></MainLayout>
    </>
  )
}

export default LocationTemplate
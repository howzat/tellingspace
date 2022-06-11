import React from "react"
import {SiteNavigation, SiteNavigationProps, LinkData} from "../components/Navigation";

export type MainLayoutProps = {
  navigationItems: SiteNavigationProps
  name: string
  children?: React.ReactNode
}

export const MainLayout = ({name, navigationItems}: MainLayoutProps): JSX.Element => {
  console.log("MainLayout name", name)
  console.log("MainLayout navigationItems", navigationItems)
  return (
    <>
    <SiteNavigation links={navigationItems.links}/>
    <ol>
      <li>this</li>
      <li>that</li>
      <li>the other</li>
    </ol>
    </>
  )
}
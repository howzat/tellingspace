import {Link} from "gatsby";
import React from "react";

export type NavigationProps = {
    links: Array<LinkData>;
}

export type LinkData = {
    text: string;
    to: string;
}
type NavItem = {
    name: string;
    href: string;
    current: string;
}

export const Navigation = ({links}: NavigationProps): JSX.Element => {
    console.log("SiteNavigation links", links)
    return (

      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
              <span className="font-semibold text-l tracking-tight">ToldSpaces</span>
          </div>
          <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
              <div className="text-sm lg:flex-grow">

                  <span data-testid="links">
                      {
                          links.map(v =>
                            <div key={v.to} className={"container drop-shadow-md text-xs"}>
                                <Link data-testid={`link-${v.to}`} key={v.to} to={v.to}
                                      className={" mt-4 lg:inline-block lg:mt-0 text-xs tracking-tight text-white hover:text-white mr-4 rounded hover:bold"}>{v.text}
                                </Link>
                            </div>
                          )
                      }
                  </span>
              </div>
          </div>
      </nav>
    )
}
export const NewNavigationFromLocationsQuery = (data: Queries.LocationsJsonConnection): JSX.Element => {
    return <Navigation data-testid="nav" links={
        data.nodes.map((node) => {
            return {to: `/locations/${node.sid}`, text: node.text}
        })
    }
    />
}

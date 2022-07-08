import {Link} from "gatsby";
import React from "react";

export type NavigationProps = {
    links: Array<LinkData>;
}

export type LinkData = {
    text: string;
    to: string;
}

export const Navigation = ({links}: NavigationProps): JSX.Element => {
    console.log("SiteNavigation links", links)
    return (

      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
              <span className="font-semibold text-xl tracking-tight">ToldSpaces</span>
          </div>
          <div className="block lg:hidden">
              <button
                className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                  <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <title>Menu</title>
                      <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                  </svg>
              </button>
          </div>
          <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
              <div className="text-sm lg:flex-grow">

                  <span data-testid="links">
                      {
                          links.map(v =>
                            <div key={v.to} className={"container drop-shadow-md text-xs"}>
                                <Link data-testid={`link-${v.to}`} key={v.to} to={v.to}
                                      className={"block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4 rounded hover:bold"}>{v.text}
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
            return {to: node.sid, text: node.text}
        })
    }
    />
}

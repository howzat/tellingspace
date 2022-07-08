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
      <header>
        <span data-testid="links">
      {
          links.map(v =>
            <div key={v.to} className={"container drop-shadow-md text-xs"}>
                <Link data-testid={`link-${v.to}`} key={v.to} to={v.to}
                      className={"box-decoration-slice bg-gradient-to-r from-teal-900 to-emerald-500 text-white p-1 m-1 rounded hover:bold"}>{v.text} and
                    all that
                </Link>
            </div>
          )
      }
        </span>
      </header>
    )
}

export const NewNavigationFromLocationsQuery = (data: Queries.LocationsJsonConnection): JSX.Element => {
    console.log('navigation items', data)
    return <Navigation data-testid="nav" links={
        data.nodes.map((node) => {
            return {to: node.sid, text: node.text}
        })
    }
    />
}

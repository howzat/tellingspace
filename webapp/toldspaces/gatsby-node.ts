import {CreatePagesArgs} from "gatsby";
import fs from "fs";
import path from "path";
import flatprint from "./src/flatprint";

export const createPages = async (
    gatsbyContext: CreatePagesArgs,
): Promise<void> => {
    const {
        actions,
        graphql,
        reporter,
    } = gatsbyContext
    const { createPage } = actions

    const result = await graphql(`{
      allLocationsJson {
        nodes {
          sid
          image
        }
      }
    }`)

    if (result.errors) {
        reporter.log("graphql query failed")
        reporter.error(result.errors)
    }

    let locationTemplate = `${__dirname}/src/templates/location.tsx`;
    let s = path.resolve(locationTemplate);
    console.log(s);

    if (!fs.existsSync(s)) {
        console.error("DOES NOT exist:", s);
    }

    flatprint("graphql result returned ok", result)

    // @ts-ignore
    let nodes = result.data.allLocationsJson.nodes;
    let sids = nodes.map((p: { sid: string; }) => p.sid);
    const pcs = {
        data: {
            sids: sids,
        }
    }

    // @ts-ignore
    nodes.forEach(node => {
        const path = `/locations/${node.sid}/`
        const component = `${s}`
        console.log("path", path)
        console.log("component", component)
        let args = {
            path,
            component,
            context: {
                sids: sids,
                pc: pcs,
                pagePath: path,
            },
        };
        console.log("args", args)
        createPage(args)
    });
}


export const createSchemaCustomization = async (
    gatsbyContext: CreatePagesArgs,
): Promise<void> => {
    const {
        actions,
        graphql,
        reporter,
    } = gatsbyContext
    const { createTypes } = actions
    const typeDefs = `
    type LocationsJson implements Node {
       sid : String!
       name : String!
       text : String!
       image : String!
       description: String!
       coords : Coord!
    }
    
    type Coord {
      lat : Float!
      lng : Float!
    } 
  `
    createTypes(typeDefs)
}



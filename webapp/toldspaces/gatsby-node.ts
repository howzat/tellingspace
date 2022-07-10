import {CreatePagesArgs} from "gatsby";
import fs from "fs";
import path from "path";

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
        }
      }
    }`)

    if (result.errors) {
        reporter.log("graphql query failed")
        reporter.error(result.errors)
    }

    let templatePath = path.resolve(`${__dirname}/src/templates/location.tsx`);
    if (!fs.existsSync(templatePath)) {
        console.error("DOES NOT exist:", templatePath);
    }

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
        const component = `${templatePath}`
        let args = {
            path,
            component,
            context: {
                sid: node.sid,
                pagePath: path,
            },
        };
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



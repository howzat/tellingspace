import type {GatsbyConfig} from "gatsby"

const config: GatsbyConfig = {
    siteMetadata: {
        title: `toldspaces`,
        siteUrl: `https://www.yourdomain.tld`
    },
    // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
    // If you use VSCode you can also use the GraphQL plugin
    // Learn more at: https://gatsby.dev/graphql-typegen
    graphqlTypegen: true,
    plugins: [
        "gatsby-plugin-image",
        "gatsby-plugin-sharp",
        "gatsby-transformer-sharp",
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                "name": "images",
                "path": "./src/images/",
                ignore: [`**/\.*`] // ignore files starting with a dot
            },
            __key: "images"
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `./src/data/locations`,
                name: `locations`,
                ignore: [`**/\.*`] // ignore files starting with a dot
            },
        },
        "gatsby-plugin-postcss",
        "gatsby-plugin-react-helmet",
        "gatsby-plugin-sitemap",
        "gatsby-transformer-json",
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                "icon": "./src/images/icon.png"
            }
        },
    ]
}

export default config

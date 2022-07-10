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
        `gatsby-plugin-material-ui`,
        {
            resolve: `gatsby-theme-material-ui`,
            options: {
                webFontsConfig: {
                    fonts: {
                        google: [
                            {
                                family: `Montserrat`,
                                variants: [`300`, `400`, `500`],
                            },
                        ],
                    },
                },
            },
        },
        `gatsby-plugin-image`,
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                "name": "images",
                "path": `${__dirname}/src/images`,
                ignore: [`**/\.*`] // ignore files starting with a dot
            },
            __key: "images"
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/src/data/locations`,
                name: `locations`,
                ignore: [`**/\.*`] // ignore files starting with a dot
            },
        },
        "gatsby-plugin-react-helmet",
        "gatsby-plugin-sitemap",
        "gatsby-transformer-json",
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `ToldSpaces`,
                short_name: `ToldSpaces`,
                description: `Exploring spaces using stories`,
                lang: `en`,
                start_url: `/`,
                background_color: `#25A08B`,
                display: `standalone`,
                icon: `${__dirname}/src/images/icon.png`,
            },
        }
    ]
}

export default config

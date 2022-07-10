import React from "react"
import {MainLayout} from "../layouts/MainLayout";
import {graphql, PageProps} from "gatsby";
import {GatsbyImage, getImage} from "gatsby-plugin-image"
import {IGatsbyImageData} from "gatsby-plugin-image/dist/src/components/gatsby-image.browser";

const LocationTemplate = ({data, pageContext}: PageProps<Queries.Query>) => {

    // flatprint("data", data)
    // flatprint("pageContext", pageContext)
    let locationJson = data.allLocationsJson.nodes[0];

    let imageFile = locationJson.image!;
    // @ts-ignore
    let img: IGatsbyImageData = getImage(imageFile);
    return (
      <>
          <MainLayout>
              <h1>{locationJson.name}</h1>
              <h2>{locationJson.text}</h2>
              <GatsbyImage image={img} alt={locationJson.name!}/>
          </MainLayout>
      </>
    )
}

export default LocationTemplate

export const query = graphql`
    query LocationTemplateQuery($sid:String!) {
        allLocationsJson(filter: {sid: {eq: $sid}}) {
            nodes {
                sid
                name
                text
                image {
                    childImageSharp {
                        gatsbyImageData(
                            placeholder: DOMINANT_COLOR,
                            formats: JPG
                            width: 200
                        )
                    }
                }
                description
                coords {
                    lat
                    lng
                }
            }
        }
    }`
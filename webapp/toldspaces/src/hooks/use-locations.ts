import {graphql, useStaticQuery} from "gatsby"

export const useAllLocations = (): Array<Queries.LocationsJson> => {
  const {allLocationsJson} = useStaticQuery(
    graphql`
      query allLocationsJson {
        allLocationsJson{
          nodes {
            sid
            name
            text
            image {
              childImageSharp {
                gatsbyImageData(placeholder: DOMINANT_COLOR, formats: JPG)
              }
            }
            description
            coords {
              lat
              lng
            }
          }
        }
      }
    `)

  console.log('AllLocationsJson', allLocationsJson)
  return allLocationsJson.nodes
}

//
// export type Locations = {
//     readonly nodes: ReadonlyArray<{
//         readonly sid: string
//         readonly name: string
//         readonly text: string
//         readonly description: string
//         readonly image: {
//             readonly childImageSharp: {
//                 readonly gatsbyImageData: import('gatsby-plugin-image').IGatsbyImageData
//             } | null
//         } | null
//         readonly coords: {
//             readonly lat: number
//             readonly lng: number
//         }
//     }>
// }

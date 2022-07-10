/**
 * @jest-environment jsdom
 */
import React from "react";
import {Navigation} from "./Navigation";
import TestRenderer from 'react-test-renderer';
import {useStaticQuery} from 'gatsby'
import {Link} from 'gatsby-theme-material-ui';
import {render} from "@testing-library/react";
import {MainLayout} from "../layouts/MainLayout";

beforeEach(() => {
    // @ts-ignore
    useStaticQuery.mockImplementationOnce(() => {
        return {
            allLocationsJson: {
                nodes: [
                    {
                        sid: "thethunderor",
                        text: "The Journey Begins and the Thunderor Awakes"
                    },
                    {
                        sid: "splinket",
                        text: "Location 2"
                    },
                    {
                        sid: "drblackpill",
                        text: "Location 3"
                    }
                ]
            }
        }
    })
})

describe("<Navigation />", () => {
    it("should render correctly", async () => {
        let testRenderer = TestRenderer.create(<Navigation
          links={[{to: "toValue1", text: "textValue1"}, {to: "toValue2", text: "textValue2"}]}/>);
        expect(testRenderer.toJSON()).toMatchSnapshot()
    });

    it("should display a list of links with the right 'to' fields", async () => {
        let testRenderer = TestRenderer.create(<Navigation
          links={[{to: "toValue1", text: "textValue1"}, {to: "toValue2", text: "textValue2"}]}/>);
        let root = testRenderer.root;

        let findAllByType = root.findAllByType(Link);
        expect(findAllByType[0].props.to).toBe("toValue1")
        expect(findAllByType[0].props.children).toContain("textValue1")

        expect(findAllByType[1].props.to).toBe("toValue2")
        expect(findAllByType[1].props.children).toContain("textValue2")
    });


    it("something about navs", async () => {
        let layout = render(<MainLayout/>);
        // screen.debug();
        let navigation = await layout.findByTestId("links");
        expect(navigation.children).toHaveLength(3);

        // const links = ([['thethunderor','thethunderor'], ['splinket', 'splinket'], ['drblackpill', 'drblackpill']]).map( ([toFind, text]) => {
        //     let navigationLink = layout.findAllByTestId(`link-${toFind}`);
        //     return (text, navigationLink)
        //     //???
        // }).then( p => {}
        //
        //
        // )
        //
        // const lll = await Promise.all(links).then(
        //   p =>
        //   console.log(p)
        // );
        //
        // console.log(lll)
    })
});
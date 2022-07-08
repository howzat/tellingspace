/**
 * @jest-environment jsdom
 */
import React from "react";
import {Navigation} from "../components/Navigation";
import TestRenderer from 'react-test-renderer';
import {Link} from "gatsby"; // ES6

describe("<Navigation />", () => {
    it("should display a list of links with the right 'to' fields", async () => {
        let testRenderer = TestRenderer.create(<Navigation
          links={[{to: "toValue1", text: "textValue1"}, {to: "toValue2", text: "textValue2"}]}/>);
        let root = testRenderer.root;

        let findAllByType = root.findAllByType(Link);
        expect(findAllByType[0].props.to).toBe("toValue1")
        expect(findAllByType[0].props.children).toHaveLength(2)
        expect(findAllByType[0].props.children).toContain("textValue1")

        expect(findAllByType[1].props.to).toBe("toValue2")
        expect(findAllByType[1].props.children).toHaveLength(2)
        expect(findAllByType[1].props.children).toContain("textValue2")
    });
});
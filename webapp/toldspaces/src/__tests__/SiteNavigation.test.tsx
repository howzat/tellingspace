/**
 * @jest-environment jsdom
 */
import React from "react";
import {Navigation} from "../components/Navigation";
import {render, screen} from "@testing-library/react";

describe("<Navigation />", () => {
    it("should display a list of links with the right 'to' fields", async () => {

        let nav = render(<Navigation links={[]}/>);
        const links = screen.getByTestId("links");
        console.log(nav)
        // ???
    });
});
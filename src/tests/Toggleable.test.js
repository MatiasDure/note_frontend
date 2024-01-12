import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Toggleable from "../components/Toggleable";

describe("<Toggleable />", () => {
	let container;

	beforeEach(() => {
		container = render(
			<Toggleable buttonLabel="show...">
				<div className="testDiv">
					toggleable content
				</div>
			</Toggleable>
		).container;
	});

	test("renders its children", async () => {
		const user = userEvent.setup();
		const button = screen.getByText("show...");
		await user.click(button);

		await screen.findAllByText("toggleable content");
	});

	test("at start the children are not displayed", () => {
		const div = container.querySelector(".toggleableContent");
		expect(div).toBeFalsy();
	});

	test("after clicking the button, children are displayed", async () => {
		const user = userEvent.setup();
		const button = screen.getByText("show...");
		await user.click(button);

		const div = container.querySelector(".toggleableContent");
		expect(div).toBeDefined();
	});

	test("after clicking the hide button, children are hidden", async () => {
		const user = userEvent.setup();
		const showBtn = screen.getByText("show...");
		await user.click(showBtn);

		const startDiv = container.querySelector(".toggleableContent");
		expect(startDiv).toBeDefined();

		const hideBtn = screen.getByText("cancel");
		await user.click(hideBtn);

		const endDiv = container.querySelector(".toggleableContent");
		expect(endDiv).toBeFalsy();

	});

});
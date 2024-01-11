import { render } from "@testing-library/react";
import { Button } from "./index.jsx";

describe("<Button/>", () => {
  it("should render the button with the text", () => {
    render(<Button/>)
  });
});

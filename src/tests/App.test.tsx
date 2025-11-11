import { render } from "@testing-library/react";
import App from "../App";

test("renders Expense Splitter header", () => {
  const { getByText } = render(<App />);
expect(getByText((content) => content.includes("Expense Splitter"))).toBeInTheDocument();

});

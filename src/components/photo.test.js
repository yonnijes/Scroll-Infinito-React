import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";

import { Provider } from "react-redux";
import Photos from "./photo";
import generateStore from "../redux/store";

test("render content", () => {
  const store = generateStore();
  const component = render(
    <Provider store={store}>
      <Photos />
    </Provider>
  );

  component.getByText("Loading...");
});

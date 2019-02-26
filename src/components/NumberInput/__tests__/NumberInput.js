import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NumberInput from "../index";

Enzyme.configure({ adapter: new Adapter() });

describe("<NumberInput /> component", () => {
  it("should render without an error", () => {
    const wrapper = shallow(<NumberInput />);
  });
});

import React from "react";
import { LoginForm } from "../../components/Header/Login/LoginForm";
import { shallow } from "enzyme";

describe(`LoginForm`, () => {
  // test(`initial reander`, () => {
  //   const wrapper = shallow(<LoginForm />);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  test("should change input", () => {
    const value = "test";
    const wrapper = shallow(<LoginForm />);
    const name = 'username';

    wrapper.find("input[name='username']").simulate("change", {
      target: {
        name,
        value: "test"
      }
    });
    expect(wrapper.find("input[name='username']").props().value).toBe(value);

    wrapper.find("input[name='username']").simulate("blur", {
      target: {
        name,
      }
    });
    expect(wrapper.find(".invalid-feedback")).toHaveLength(0);


    wrapper.find("input[name='username']").simulate("change", {
      target: {
        name,
        value: ""
      }
    });
    wrapper.find("input[name='username']").simulate("blur", {
      target: {
        name,
      }
    });

    expect(wrapper.find(".invalid-feedback")).toHaveLength(1);
    // console.log(wrapper.find(".invalid-feedback").html());
  });
});

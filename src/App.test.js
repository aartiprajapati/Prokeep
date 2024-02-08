import { act, fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import Login, { doLogin } from "./Login";
import userEvent from "@testing-library/user-event";

describe("login", () => {
  it("login is valid ", async () => {
    render(<Login />);
    const loginBtn = screen.getByTestId("btnLogin");
    const emailInputNode = screen.getByPlaceholderText("Enter email");
    const passwordInputNode = screen.getByPlaceholderText("Enter password");

    userEvent.type(emailInputNode, "eve.holt@reqres.in");
    userEvent.type(passwordInputNode, "c");

    fireEvent.click(loginBtn);
    const info = screen.getByTestId("alertSuccess");
    console.log(info);
    expect(info).toBeInTheDocument();
  });

  it("login is invalid ", async () => {
    render(<Login />);
    const loginBtn = screen.getByTestId("btnLogin");
    const emailInputNode = screen.getByPlaceholderText("Enter email");
    const passwordInputNode = screen.getByPlaceholderText("Enter password");

    userEvent.type(emailInputNode, "abc@reqres.in");
    userEvent.type(passwordInputNode, "c");

    fireEvent.click(loginBtn);
    const info = screen.getByTestId("alertError");
    expect(info).toBeInTheDocument();
  });
});

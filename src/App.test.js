import { render, screen } from "@testing-library/react";
import App from "./App";
import Login from "./Login";

const unmockedFetch = global.fetch;

beforeEach(() => {
  global.fetch = jest.fn();
});

afterAll(() => {
  global.fetch = unmockedFetch;
});

// This is actual testing suite
describe("login", () => {
  /*test("works", async () => {
    const json = await doLogin();
    expect(Array.isArray(json)).toEqual(true);
    expect(json.length).toEqual(0);
  });*/
  test("works", async () => {
    const mockFetch = jest.spyOn(global, "fetch").mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ token: "" }),
      })
    );
    //render(<App />);
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("Should call onSubmit when Login button is pressed", () => {
    const onSubmit = jest.fn();
    render(<App />);
    /*const emailInput = screen.getByTestId("emailInput");
    const passwordInput = screen.getByTestId("inputPassword");
    fireEvent.change(emailInput, {
      target: { value: "eve.holt@reqres.in" },
    });
    fireEvent.change(emailInput, {
      target: { value: "c" },
    });*/
    const logInButton = screen.getByTestId("btnLogin");

    fireEvent.click(logInButton);
    expect(onSubmit).toHaveBeenCalledWith("a@email.com", "password");
  });
});

/*describe("login", () => {
  const mockData = { token: "" };
  const fetchMock = jest
    .spyOn(global, "fetch")
    .mockImplementation(() =>
      Promise.resolve({ json: () => Promise.resolve(mockData) })
    );

  test("works", async () => {
    //const json = await doLogin();
    //expect(fetchMock).toHaveBeenCalledWith("https://reqres.in/api/login");
    expect(fetchMock).toHaveBeenCalledTimes(1);

    expect(Array.isArray(json)).toEqual(true);
    expect(json.length).toEqual(0);
    global.fetch.mockRestore();
  });
});*/

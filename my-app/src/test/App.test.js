import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils"

import App from '../App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders without data", () => {
  act(() => {
    render(<App />, container);
  });
  expect(container.textContent).toBe("Loading..");
});

it("renders user data", async () => {
  const fakeData = {
    "list": [
      {
        "dt": 1623769200,
        "main": {
          "temp": 298.4,
          "feels_like": 298.99,
          "temp_min": 295.7,
          "temp_max": 298.4,
          "pressure": 1009,
          "sea_level": 1009,
          "grnd_level": 907,
          "humidity": 77,
          "temp_kf": 2.7
        },
        "weather": [
          {
            "id": 803,
            "main": "Clouds",
            "description": "broken clouds",
            "icon": "04n"
          }
        ],
        "clouds": {
          "all": 75
        },
        "wind": {
          "speed": 7.41,
          "deg": 251,
          "gust": 13.27
        },
        "visibility": 10000,
        "pop": 0,
        "sys": {
          "pod": "n"
        },
        "dt_txt": "2021-06-15 15:00:00"
      }
    ],
    "city": {
      "id": 1277333,
      "name": "Bengaluru",
      "coord": {
        "lat": 12.9762,
        "lon": 77.6033
      },
      "country": "IN",
      "population": 5104047,
      "timezone": 19800,
      "sunrise": 1623716615,
      "sunset": 1623762997
    }
  };
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeData)
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<App />, container);
  });

  expect(container.querySelector("h1").textContent).toBe("My Weather App");

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});


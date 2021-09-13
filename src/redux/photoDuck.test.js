import photoDucks from "./photoDuck";
import deepFreeze from "deep-freeze";

describe("photoReducer", () => {
  let state;

  beforeEach(() => {
    state = {
      loading: false,
      photos: [
        {
          download_url:
            "https://icons.iconarchive.com/icons/google/noto-emoji-animals-nature/512/22297-octopus-icon.png"
        },
        {
          download_url:
            "https://icons.iconarchive.com/icons/google/noto-emoji-animals-nature/512/22297-octopus-icon.png"
        }
      ],
      page: 1
    };
  });

  test("GET_PHOTOS", () => {
    const action = {
      type: "GET_PHOTOS"
    };

    deepFreeze(state);
    const newState = photoDucks(state, action);

    expect(newState.loading).toBeTruthy();
    expect(newState.photos).toHaveLength(2);
    expect(newState.photos).toContainEqual(state.photos[0]);
    expect(newState.photos).toContainEqual(state.photos[1]);
    expect(newState.page).toEqual(state.page);
  });

  test("should return the initial state", () => {
    expect(photoDucks(undefined, {})).toEqual({
      loading: false,
      photos: [],
      page: 0 
    });
  });

  test("GET_PHOTOS_SUCCESS", () => {
    const action = {
      type: "GET_PHOTOS_SUCCESS",
      payload: {
        photo: [
          {
            download_url:
              "https://icons.iconarchive.com/icons/google/noto-emoji-animals-nature/512/22297-octopus-icon.png"
          }
        ],
        page: 2
      }
    };

    deepFreeze(state);
    const newState = photoDucks(state, action);

    expect(newState.loading).toBeFalsy();
    expect(newState.photos).toHaveLength(3);
    expect(newState.page).toEqual(2);
  });

  test("GET_PHOTOS_ERROR", () => {
    const action = {
      type: "GET_PHOTOS_ERROR",
      payload: "error load photos"
    };

    deepFreeze(state);
    const newState = photoDucks(state, action);

    expect(newState.loading).toBeFalsy();
    expect(newState.photos).toHaveLength(2);
    expect(newState.photos).toContainEqual(state.photos[0]);
    expect(newState.photos).toContainEqual(state.photos[1]);
    expect(newState.page).toEqual(state.page);
    expect(newState.error).toEqual(action.payload);
  });
});

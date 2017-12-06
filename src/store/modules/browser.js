export const RESIZE_WINDOW = '@BROWSER/RESIZE_WINDOW';

const initialState = {
  stageWidth: null,
  stageHeight: null,
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case RESIZE_WINDOW: {
      const { stageWidth, stageHeight } = action.payload;
      return {
        ...state,
        stageWidth,
        stageHeight,
      };
    }
    default:
      return state;
  }
}

// Actions
export const windowResize = (stageWidth, stageHeight) => ({
  type: RESIZE_WINDOW,
  payload: {
    stageWidth,
    stageHeight,
  },
});

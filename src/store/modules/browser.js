import createReducer from '../helpers/createReducer';

export const RESIZE_WINDOW = '@BROWSER/RESIZE_WINDOW';

const initialState = {
  stageWidth: 0,
  stageHeight: 0,
};

export default createReducer(initialState, {
  [RESIZE_WINDOW]: (state, { stageHeight, stageWidth }) => ({
    ...state,
    stageHeight,
    stageWidth,
  }),
});

// Actions
export const windowResize = (stageWidth, stageHeight) => ({
  type: RESIZE_WINDOW,
  payload: {
    stageWidth,
    stageHeight,
  },
});

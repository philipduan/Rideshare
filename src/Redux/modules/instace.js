const SEND_INSTANCE = 'SEND_INSTANCE';

const sendIntance = data => ({
  type: SEND_INSTANCE,
  payload: data
});

export const sendInstanceObject = data => dispatch => {
  dispatch(sendIntance(data));
};

export default (
  state = {
    instace: {}
  },
  action
) => {
  switch (action.type) {
    case SEND_INSTANCE:
      console.log('action', action.payload);
      return {
        ...state,
        instance: action.payload
      };
    default:
      return { ...state };
  }
};

const defaultStates = {
    username: "",
}

export default {
    state: defaultStates,
    reducers: {
        setUserInfo: (_state, payload) => {
            return payload
        },
        cleanUserInfo: () => {
            return defaultStates;
        }
    },
    effect: (dispatch) => ({

    }),
}

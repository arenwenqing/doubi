import React from 'react';
export declare const Context: React.Context<any>;
export declare const initialState: {
    loginCurrentKey: string;
    userId: string;
};
export declare const reduxSlice: import("@reduxjs/toolkit").Slice<{
    loginCurrentKey: string;
    userId: string;
}, {
    setLoginCurrentKey: (state: import("immer/dist/internal").WritableDraft<{
        loginCurrentKey: string;
        userId: string;
    }>, { payload }: {
        payload: any;
        type: string;
    }) => void;
    setUserId: (state: import("immer/dist/internal").WritableDraft<{
        loginCurrentKey: string;
        userId: string;
    }>, { payload }: {
        payload: any;
        type: string;
    }) => void;
}, "reduxSlice">;
export declare const setLoginCurrentKey: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "reduxSlice/setLoginCurrentKey">, setUserId: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "reduxSlice/setUserId">;
declare const _default: import("redux").Reducer<{
    loginCurrentKey: string;
    userId: string;
}, import("redux").AnyAction>;
export default _default;

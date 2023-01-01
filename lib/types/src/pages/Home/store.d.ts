import React from 'react';
export declare const Context: React.Context<any>;
export declare const initialState: {
    viewModal: {
        visible: boolean;
        type: string;
    };
    detailModal: {
        visible: boolean;
    };
    lotteryModal: {
        visible: boolean;
        num: number;
    };
};
export declare const reduxSlice: import("@reduxjs/toolkit").Slice<{
    viewModal: {
        visible: boolean;
        type: string;
    };
    detailModal: {
        visible: boolean;
    };
    lotteryModal: {
        visible: boolean;
        num: number;
    };
}, {
    setViewModal: (state: import("immer/dist/internal").WritableDraft<{
        viewModal: {
            visible: boolean;
            type: string;
        };
        detailModal: {
            visible: boolean;
        };
        lotteryModal: {
            visible: boolean;
            num: number;
        };
    }>, { payload }: {
        payload: any;
        type: string;
    }) => void;
    setDetailModal: (state: import("immer/dist/internal").WritableDraft<{
        viewModal: {
            visible: boolean;
            type: string;
        };
        detailModal: {
            visible: boolean;
        };
        lotteryModal: {
            visible: boolean;
            num: number;
        };
    }>, { payload }: {
        payload: any;
        type: string;
    }) => void;
    setLotteryModal: (state: import("immer/dist/internal").WritableDraft<{
        viewModal: {
            visible: boolean;
            type: string;
        };
        detailModal: {
            visible: boolean;
        };
        lotteryModal: {
            visible: boolean;
            num: number;
        };
    }>, { payload }: {
        payload: any;
        type: string;
    }) => void;
}, "reduxSlice">;
export declare const setViewModal: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "reduxSlice/setViewModal">, setDetailModal: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "reduxSlice/setDetailModal">, setLotteryModal: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "reduxSlice/setLotteryModal">;
declare const _default: import("redux").Reducer<{
    viewModal: {
        visible: boolean;
        type: string;
    };
    detailModal: {
        visible: boolean;
    };
    lotteryModal: {
        visible: boolean;
        num: number;
    };
}, import("redux").AnyAction>;
export default _default;

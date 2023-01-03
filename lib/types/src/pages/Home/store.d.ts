import React from 'react';
interface LotteryType {
    userId: string;
    keyInfo: {
        keyType: number;
        keyCount: number;
    };
}
export declare const Context: React.Context<any>;
export declare const initialState: {
    viewModal: {
        visible: boolean;
        type: number;
    };
    detailModal: {
        visible: boolean;
    };
    lotteryModal: {
        visible: boolean;
        currentBoxType: number;
        lotteryDataSource: {};
    };
    keyInfo: {
        keyType: number;
        keyCount: number;
    }[];
    commonScreenData: any[];
};
export declare const reduxSlice: import("@reduxjs/toolkit").Slice<{
    viewModal: {
        visible: boolean;
        type: number;
    };
    detailModal: {
        visible: boolean;
    };
    lotteryModal: {
        visible: boolean;
        currentBoxType: number;
        lotteryDataSource: {};
    };
    keyInfo: {
        keyType: number;
        keyCount: number;
    }[];
    commonScreenData: any[];
}, {
    setViewModal: (state: import("immer/dist/internal").WritableDraft<{
        viewModal: {
            visible: boolean;
            type: number;
        };
        detailModal: {
            visible: boolean;
        };
        lotteryModal: {
            visible: boolean;
            currentBoxType: number;
            lotteryDataSource: {};
        };
        keyInfo: {
            keyType: number;
            keyCount: number;
        }[];
        commonScreenData: any[];
    }>, { payload }: {
        payload: any;
        type: string;
    }) => void;
    setDetailModal: (state: import("immer/dist/internal").WritableDraft<{
        viewModal: {
            visible: boolean;
            type: number;
        };
        detailModal: {
            visible: boolean;
        };
        lotteryModal: {
            visible: boolean;
            currentBoxType: number;
            lotteryDataSource: {};
        };
        keyInfo: {
            keyType: number;
            keyCount: number;
        }[];
        commonScreenData: any[];
    }>, { payload }: {
        payload: any;
        type: string;
    }) => void;
    setLotteryModal: (state: import("immer/dist/internal").WritableDraft<{
        viewModal: {
            visible: boolean;
            type: number;
        };
        detailModal: {
            visible: boolean;
        };
        lotteryModal: {
            visible: boolean;
            currentBoxType: number;
            lotteryDataSource: {};
        };
        keyInfo: {
            keyType: number;
            keyCount: number;
        }[];
        commonScreenData: any[];
    }>, { payload }: {
        payload: any;
        type: string;
    }) => void;
    setKeyInfo: (state: import("immer/dist/internal").WritableDraft<{
        viewModal: {
            visible: boolean;
            type: number;
        };
        detailModal: {
            visible: boolean;
        };
        lotteryModal: {
            visible: boolean;
            currentBoxType: number;
            lotteryDataSource: {};
        };
        keyInfo: {
            keyType: number;
            keyCount: number;
        }[];
        commonScreenData: any[];
    }>, { payload }: {
        payload: any;
        type: string;
    }) => void;
    setCommonScreenData: (state: import("immer/dist/internal").WritableDraft<{
        viewModal: {
            visible: boolean;
            type: number;
        };
        detailModal: {
            visible: boolean;
        };
        lotteryModal: {
            visible: boolean;
            currentBoxType: number;
            lotteryDataSource: {};
        };
        keyInfo: {
            keyType: number;
            keyCount: number;
        }[];
        commonScreenData: any[];
    }>, { payload }: {
        payload: any;
        type: string;
    }) => void;
}, "reduxSlice">;
export declare const setViewModal: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "reduxSlice/setViewModal">, setDetailModal: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "reduxSlice/setDetailModal">, setLotteryModal: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "reduxSlice/setLotteryModal">, setKeyInfo: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "reduxSlice/setKeyInfo">, setCommonScreenData: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "reduxSlice/setCommonScreenData">;
export declare const getKeys: (query: any) => (dispatch: any) => Promise<void>;
export declare const getCommonScreen: () => (dispatch: any) => Promise<void>;
export declare const lotteryDraw: (query: LotteryType) => (dispatch: any) => Promise<void>;
declare const _default: import("redux").Reducer<{
    viewModal: {
        visible: boolean;
        type: number;
    };
    detailModal: {
        visible: boolean;
    };
    lotteryModal: {
        visible: boolean;
        currentBoxType: number;
        lotteryDataSource: {};
    };
    keyInfo: {
        keyType: number;
        keyCount: number;
    }[];
    commonScreenData: any[];
}, import("redux").AnyAction>;
export default _default;

import React from 'react';
export declare const Context: React.Context<any>;
export declare const initialState: {
    loginCurrentKey: string;
    userId: string;
    renewModalData: {
        visible: boolean;
        level: number;
    };
    upgradeModalData: {
        visible: boolean;
    };
    modifyPayData: {
        visible: boolean;
        aliPayId: string;
    };
};
export declare const reduxSlice: import("@reduxjs/toolkit").Slice<{
    loginCurrentKey: string;
    userId: string;
    renewModalData: {
        visible: boolean;
        level: number;
    };
    upgradeModalData: {
        visible: boolean;
    };
    modifyPayData: {
        visible: boolean;
        aliPayId: string;
    };
}, {
    setLoginCurrentKey: (state: import("immer/dist/internal").WritableDraft<{
        loginCurrentKey: string;
        userId: string;
        renewModalData: {
            visible: boolean;
            level: number;
        };
        upgradeModalData: {
            visible: boolean;
        };
        modifyPayData: {
            visible: boolean;
            aliPayId: string;
        };
    }>, { payload }: {
        payload: any;
        type: string;
    }) => void;
    setUserId: (state: import("immer/dist/internal").WritableDraft<{
        loginCurrentKey: string;
        userId: string;
        renewModalData: {
            visible: boolean;
            level: number;
        };
        upgradeModalData: {
            visible: boolean;
        };
        modifyPayData: {
            visible: boolean;
            aliPayId: string;
        };
    }>, { payload }: {
        payload: any;
        type: string;
    }) => void;
    setRenewModalData: (state: import("immer/dist/internal").WritableDraft<{
        loginCurrentKey: string;
        userId: string;
        renewModalData: {
            visible: boolean;
            level: number;
        };
        upgradeModalData: {
            visible: boolean;
        };
        modifyPayData: {
            visible: boolean;
            aliPayId: string;
        };
    }>, { payload }: {
        payload: any;
        type: string;
    }) => void;
    setUpgradeModalData: (state: import("immer/dist/internal").WritableDraft<{
        loginCurrentKey: string;
        userId: string;
        renewModalData: {
            visible: boolean;
            level: number;
        };
        upgradeModalData: {
            visible: boolean;
        };
        modifyPayData: {
            visible: boolean;
            aliPayId: string;
        };
    }>, { payload }: {
        payload: any;
        type: string;
    }) => void;
    setModifyPayData: (state: import("immer/dist/internal").WritableDraft<{
        loginCurrentKey: string;
        userId: string;
        renewModalData: {
            visible: boolean;
            level: number;
        };
        upgradeModalData: {
            visible: boolean;
        };
        modifyPayData: {
            visible: boolean;
            aliPayId: string;
        };
    }>, { payload }: {
        payload: any;
        type: string;
    }) => void;
}, "reduxSlice">;
export declare const setLoginCurrentKey: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "reduxSlice/setLoginCurrentKey">, setUserId: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "reduxSlice/setUserId">, setRenewModalData: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "reduxSlice/setRenewModalData">, setUpgradeModalData: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "reduxSlice/setUpgradeModalData">, setModifyPayData: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "reduxSlice/setModifyPayData">;
declare const _default: import("redux").Reducer<{
    loginCurrentKey: string;
    userId: string;
    renewModalData: {
        visible: boolean;
        level: number;
    };
    upgradeModalData: {
        visible: boolean;
    };
    modifyPayData: {
        visible: boolean;
        aliPayId: string;
    };
}, import("redux").AnyAction>;
export default _default;

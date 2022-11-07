import { CSSProperties, ReactNode } from "react";
export declare type ResultType = 'success' | 'fail';
export declare type PropsType = {
    type?: ResultType;
    icon?: ReactNode;
    title?: string;
    btnStyle?: CSSProperties;
    content?: string | ReactNode;
    btnText?: string | ReactNode;
    onBack?: (args?: any) => void;
};

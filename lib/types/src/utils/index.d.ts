export declare const isLocal: boolean;
export declare const isDev: boolean;
export declare function classNames(prefix: any, styles: any): any;
/**
 * 将url中? 后面的参数, 变成一个json
 * @return {Object}
 * @example 'a=1&b=3' => {a: 1, b: 3}
 */
export declare function getUrlParams(sourceStr?: string): {};
export declare function genId(): string;
/**
 * 得到url中某个参数
 */
export declare function getUrlParam(name: any): string | boolean;

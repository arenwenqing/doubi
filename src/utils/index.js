import classnames from 'classnames'

// 是否本地环境
export const isLocal = /^localhost|127.0|192.168/.test(window.location.host)

// 开发环境 or 线上环境
export const isDev = /^test/.test(window.location.host) || isLocal

// classnames
export function classNames(prefix, styles) {
  let cx = classnames;
  if (arguments.length === 0) {
    return cx;
  } else if (arguments.length === 1) {
    if (typeof (arguments[0]) === 'string') {
      // Just add prefix whithout bind css module.
    } else {
      // Just bind css moudle whitout add prefix.
      return classnames.bind(styles);
    }
  } else {
    cx = classnames.bind(styles);
  }
  return (...classnames) => {
    return cx(classnames).split(' ').filter(i => i).map(classname => `${prefix}-${classname}`).join(' ') || prefix
  }
}

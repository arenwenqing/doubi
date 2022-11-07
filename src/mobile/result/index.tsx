// import React, { memo, useMemo } from 'react';
import * as React from 'react';
import { LangPkg, language } from 'src/constants'
import { PropsType } from './type'
import './index.less'
const PayResult: React.FC<PropsType> = (props) => {
  const {
    type = 'success',
    icon,
    title,
    content,
    btnText,
    btnStyle,
    onBack
  } = props
  const renderIcon = React.useMemo(() => {
    return icon || <div className={ type === 'success' ? 'mobile-result-success-icon' : 'mobile-result-fail-icon'}></div>
  }, [icon, type])
  const languageType = language.includes(navigator.language) ? navigator.language : 'en'
  return <div className='mobile-success-wrapper'>
    {
      renderIcon
    }
    <div className='mobile-result-title'>{title ?? LangPkg[languageType][type].title}</div>
    <div className='mobile-result-content'>
      <span>{content ?? LangPkg[languageType][type].content}</span>
    </div>
    <div className='mobile-result-btn' style={btnStyle} onClick={onBack}>
      <span>{ btnText ?? LangPkg[languageType][type].btn}</span>
    </div>
  </div>
}

export default React.memo(PayResult)
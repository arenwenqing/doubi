import { CSSProperties, ReactNode } from "react"

export type ResultType = 'success' | 'fail'
export type PropsType = {
  type?: ResultType;
  icon?: ReactNode;
  title?: string;
  btnStyle?: CSSProperties;
  content?: string | ReactNode;
  btnText?: string | ReactNode;
  onBack?: (args?: any) => void
}
import { ReactNode } from "react"

export type ResultType = 'success' | 'fail'
export type PropsType = {
  type?: ResultType;
  icon?: ReactNode;
  title?: string | ReactNode;
  content?: string | ReactNode;
  btnStyle?: Object;
  btnText?: string | ReactNode;
  onBack?: (args?: any) => void
}
declare namespace CommonType {
  type ItemType = {
    name: string
    value: string | boolean
    label: string
  }
}

type ReturnListOtherType = {
  page: number
  total: number
}
type InferType<T> = T extends (arg: infer P) => infer P ? P : T

type ReturnListType<T> = { list: InferType<T> [] } & ReturnListOtherType

type ConversionRequiredType<T> = {
  [Key in keyof T]?: T[Key]
}
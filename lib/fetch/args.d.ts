interface Args {
  path: string,
  data?: object | string,
  defaultQuery?: boolean,
  cache?: string
  headers?: {[key: string]: any}
  type?: string
}
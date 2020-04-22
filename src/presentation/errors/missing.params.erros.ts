export class MissingParamError extends Error {
  constructor (paramName: String) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    super(`Missing param: ${paramName}`)
    this.name = 'MissingParamError'
  }
}

type CustomErrorType = {
  msg: string
  code: number
}
class CustomError extends Error {
  code: number
  msg: string

  constructor({ msg, code }: CustomErrorType) {
    super()
    this.msg = msg
    this.code = code
  }
}

export default CustomError

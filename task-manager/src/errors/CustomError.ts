type CustomErrorType = {
  message: string
  code: number
}
class CustomError extends Error {
  code: number

  constructor({ message, code }: CustomErrorType) {
    super()
    this.message = message
    this.code = code
  }
}

export default CustomError

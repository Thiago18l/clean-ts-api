import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing.params.erros'
import { badRequest, serverError } from '../helpers/http-helpers'
import { Controller } from '../protocols/controllers'
import { EmailValidator } from '../protocols/emailValidator'
import { InvalidParamError } from '../errors/invalid.param.error'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirm']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      return serverError()
    }
  }
}

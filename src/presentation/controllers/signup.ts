import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing.params.erros'
import { badRequest } from '../helpers/http-helpers'
export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirm']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}

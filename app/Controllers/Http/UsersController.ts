import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'

type Response = {
  data: Object
  errors: String[]
}

export default class UsersController {
  protected response: Response

  constructor() {
    this.response = {
      data: [],
      errors: [],
    }
  }

  public async login({ request, response }: HttpContextContract) {
    const { email, password } = request.get()

    const user = await User.findBy('email', email)

    if (!user) {
      this.response.errors.push('Dados incorretos.')
      response.status(404).json(this.response)
      return
    }

    const isSame = await Hash.verify(user.password_hash, password)

    if (!isSame) {
      this.response.errors.push('Dados incorretos.')
      response.status(404).json(this.response)
      return
    }

    this.response.data = { id: user.id }

    response.json(this.response)
  }

  public async store({ request, response }: HttpContextContract) {
    const { name, email, password } = request.post()

    const user = new User()

    user.name = name
    user.email = email
    user.password_hash = password

    try {
      await user.save()
      this.response.data = { id: user.id }
    } catch (error) {
      if (error.code === '23505') {
        this.response.errors.push('E-mail já cadastrado.')
        response.status(409).json(this.response)
        return
      }
    }

    response.json(this.response)
  }
}

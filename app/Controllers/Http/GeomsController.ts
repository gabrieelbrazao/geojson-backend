import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Geom from 'App/Models/Geom'

type Response = {
  data: string[]
  errors: String[]
}

export default class GeomsController {
  protected response: Response

  constructor() {
    this.response = {
      data: [],
      errors: [],
    }
  }

  public async show({ params, response }: HttpContextContract) {
    const geoms = await Geom.query().where('user_id', params.userId)

    const data: string[] = []

    geoms.forEach((value) => {
      data.push(JSON.parse(value.content))
    })

    this.response.data = data

    response.json(this.response)
  }

  public async store({ request, response }: HttpContextContract) {
    const { content, userId } = request.post()

    const geom = new Geom()

    geom.content = content
    geom.user_id = userId

    await geom.save()

    this.response.data = [content]

    response.json(this.response)
  }
}

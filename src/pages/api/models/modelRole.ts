import { getModelForClass, prop } from '@typegoose/typegoose'

export class Role {
@prop({ type: String })
  name: string
}

const RoleModel = getModelForClass(Role)

export { RoleModel }

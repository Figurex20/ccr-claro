import mongoosePaginate from 'mongoose-paginate-v2'
import { plugin, getModelForClass, modelOptions, prop, index } from '@typegoose/typegoose'
// import paginationPlugin, { PaginateModel } from 'typegoose-cursor-pagination'
import { FilterQuery, PaginateOptions, PaginateResult } from 'mongoose'

type PaginateMethod<T> = (
query?: FilterQuery<T>,
options?: PaginateOptions,
callback?: (err: any, result: PaginateResult<T>) => void,
  ) => Promise<PaginateResult<T>>;

@plugin(mongoosePaginate)

@index({ dateEnter: 1 })
@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})

class DetalleSite {
@prop({
  type: String,
  required: true,
  trim: true
})
  tecnologia: string

@prop({
  type: String,
  required: true,
  trim: true
})
  provincia: string

@prop({
  type: String,
  required: true,
  trim: true
})
  canton: string

@prop({
  type: String,
  required: true,
  trim: true
})
  distrito: string

@prop({
  type: String,
  required: true,
  trim: true
})
  zona: string

@prop({
  type: String,
  required: true,
  trim: true
})
  zonaEricsson: string
}

class Clasificacion {
@prop({
  type: String,
  required: true,
  trim: true
})
  categoria: string

@prop({
  type: String,
  required: true,
  trim: true
})
  goldenGuate: string
}

class Depedencias {
@prop({
  type: String,
  required: true,
  trim: true
})
  cantidadDependancias: string

@prop({
  type: String,
  required: true,
  trim: true
})
  cantidadCoorporativos: string
}

class Respaldo {
@prop({
  type: String,
  required: true,
  trim: true
})
  mg: string

@prop({
  type: String,
  required: true,
  trim: true
})
  autonomia: string
}

class Bitacora {
@prop({
  type: String,
  required: true,
  trim: true
})
  fallaTareaIncidencia: string

@prop({
  type: String,
  required: true,
  trim: true
})
  fallaTareaIncidenciaDFS: string

@prop({
  type: String,
  required: true,
  trim: true
})
  idSite: string

@prop({
  type: String,
  required: true,
  trim: true
})
  sitioAlarmadoTemip: string

@prop({
  type: String,
  required: true,
  trim: true
})
  fechaInicioIncidencia: string

@prop({
  type: String,
  required: true,
  trim: true
})
  fechaCierreIncidencia: string

@prop({
  type: String,
  required: true,
  trim: true
})
  tiempoAcumulado: string

@prop({
  type: String,
  required: true,
  trim: true
})
  tiempoAcumuladoFDS: string

@prop({
  type: String,
  required: true,
  trim: true
})
  tecnologiasFDS: string

@prop({
  type: String,
  required: true,
  trim: true
})
  sitiosFDS: string

@prop({
  type: String,
  required: true,
  trim: true
})
  seguimiento: string

@prop({
  type: Boolean,
  required: true,
  trim: true
})
  fallaVandalismo: boolean

@prop({
  type: Boolean,
  required: true,
  trim: true
})
  fallaMgFDS: boolean

@prop({
  type: Boolean,
  required: true,
  trim: true
})
  fallaTransmisionFDS: boolean

@prop({
  type: Boolean,
  required: true,
  trim: true
})
  fallaIpFDS: boolean

@prop({
  type: Boolean,
  required: true,
  trim: true
})
  fallaOperadores: boolean

@prop({
  type: Boolean,
  required: true,
  trim: true
})
  fallaComponentesInfra: boolean

@prop({
  type: Boolean,
  required: true,
  trim: true
})
  fallaBateria: boolean

@prop({
  type: Boolean,
  required: true,
  trim: true
})
  fallaEnergia: boolean

@prop({
  type: Boolean,
  required: true,
  trim: true
})
  fallaFO: boolean

@prop({
  type: Boolean,
  required: true,
  trim: true
})
  fallaFalsaAlarma: boolean

@prop({
  type: () => Respaldo,
  required: true,
  trim: true
})
  respaldo: Respaldo[]

@prop({
  type: () => Depedencias,
  required: true,
  trim: true
})
  depedencias: Depedencias[]

@prop({
  type: () => Clasificacion,
  required: true,
  trim: true
})
  clasificacion: Clasificacion[]

@prop({
  type: () => DetalleSite,
  required: true,
  trim: true
})
  detalleSite: DetalleSite[]

// eslint-disable-next-line no-use-before-define
static paginate: PaginateMethod<Bitacora>
}

const BitacoraModel = getModelForClass(Bitacora)
export { BitacoraModel }

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

class InformationSite {
@prop({
  type: String,
  required: true,
  trim: true
})
  siteID: string

@prop({
  type: String,
  required: true,
  trim: true
})
  siteIDLTE: string

@prop({
  type: String,
  required: true,
  trim: true
})
  mnemonico: string

@prop({
  type: String,
  required: true,
  trim: true
})
  noPlaca: string

@prop({
  type: String,
  required: true,
  trim: true
})
  name: string

@prop({
  type: String,
  required: true,
  trim: true
})
  direccion: string

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
  latitud: string

@prop({
  type: String,
  required: true,
  trim: true
})
  longitud: string

@prop({
  type: String,
  required: true,
  trim: true
})
  propietarioSite: string

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
  idTorrero: string

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
  funcionalidad: string

@prop({
  type: String,
  required: true,
  trim: true
})
  tipoRBS: string

@prop({
  type: String,
  required: true,
  trim: true
})
  bscInicial: string

@prop({
  type: String,
  required: true,
  trim: true
})
  rncInicial: string

@prop({
  type: String,
  required: true,
  trim: true
})
  medio: string

@prop({
  type: String,
  required: true,
  trim: true
})
  equipoTX: string

@prop({
  type: String,
  required: true,
  trim: true
})
  sitioOrigen: string

@prop({
  type: String,
  required: true,
  trim: true
})
  dependencias: string

@prop({
  type: String,
  required: true,
  trim: true
})
  criticidad: string

@prop({
  type: String,
  required: true,
  trim: true
})
  redudancia: string

@prop({
  type: String,
  required: true,
  trim: true
})
  nMedidor: string

@prop({
  type: String,
  required: true,
  trim: true
})
  companiaElectrica: string

@prop({
  type: String,
  required: true,
  trim: true
})
  conexionDefinitivaTempoal: string

@prop({
  type: String,
  required: true,
  trim: true
})
  aa: string

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
  capacidadKW: string

@prop({
  type: String,
  required: true,
  trim: true
})
  tanqueCombustibleLitros: string

@prop({
  type: String,
  required: true,
  trim: true
})
  bancoBateriasExterno: string

@prop({
  type: String,
  required: true,
  trim: true
})
  autonomiaTotalHoras: string

@prop({
  type: String,
  required: true,
  trim: true
})
  tipoTorre: string

@prop({
  type: String,
  required: true,
  trim: true
})
  alturaTorre: string

@prop({
  type: String,
  required: true,
  trim: true
})
  casetaContenedor: string

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

@prop({
  type: String,
  required: true,
  trim: true
})
  supervisorRBS: string

@prop({
  type: String,
  required: true,
  trim: true
})
  supervisorEnergia: string

@prop({
  type: String,
  required: true,
  trim: true
})
  llaveOYM: string

// eslint-disable-next-line no-use-before-define
static paginate: PaginateMethod<InformationSite>
}

const InformationSiteModel = getModelForClass(InformationSite)
export { InformationSiteModel }

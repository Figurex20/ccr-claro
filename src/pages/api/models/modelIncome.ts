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

class Income {
@prop({
  type: String,
  required: true,
  trim: true
})
  name: String

@prop({
  type: String,
  required: true,
  trim: true
})
  site: String

@prop({
  type: String,
  required: true,
  trim: true
})
  whatdo: String

@prop({
  type: String,
  required: true,
  trim: true,
  maxlength: 7,
  minlength: 7
})
  rda: String

@prop({
  type: Boolean
})
  exit: Boolean

@prop({
  type: String,
  required: true,
  trim: true
})
  nameEnter: String

@prop({
  type: String,
  trim: true
})
  nameExit?: String

@prop({
  type: String,
  trim: true
})
  dateExit?: String

@prop({
  type: String,
  required: true,
  trim: true
})
  dateEnter: String

@prop({
  type: String,
  trim: true
})
  comments?: String

// eslint-disable-next-line no-use-before-define
static paginate: PaginateMethod<Income>
}

const IncomeModel = getModelForClass(Income)
export { IncomeModel }

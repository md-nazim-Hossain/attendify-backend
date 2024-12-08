import { model, Schema } from 'mongoose';
import { ICompany, ICompanyModel } from './company.interface';
import { ENUM_COMPANY_STATUS } from '../../enums/company.enum';

const companySchema = new Schema<
  ICompany,
  ICompanyModel,
  Record<string, unknown>
>(
  {
    name: {
      type: String,
      required: true,
    },
    domain: {
      type: String,
      required: true,
      unique: true,
      index: true,
      validate: {
        validator: function (value: string) {
          return value.startsWith('https://');
        },
        message: 'Domain must start with https://',
      },
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(ENUM_COMPANY_STATUS),
      default: ENUM_COMPANY_STATUS.ACTIVE,
    },
    verfiedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Company = model<ICompany, ICompanyModel>('Company', companySchema);

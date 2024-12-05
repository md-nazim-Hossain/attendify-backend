import { model, Schema } from 'mongoose';
import { ICompany, ICompanyModel } from './company.interface';
import {
  ENUM_COMPANY_SIZE,
  ENUM_COMPANY_STATUS,
  ENUM_COMPANY_TYPE,
} from '../../enums/company.enum';

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
    email: {
      type: String,
      required: true,
      unique: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
    },
    website: {
      type: String,
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
    type: {
      type: String,
      required: true,
      enum: Object.values(ENUM_COMPANY_TYPE),
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
    description: {
      type: String,
    },
    regNumber: {
      type: String,
    },
    size: {
      type: String,
      required: true,
      enum: Object.values(ENUM_COMPANY_SIZE),
    },
    totalEmployees: {
      type: Number,
      default: 0,
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

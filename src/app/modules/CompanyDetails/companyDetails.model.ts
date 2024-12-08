import { model, Schema } from 'mongoose';
import {
  ENUM_COMPANY_SIZE,
  ENUM_COMPANY_TYPE,
} from '../../enums/companyDetails.enum';
import {
  ICompanyDetails,
  ICompanyDetailsModel,
} from './companyDetails.interface';

const companyDetailsSchema = new Schema<
  ICompanyDetails,
  ICompanyDetailsModel,
  Record<string, unknown>
>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
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
    type: {
      type: String,
      enum: Object.values(ENUM_COMPANY_TYPE),
    },
    description: {
      type: String,
    },
    regNumber: {
      type: String,
    },
    size: {
      type: String,
      enum: Object.values(ENUM_COMPANY_SIZE),
    },
    totalEmployees: {
      type: Number,
      default: 0,
    },
    officeStartTime: {
      type: String,
      required: true,
    },
    officeEndTime: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const CompanyDetails = model<ICompanyDetails, ICompanyDetailsModel>(
  'CompanyDetails',
  companyDetailsSchema
);

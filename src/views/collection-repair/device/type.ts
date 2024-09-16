import { IPropsBaseFrom } from '../../../type/page-type';

export interface IPropsFrom extends IPropsBaseFrom{
  majorFunction?: string; // 主要功能
  manufacturer?: string; // 生产厂家
  productName?: string; // 产品名
  remark?: string; // 备注
}


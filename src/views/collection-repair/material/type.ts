import { IPropsBaseFrom } from '../../../type/page-type';

export interface IPropsFrom extends IPropsBaseFrom{
  commodityName?: string; // 商品名
  drugLevel?: string; // 药剂级别
  mainComponents?: string; // 主要成分
  mainPerformance?: string; // 性能
  mainProportion?: string; // 配比
  manufacturer?: string; // 生产厂家
  materialName?: string; // 材料名称
  remark?: string; // 备注
}


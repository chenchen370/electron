import { IPropsBaseFrom } from '../../../type/page-type';

export interface IPropsFrom extends IPropsBaseFrom{
  collectionUnit?: string; // 收藏单位
  extractUserName?: string; // 提取经办人
  extractTime?: string; // 提取日期

  protectionRepairUnit?: string; // 保护修复单位
  ratifyNum?: string; // 批准文号
  ratifyUnitName?: string; // 批准单位名称

  relicCategory?: string; // 文物类别
  relicFrom?: string; // 文物来源
  relicId?: string; // 文物登记号
  relicImg?: string; // 文物图片
  relicLevel?: ''; // 文物级别

  relicMaterial?: string; // 藏品材质
  relicName?: string; // 藏品名称

  relicProblem?: string; // 文物存在问题
  relicState?: string; // 文物修复状态
  relicYearsDetail?: string; // 具体年代

  returnUserName?: string; // 返还经办人
  returnTime?: string; // 返还日期

  schemeCode?: string; // 方案编号
  schemeDesignUnit?: string; // 方案设计单位
  schemeName?: string; // 方案名称
  workingHours?: number // 工时
  cycle?: number; // 周期
  remark?: string; // 备注
}


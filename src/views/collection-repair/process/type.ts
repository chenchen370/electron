import { IPropsBaseFrom } from '../../../type/page-type'

export interface IPropsFrom extends IPropsBaseFrom{
  documentUrl?: string; // 修复档案路径
  imageData?: string; // 影像资料
  implementationConditions?: string; // 实施条件
  repairContentDesc?: string; // 工作内容描述

  repairId?: string; // 修复分类ID
  repairMaterial?: string; // 修复材料
  repairPlace?: string; // 修复地点
  repairTime?: string; // 修复日期
  repairTool?: string; // 修复工具
  repairUser?: ''; // 修复人员

  technicalAspects?: string; // 技术环节
  technicalMeans?: string; // 技术手段
  remark?: string; // 备注
}

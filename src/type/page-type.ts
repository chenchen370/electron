export interface IPropsPaginationParams {
  pageNum: number;
  pageSize: number;
}

export interface IPropsDialogInfo {
  title: string,
  isShowDialogAddOrUpdate: boolean,
  isShowDialogDetail: boolean
}

export interface IPropsPageInfo {
  tableList: any[],
  total: number,
  loading: boolean
}

export interface IPropsBaseFrom {
  [key: string]: any
  id?: undefined | string | number;
  createBy?: string; // 创建者
  createTime?: string; // 创建时间
  updateBy?: string; // 更新者
  updateTime?: string; // 更新时间
  remark?: string; // 备注
}

export type TIdList = (string | number | undefined)[]

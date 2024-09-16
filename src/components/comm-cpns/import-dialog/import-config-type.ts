export interface IImportConfig {
  title: string;
  width?: string;
  api: (params: FormData) => void;
  downloadTemplateUrl: string;
  downloadTemplateName: string;
}

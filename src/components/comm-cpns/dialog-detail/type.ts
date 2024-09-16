interface IListItem  {
        name: string;
        value: any | undefined;
        type: "text" | "image" | "time" | "link" | "tag"
        tagType?: "" | "success" | "warning" | "info" | "danger"
}
export type TDetailList = IListItem[]


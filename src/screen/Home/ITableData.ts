import { IData } from "../../store/models/city/IData";

export interface ITableData<T> extends IData<T> {
    readonly city: T;
    readonly picture: string;
}
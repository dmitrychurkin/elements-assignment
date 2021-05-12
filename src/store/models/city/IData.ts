import { ICity } from "./ICity";
import { IHidable } from "./IHidable";
import { TemperatureUnitEnum } from "./TemperatureUnitEnum";

export interface IData<T = ICity> extends IHidable {
    readonly id?: string;
    readonly date: string;
    readonly city: T;
    readonly tempType: TemperatureUnitEnum;
    readonly temp: number;
}
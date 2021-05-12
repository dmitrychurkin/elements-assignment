import { Action, Thunk } from "easy-peasy";
import { ICity } from "./ICity";
import { IData } from "./IData";

export type WeatherData = IData<ICity>;

export interface ICityModel {
    readonly cities: Array<WeatherData>;
    readonly toggleVisible: Action<ICityModel, string | string[]>;
    readonly fetchCities: Thunk<ICityModel, undefined>;
    isLoading: boolean;
}
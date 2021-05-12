import { TemperatureUnitEnum } from "../store/models/city/TemperatureUnitEnum";

const conversionStrategies = new Map<string, (temp: number) => number>()
    .set(TemperatureUnitEnum.K, (temp: number) => temp - 273.15)
    .set(TemperatureUnitEnum.F, (temp: number) => (temp - 32) / 1.8)
    .set(TemperatureUnitEnum.C, (temp: number) => temp);

export const temperatureConverter = (temp: number, unit: TemperatureUnitEnum, roundTo = 2) =>
    Number.parseFloat(conversionStrategies.get(unit)!(temp).toFixed(roundTo));

import { thunk, actionOn, Actions, action } from 'easy-peasy';
import { ICityModel, WeatherData } from './ICityModel';
import { getStorageData } from '../../../util';

export default class CityModel implements ICityModel {
    isLoading = false;
    readonly cities: Array<WeatherData> = [];
    readonly toggleVisible = action<ICityModel, string>((state, name) => {
        state.cities.forEach(c => {
            if (c.city.name.toLowerCase() === name.toLowerCase()) {
                c.isHidden = !c.isHidden;
            }
        });
    });
    readonly fetchCities = thunk<ICityModel, undefined>(async (_, __, { injections }) => {
        const { cityService } = injections;
        try {
            const response = await cityService.fetchCities();

            if (response.ok) {
                const cities = getStorageData('cities');

                return (await response.json()).map((c: WeatherData) => {
                    if (cities?.includes(c.city.name.toLowerCase())) {
                        return {
                            ...c,
                            isHidden: true
                        };
                    }
                    return c;
                });
            }

        }catch {}

        return [];
    });

    readonly onCitiesFetch = actionOn<ICityModel, WeatherData, (actions: Actions<ICityModel>) => any[]>(
        actions => [
            actions.fetchCities.startType,
            actions.fetchCities.successType
        ],
        (state, target) => {
            const [startType, successType] = target.resolvedTargets;
            switch (target.type) {
                case startType: {
                    state.isLoading = true;
                    break;
                }
                case successType: {
                    state.cities.push(...target.result);
                    state.isLoading = false;
                    break;
                }
                default: {
                    state.isLoading = false;
                }
            }
        }
    );
}
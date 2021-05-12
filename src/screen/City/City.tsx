import { FC, memo, useMemo } from "react";
import { useLocation, useParams } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useStoreState } from "../../store";
import useStyles from './style';
import { ITableData } from "../Home/ITableData";
import { temperatureConverter } from "../../util";

const City: FC = () => {
    const classes = useStyles();
    const { state } = useLocation<ITableData<string>>();
    const { city } = useParams<{ city: string }>();

    const cities = useStoreState(state => state.cities);

    const cityObject: ITableData<string> | null = useMemo(() => {
        if (typeof city === 'string') {
            if (state) {
                return state;
            }

            const weatherData = cities.find(c => c.city.name.toLowerCase() === city.toLowerCase());
            if (weatherData) {
                return {
                    ...weatherData,
                    city: weatherData.city.name,
                    picture: weatherData.city.picture,
                    temp: Number.parseFloat(temperatureConverter(weatherData.temp, weatherData.tempType, 1) || '')
                };
            }
        }
        return null;
    }, [state, cities, city]);

    return cityObject ? (
        <Card className={classes.root}>
            <CardMedia
                className={classes.cover}
                image={cityObject.picture}
                title={cityObject.city}
            />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        {cityObject.city}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {`${cityObject.temp} C`}
                    </Typography>
                </CardContent>
            </div>
        </Card>

    ) : null;
};

export default memo(City);

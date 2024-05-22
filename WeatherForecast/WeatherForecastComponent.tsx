import * as React from 'react';
import { useEffect, useState } from 'react';
import { Stack, IStackTokens, Text, FontWeights, ITextStyles, SearchBox } from '@fluentui/react';
import axios from 'axios';
import { getWeatherForecastUrl } from './Api';
import { IWeatherData } from './src/types/helper';
import { WeatherItem } from './src/components/WeatherItem';

const boldStyle: ITextStyles = { root: { fontWeight: FontWeights.bold } };
const stackTokens: IStackTokens = { childrenGap: 2 };
const rootStackTokens: IStackTokens = {
    padding: 20,
    childrenGap: 25,
};

export interface WeatherForecastComponentProps {
    // items: IWeatherData[];
}

export const WeatherForecastComponent = React.memo((props: WeatherForecastComponentProps) => {
    const [items, setItems] = useState([]);
    const [location, setLocation] = useState("Prague");
    const [city, setCity] = useState("");
    const [error, setError] = useState(false);

    const handleLocationChange = (value: string) => {
        setLocation(value);
    };

    useEffect(() => {
        if (location == "")
            return;
        axios.get(getWeatherForecastUrl(location))
            .then(response => {
                console.log(response.data);
                const cityData = response.data.city;
                setCity(cityData.name + ", " + cityData.country);

                const weekData = response.data.list;
                const weekInfo = weekData.map((data: any, index: number) => {
                    return {
                        main: data.weather[0].main,
                        date: new Date(data.dt * 1000),
                        desc: data.weather[0].description,
                        icon: data.weather[0].icon,
                        highTemperature: data.temp.max,
                        lowTemperature: data.temp.min,
                    }
                })
                setItems(weekInfo);
                setError(false);
            })
            .catch(error => {
                console.error(error);
                setError(true);
            })
    }, [location]);

    return (
        <Stack verticalFill verticalAlign="center" tokens={rootStackTokens}>
            <SearchBox placeholder="Please input location here." underlined={true} onSearch={handleLocationChange} />
            {
                error?
                (
                    <Text variant="large" styles={boldStyle}><span style={{color:"red"}}>{location}</span>  Not Found</Text>
                ) :
                (<>
                    <Text variant="large" ><span style={{fontWeight: FontWeights.bold, color:"red"}}>{city}</span>  Weather Forecast</Text>
                    <Stack horizontal horizontalAlign="center" tokens={stackTokens}>
                    {
                        items.map((item: IWeatherData, index: number) => (
                            <WeatherItem key = {index} data = {item} />
                        ))
                    }
                    </Stack>
                </>)
            }

        </Stack>
    );
});
WeatherForecastComponent.displayName = 'WeatherForecastComponent';
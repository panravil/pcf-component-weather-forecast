import * as React from 'react';
import { Stack, Text, FontWeights, IStackTokens, IStackStyles, ITextStyles, Image } from '@fluentui/react';
import { IWeatherData } from '../types/helper';

const boldStyle: ITextStyles = { root: { fontWeight: FontWeights.bold } };
const stackStyles: IStackStyles = {
    root: {
        width: '120px',
        height: '160px',
        textAlign: 'center',
        borderStyle: 'solid',
        borderWidth: '1px', 
    },
};
const stackTokens: IStackTokens = { childrenGap: 5 };

export interface WeatherItemProps {
    data: IWeatherData;
}

export const WeatherItem = React.memo((props: WeatherItemProps) => {
    const { data } = props;
    const date = data.date;
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const str2 = (date.getMonth()+1)+'/'+date.getDate()+'/'+date.getFullYear();
    let str1;
    if (date.getDay() == 0 || date.getDay() == 6)
        str1 = <span style={{color:"red"}}> {weekday[date.getDay()]} </span>;
    else
        str1 = <span style={{color:"blue"}}> {weekday[date.getDay()]} </span>;

    return (
        <Stack horizontalAlign="center" verticalAlign="center" verticalFill styles={stackStyles} tokens={stackTokens}>
            <Text variant="medium" styles={boldStyle}>{str1}</Text>
            <Text variant="small">{str2}</Text>
            <Image src={`https://openweathermap.org/img/w/${data.icon}.png`} />
            <Text variant="small">{data.desc}</Text>
            <Text variant="medium" styles={boldStyle}>{Math.round(data.lowTemperature)}°C - {Math.round(data.highTemperature)}°C</Text>
        </Stack>
    );
});
WeatherItem.displayName = 'WeatherItem';
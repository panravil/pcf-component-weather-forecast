import * as React from 'react';
import { Stack, Text, Icon, FontWeights, IStackTokens, IStackStyles, ITextStyles, DefaultPalette } from '@fluentui/react';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { IWeatherData } from "../types/helper";

const boldStyle: ITextStyles = { root: { fontWeight: FontWeights.bold } };
const stackStyles: IStackStyles = {
    root: {
        width: '90px',
        height: '150px',
        textAlign: 'center',
        borderStyle: 'solid',
        borderWidth: '1px',
    },
};
const stackTokens: IStackTokens = { childrenGap: 5 };
const classes = mergeStyleSets({
    icon: {
      fontSize: '32px',
    },
});


export interface WeatherItemProps {
    data: IWeatherData;
}

export const WeatherItem = React.memo((props: WeatherItemProps) => {
    const { data } = props;
    const date = data.date;
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const str1 = weekday[date.getDay()];
    const str2 = (date.getMonth()+1)+'/'+date.getDate()+'/'+date.getFullYear();

    return (
        <Stack horizontalAlign="center" verticalAlign="center" verticalFill styles={stackStyles} tokens={stackTokens}>
            <Text variant="medium" styles={boldStyle}>{str1}</Text>
            <Text variant="xSmall">{str2}</Text>
            <Icon iconName={data.weatherType} className={classes.icon} />
            <Text variant="xLarge" styles={boldStyle}>{data.temperature}°C</Text>
            <Text variant="xSmall">{data.weatherType}</Text>
        </Stack>
    );
});
WeatherItem.displayName = 'WeatherItem';
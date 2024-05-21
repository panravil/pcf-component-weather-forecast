import * as React from 'react';
import { Stack, IStackTokens, Text, FontWeights, ITextStyles } from '@fluentui/react';
import { IWeatherData } from "./src/types/helper";
import { WeatherItem } from './src/components/WeatherItem';

const boldStyle: ITextStyles = { root: { fontWeight: FontWeights.bold } };
const stackTokens: IStackTokens = { childrenGap: 2 };
const rootStackTokens: IStackTokens = {
    padding: 20,
    childrenGap: 25,
};

export interface WeatherForecastComponentProps {
    items: IWeatherData[];
}

export const WeatherForecastComponent = React.memo((props: WeatherForecastComponentProps) => {
    const { items } = props;
    return (
        <Stack verticalFill verticalAlign="center" tokens={rootStackTokens}>
            <Text variant="medium" styles={boldStyle}>Weather Forecast App</Text>
            <Stack horizontal horizontalAlign="center" tokens={stackTokens}>
            {
                items.map((item: IWeatherData) => (
                    <WeatherItem data = {item} />
                ))
            }
            </Stack>
        </Stack>
    );
});
WeatherForecastComponent.displayName = 'WeatherForecastComponent';
import { useState, useCallback } from 'react';
import { useEvent, useMount } from 'react-use';
import { debounce } from 'lodash-es';
import variables from '../data/shared-variables/shared-variables.internal.json';

type MediaQueriesType = {
  XSMALL: string;
  SMALL: string;
  MEDIUM: string;
  LARGE: string;
  XLARGE: string;
};

export type DeviceStateType = {
  XSMALL: number;
  SMALL: number;
  MEDIUM: number;
  LARGE: number;
  XLARGE: number;
};

type ParsedMediaQueries = { [key in keyof MediaQueriesType]: number };

const { mediaQueries, deviceState: _deviceState } = variables as {
  mediaQueries: MediaQueriesType;
  deviceState: DeviceStateType;
};

const parsedMediaQueries: ParsedMediaQueries = Object.keys(mediaQueries).reduce(
  (object, key) => {
    object[key as keyof MediaQueriesType] =
      +mediaQueries[key as keyof MediaQueriesType].split(/ |px/)[1];
    return object;
  },
  {} as ParsedMediaQueries
);

export function useDeviceStateTracker() {
  const [deviceState, setDeviceState] = useState<number>(_deviceState.XLARGE);
  const keys = Object.keys(mediaQueries);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const callback = useCallback(
    debounce(() => {
      for (let index = 1; index < keys.length; index += 1) {
        if (
          window.innerWidth <
          (parsedMediaQueries[keys[index] as keyof DeviceStateType] as number)
        ) {
          setDeviceState(
            _deviceState[keys[index - 1] as keyof DeviceStateType] as number
          );
          return;
        }

        setDeviceState(
          _deviceState[keys[keys.length - 1] as keyof DeviceStateType] as number
        );
      }
    }, 200),
    []
  );

  useEvent('resize', callback);

  useMount(() => {
    callback();
  });

  return deviceState;
}

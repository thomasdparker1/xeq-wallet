import { AnyAction } from "redux";
import { GET_BLOCK_HEADER_EXCHANGE_RATE_SUCCEED } from "shared/actions/types";
import { DesktopAppState } from "../../platforms/desktop/reducers";
import { Ticker } from "shared/reducers/types";
import bigInt from "big-integer";
import { WebAppState } from "platforms/web/reducers";

export interface ConversionRate {
  fromTicker: Ticker;
  toTicker: Ticker;
  xRate: number;
  xRateRevert: number;
}

export interface XRates {
  height: number;
  timestamp: number;
  rates: ConversionRate[];
}

export interface BlockHeaderRate {
  [key: string]: BlockHeaderRate[keyof BlockHeaderRate];
  height: number;
  signature: string;
  unused1: bigInt.BigInteger;
  unused2: bigInt.BigInteger;
  unused3: bigInt.BigInteger;
  xAG: bigInt.BigInteger;
  xAU: bigInt.BigInteger;
  xAUD: bigInt.BigInteger;
  xBTC: bigInt.BigInteger;
  xCAD: bigInt.BigInteger;
  xCHF: bigInt.BigInteger;
  xCNY: bigInt.BigInteger;
  xEUR: bigInt.BigInteger;
  xGBP: bigInt.BigInteger;
  xJPY: bigInt.BigInteger;
  xNOK: bigInt.BigInteger;
  xNZD: bigInt.BigInteger;
  xUSD: bigInt.BigInteger;
  timestamp: bigInt.BigInteger;
}

const INITIAL_STATE: BlockHeaderRate[] = [];

export const blockHeaderExchangeRate = (
  state: BlockHeaderRate[] = INITIAL_STATE,
  action: AnyAction
): BlockHeaderRate[] => {
  switch (action.type) {
    case GET_BLOCK_HEADER_EXCHANGE_RATE_SUCCEED:
      return [...state, action.payload];
    default:
      return state;
  }
};

export const selectXRateAtHeight = () => {};

export const selectXRate = (
  blockHeaderExchangeRate: BlockHeaderRate[],
  fromTicker: Ticker | null,
  toTicker: Ticker | null
): number => {
  if (blockHeaderExchangeRate.length === 0) {
    return 0;
  }

  if (fromTicker === toTicker) {
    return 1;
  }

  if (fromTicker === null || toTicker === null) {
    return 0;
  }

  const from = fromTicker === Ticker.xUSD ? "unused1" : fromTicker;
  const to = toTicker === Ticker.xUSD ? "unused1" : toTicker;

  const latestBlockerHeader: BlockHeaderRate =
    blockHeaderExchangeRate[blockHeaderExchangeRate.length - 1];

  if (from === Ticker.XHV && to !== Ticker.XHV) {
    // @ts-ignore
    return latestBlockerHeader[to].toJSNumber() / Math.pow(10, 12);
  } else if (from !== Ticker.XHV && to === Ticker.XHV) {
    // @ts-ignore
    if (!latestBlockerHeader[from].isZero()) {
      // @ts-ignore
      return Math.pow(10, 12) / latestBlockerHeader[from].toJSNumber();
    }
  }
  return 0;
};

export const selectLastExchangeRates = (
  state: DesktopAppState | WebAppState
): BlockHeaderRate | null => {
  const latestBlockerHeader: BlockHeaderRate =
    state.blockHeaderExchangeRate[blockHeaderExchangeRate.length - 1];

  return latestBlockerHeader;
};

export const hasLatestXRate = (state: DesktopAppState) => {
  const chainHeight: number = state.chain.chainHeight;
  return state.blockHeaderExchangeRate.some(
    (xRate) => xRate.height === chainHeight - 1
  );
};

export const priceDelta = (state: DesktopAppState): number | null => {
  if (state.blockHeaderExchangeRate.length === 0) {
    return null;
  }

  const latestBlockerHeader =
    state.blockHeaderExchangeRate[state.blockHeaderExchangeRate.length - 1];

  return latestBlockerHeader.xUSD
    .subtract(latestBlockerHeader.unused1)
    .abs()
    .toJSNumber();
};

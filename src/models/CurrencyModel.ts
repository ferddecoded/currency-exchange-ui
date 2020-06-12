export interface CurrencyModel {
  value: string;
  name?: string;
  abbreviation?: string;
  symbol?: string;
  flagURL?: string;
  label?: string;
  news?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [attribute: string]: any;
  }[];
}

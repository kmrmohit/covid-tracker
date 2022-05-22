import { numericRenderer } from "./common-utils";
import { CountryEntity, CovidEntity } from "./global";

export type ColumnConfig = {
  key: keyof CovidEntity | keyof CountryEntity;
  label: string;
  /**hide/show column, default disabled */
  hidden?: boolean;
  /**filter column based on some value, default enabled */
  filter?: boolean;
  /**customise how the cell is displayed */
  render?: (value: any) => React.ReactNode;
  /**default enabled */
  sort?: boolean;
};

export const LabelConfig: Record<
  keyof CovidEntity | keyof CountryEntity,
  string
> = {
  NewConfirmed: "New Confirmed",
  Country: "Country Name",
  TotalConfirmed: "Total Confirmed",
  NewDeaths: "New Deaths",
  TotalDeaths: "Total Deaths",
  NewRecovered: "New Recovered",
  TotalRecovered: "Total Recovered",
  Date: "Date",
  CountryCode: "Country Code",
  Slug: "Slug",
};

export const TableConfig: Array<ColumnConfig> = [
  {
    key: "Country",
    label: LabelConfig.Country,
  },
  {
    key: "NewConfirmed",
    label: LabelConfig.NewConfirmed,
    render: numericRenderer,
  },
  {
    key: "TotalConfirmed",
    label: LabelConfig.TotalConfirmed,
    render: numericRenderer,
  },
  {
    key: "NewDeaths",
    label: LabelConfig.NewDeaths,
    render: numericRenderer,
  },
  {
    key: "TotalDeaths",
    label: LabelConfig.TotalDeaths,
    render: numericRenderer,
  },
  {
    key: "NewRecovered",
    label: LabelConfig.NewRecovered,
    render: numericRenderer,
  },
  {
    key: "TotalRecovered",
    label: LabelConfig.TotalRecovered,
    render: numericRenderer,
  },
];

export const InsightConfig: Array<{
  key: Exclude<keyof CovidEntity, "Date">;
  hidden?: boolean;
  label?: string;
}> = [
  {
    key: "NewConfirmed",
  },
  {
    key: "TotalConfirmed",
  },
  {
    key: "NewDeaths",
  },
  {
    key: "TotalDeaths",
  },
  {
    key: "NewRecovered",
  },
  {
    key: "TotalRecovered",
  },
];

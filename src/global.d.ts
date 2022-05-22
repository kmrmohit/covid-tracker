export type CovidData = {
  ID: string;
  Message: string;
  Global: CovidEntity;
  Countries: Array<CovidEntity & CountryEntity & { ID: string; Date: string }>;
  Date: string;
};

export type CovidEntity = {
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
  Date: string;
};

export type CountryEntity = {
  Country: string;
  CountryCode: string;
  Slug: string;
};

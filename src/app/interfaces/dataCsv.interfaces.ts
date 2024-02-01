export interface CovidDeathRecord {
    UID: string;
    iso2: string;
    iso3: string;
    code3: string;
    FIPS: string;
    Admin2: string;
    Province_State: string;
    Country_Region: string;
    Lat: string;
    Long_: string;
    Combined_Key: string;
    Population: string;
    deathsByDates: DeathByDate[];
    totalDeath: number
  }
  
  export interface DeathByDate {
    [date: string]: number;
  }
  export interface RowCSVData {
    [key: string]: string;
  }
  
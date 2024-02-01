import { Injectable } from "@angular/core";
import * as Papa from "papaparse";
import { RowCSVData } from "src/app/interfaces/dataCsv.interfaces";
export interface StateData {
  population: number;
  totalDeaths: number;
  state: string;
  tasa: number;
}

export interface StateObject {
  [key: string]: StateData;
}
@Injectable({
  providedIn: "root",
})
export class CsvService {
  parseCsv(file: File): Promise<Array<StateData>> {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        complete: (result) => {
          const data = result.data as Array<RowCSVData>;

          const byState = data.reduce((acumulador, item) => {
            const clave = item["Province_State"];
            let totalDeath = 0;
            Object.keys(item).forEach((key) => {
              if (!!Date.parse(key)) {
                totalDeath += Number(item[key]);
              }
            });

            if (!acumulador[clave]) {
              acumulador[clave] = {
                population: 0,
                totalDeaths: 0,
                state: item["Province_State"],
                tasa: 0,
              };
            }

            acumulador[clave].population += Number(item["Population"]);
            acumulador[clave].totalDeaths += totalDeath;

            return acumulador;
          }, {} as StateObject);
          const sorted = Object.values(byState)
            .map((dataState) => {
              const tasaCalc =
                (dataState.totalDeaths / dataState.population) * 100;
              const tasa =
                !isFinite(tasaCalc) || isNaN(tasaCalc) ? 0 : tasaCalc;
              dataState.tasa = tasa;
              return dataState;
            })
            .sort((a, b) => a.tasa - b.tasa);
          resolve(sorted);
        },
        header: true,
        skipEmptyLines: true,
        error: (error) => reject(error),
      });
    });
  }
}

// upload.component.ts
import { Component, ViewChild } from "@angular/core";
import DatalabelsPlugin from "chartjs-plugin-datalabels";
import { CovidDeathRecord } from "src/app/interfaces/dataCsv.interfaces";
import { CsvService, StateData, StateObject } from "src/app/services/csv/csv.service";
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from "chart.js";
import { BaseChartDirective } from "ng2-charts";

@Component({
  selector: "app-upload",
  templateUrl: "./csv-upload.component.html",
  styleUrls: ["./csv-upload.component.css"],
})
export class UploadComponent {
  file!: File;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  pieChartType: ChartType = 'doughnut';
  pieChartPlugins = [DatalabelsPlugin];
  pieChartData: ChartData<'doughnut', number[], string | string[]> = {
    labels: [],
    datasets: [],
  };
  stateWithMostDeaths: string = "";
  stateWithLeastDeaths: string = "";
  mostAffectedState!: StateData;
  

  // Pie
  public pieChartOptions: ChartConfiguration["options"] = {
    plugins: {
      title: {
        display: true,
        text: "Muertes por Estado"
      },
      legend: {
        display: false,
      },
      datalabels: {
        display: true,
        font: {
          size: 8
        },
        
        formatter: (value: any, ctx: any) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    },
    layout: {
      padding: 20,
    },
    responsive: true,
  };

  constructor(private csvService: CsvService) {}


  async onSubmit() {
    if (this.file) {
      try {
        const data = await this.csvService.parseCsv(this.file);
        this.processData(data);
      } catch (error) {
        console.error(error);
      }
    }
  }

  async onChange(files: FileList) {
    this.file  = files[0];
  }

  processData(data: StateData[]) {
    const { maxDeaths, minDeaths } = this.findExtremesByRate(data)
    this.mostAffectedState = data[data.length - 1];
    this.stateWithLeastDeaths = minDeaths.state;
    this.stateWithMostDeaths = maxDeaths.state;

    this.pieChartData = {
      labels: data.map(dataState => dataState.state),
      datasets: [
        {
          data: data.map(dataState => dataState.tasa),
        },
      ],
    };
    this.chart?.update();
  }

  

  findExtremesByRate(data: StateData[]) {
  
    let minDeaths = data[0];
    let maxDeaths = data[0];
    let currentMinDeaths = minDeaths.totalDeaths;
    let currentMaxDeath = maxDeaths.totalDeaths;
  
    for (let i = 0; i < data.length; i++) {
      const currentDeath = data[i].totalDeaths;
      
      if (currentDeath < currentMinDeaths) {
        minDeaths = data[i];
        currentMinDeaths = currentDeath; 
      } else if (currentDeath > currentMaxDeath) {
        maxDeaths = data[i];
        currentMaxDeath = currentDeath;
      }
    }
  
    return {  minDeaths, maxDeaths };
  }
  

}

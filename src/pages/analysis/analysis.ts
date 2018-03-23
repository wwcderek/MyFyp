import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FilmService } from '../../app/services/film.service';
import { Chart } from 'chart.js';
/**
 * Generated class for the AnalysisPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-analysis',
  templateUrl: 'analysis.html',
  providers: [FilmService]
})
export class AnalysisPage {
  public chartLables:string[] = ['Action', 'Horror', 'Drama', 'Fiction', 'Animation']
  public chartData:number[] = [1,2,3,4,5];
  public chartType:string = 'doughnut';
  public lineChart: any;
  public barChart: any;
  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('barCanvas') barCanvas;
  constructor(public navCtrl: NavController, public navParams: NavParams, public filmService: FilmService) {
    this.getChart();
  }

  ionViewDidLoad() {
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
    
          type: 'line',
          data: {
              labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Octomber", "November", "December"],
              datasets: [
                  {
                      label: "Overall Trend",
                      fill: false,
                      lineTension: 0.1,
                      backgroundColor: "rgba(75,192,192,0.4)",
                      borderColor: "rgba(75,192,192,1)",
                      borderCapStyle: 'butt',
                      borderDash: [],
                      borderDashOffset: 0.0,
                      borderJoinStyle: 'miter',
                      pointBorderColor: "rgba(75,192,192,1)",
                      pointBackgroundColor: "#fff",
                      pointBorderWidth: 1,
                      pointHoverRadius: 5,
                      pointHoverBackgroundColor: "rgba(75,192,192,1)",
                      pointHoverBorderColor: "rgba(220,220,220,1)",
                      pointHoverBorderWidth: 2,
                      pointRadius: 1,
                      pointHitRadius: 10,
                      data: [10, 15, 5, 20],
                      spanGaps: false,
                  }
              ]
          }
      });

      this.barChart = new Chart(this.barCanvas.nativeElement, {
    
        type: 'bar',
        data: {
            labels: ["Action", "Horror", "Drama", "Fiction", "Animation"],
            datasets: [{
                label: 'Number of Event',
                data: [12, 19, 3, 5, 2],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
  }

  getChart() {
    this.filmService.getChart().subscribe(response => {
      this.chartData = response;
    })
  }
}

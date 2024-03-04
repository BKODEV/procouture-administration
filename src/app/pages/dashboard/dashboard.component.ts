import { Component } from '@angular/core';

import { DecimalPipe, NgClass } from '@angular/common';
import { Store } from '@ngrx/store';
import { fetchfeedbackdataData, fetchpropertydataData, fetchrentproprtydataData, fetchsalepropertydataData } from 'src/app/store/RealEstate/realEstate.action';
import { selectData, selectfeedData, selectrentData, selectsaleData } from 'src/app/store/RealEstate/realEstate-selector';
import { SimplebarAngularModule } from 'simplebar-angular';
import { RouterLink } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FlatpickrModule } from 'angularx-flatpickr';
import { FormsModule } from '@angular/forms';
import { NgxEchartsDirective } from 'ngx-echarts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CountUpModule } from 'ngx-countup';
import { BreadcrumbsComponent } from '../../shared/breadcrumbs/breadcrumbs.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    providers: [DecimalPipe],
    standalone: true,
    imports: [BreadcrumbsComponent, CountUpModule, NgApexchartsModule, BsDropdownModule, NgxEchartsDirective, FormsModule, FlatpickrModule, TabsModule, RouterLink, NgClass, SimplebarAngularModule]
})

export class DashboardComponent {
  // bread crumb items
  breadCrumbItems!: Array<{}>;  
  saleChart: any;
  rentChart: any;
  visitorsChart: any;
  residencypropertyChart: any;

  propertylist: any;
  feedbackData: any;
  //rentpropertyData: any;
  currentDate: any;
  currentTab = 'sale';


  sortValue: any = 'Property Name'


  constructor(public store: Store) {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.currentDate = { from: firstDay, to: lastDay }
  }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Dashboards', active: true },
    ];

    // Chart Color Data Get Function
    this._saleChart('["--tb-primary"]');
    this._rentChart('["--tb-warning"]');
    this._visitorsChart('["--tb-secondary"]');
    this._residencypropertyChart('["--tb-success"]');

    // store data
    this.store.dispatch(fetchpropertydataData());
    this.store.select(selectData).subscribe((data) => {
      this.propertylist = data;
    });
    this.store.dispatch(fetchfeedbackdataData());
    this.store.select(selectfeedData).subscribe((data) => {
      this.feedbackData = data;
    });

    //this.store.dispatch(fetchsalepropertydataData());
    
    //this.store.dispatch(fetchrentproprtydataData());
    // this.store.select(selectrentData).subscribe((data) => {
    //   this.rentpropertyData = data;
    // });

  }
  // Change Tab Content
  changeTab(tab: string) {
    this.currentTab = tab;
  }

  // Chart Colors Set
  private getChartColorsArray(colors: any) {
    colors = JSON.parse(colors);
    return colors.map(function (value: any) {
      var newValue = value.replace(" ", "");
      if (newValue.indexOf(",") === -1) {
        var color = getComputedStyle(document.documentElement).getPropertyValue(newValue);
        if (color) {
          color = color.replace(" ", "");
          return color;
        }
        else return newValue;;
      } else {
        var val = value.split(',');
        if (val.length == 2) {
          var rgbaColor = getComputedStyle(document.documentElement).getPropertyValue(val[0]);
          rgbaColor = "rgba(" + rgbaColor + "," + val[1] + ")";
          return rgbaColor;
        } else {
          return newValue;
        }
      }
    });
  }

  /**
  * Sale Charts
  */
  private _saleChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.saleChart = {
      series: [80],
      chart: {
        width: 110,
        height: 110,
        type: 'radialBar',
        sparkline: {
          enabled: true
        }
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: '50%',
          },
          track: {
            margin: 0,
            background: colors,
            opacity: 0.2,
          },
          dataLabels: {
            show: false
          }
        }
      },
      grid: {
        padding: {
          top: -15,
          bottom: -15
        }
      },
      stroke: {
        lineCap: 'round'
      },
      labels: ['Cricket'],
      colors: colors
    }
    const attributeToMonitor = 'data-theme';

    const observer = new MutationObserver(() => {
      this.reloadCharts();

    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [attributeToMonitor]
    });
  }

  reloadCharts() {
    this._saleChart('["--tb-primary"]');
    this._rentChart('["--tb-warning"]');
    this._visitorsChart('["--tb-secondary"]');
    this._residencypropertyChart('["--tb-success"]');
  }

  /**
  * Rent Charts
  */
  private _rentChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.rentChart = {
      series: [65],
      chart: {
        width: 110,
        height: 110,
        type: 'radialBar',
        sparkline: {
          enabled: true
        }
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: '50%'
          },
          track: {
            margin: 0,
            background: colors,
            opacity: 0.2,
          },
          dataLabels: {
            show: false
          }
        }
      },
      grid: {
        padding: {
          top: -15,
          bottom: -15
        }
      },
      stroke: {
        lineCap: 'round'
      },
      labels: ['Cricket'],
      colors: colors
    }
    // const attributeToMonitor = 'data-theme';

    // const observer = new MutationObserver(() => {
    //   this._rentChart('["--tb-warning"]');
    // });
    // observer.observe(document.documentElement, {
    //   attributes: true,
    //   attributeFilter: [attributeToMonitor]
    // });
  }

  /**
  * visitors Charts
  */
  private _visitorsChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.visitorsChart = {
      series: [47],
      chart: {
        width: 110,
        height: 110,
        type: 'radialBar',
        sparkline: {
          enabled: true
        }
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: '50%'
          },
          track: {
            margin: 0,
            background: colors,
            opacity: 0.2,
          },
          dataLabels: {
            show: false
          }
        }
      },
      grid: {
        padding: {
          top: -15,
          bottom: -15
        }
      },
      stroke: {
        lineCap: 'round'
      },
      labels: ['Cricket'],
      colors: colors
    }
    // const attributeToMonitor = 'data-theme';

    // const observer = new MutationObserver(() => {
    //   this._visitorsChart('["--tb-secondary"]');
    // });
    // observer.observe(document.documentElement, {
    //   attributes: true,
    //   attributeFilter: [attributeToMonitor]
    // });
  }

  /**
  * Residency Property Charts
  */
  private _residencypropertyChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.residencypropertyChart = {
      series: [43],
      chart: {
        width: 110,
        height: 110,
        type: 'radialBar',
        sparkline: {
          enabled: true
        },
        redrawOnParentResize: true
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: '50%'
          },
          track: {
            margin: 0,
            background: colors,
            opacity: 0.2,
          },
          dataLabels: {
            show: false
          }
        }
      },
      grid: {
        padding: {
          top: -15,
          bottom: -15
        }
      },
      stroke: {
        lineCap: 'round'
      },
      labels: ['Cricket'],
      colors: colors
    }
    // const attributeToMonitor = 'data-theme';

    // const observer = new MutationObserver(() => {
    //   this._residencypropertyChart('["--tb-success"]');
    // });
    // observer.observe(document.documentElement, {
    //   attributes: true,
    //   attributeFilter: [attributeToMonitor]
    // });
  }

 

 
  // Add Sorting
  direction: any = 'asc';
  sortKey: any = '';
  sortBy(column: any, value: any) {
    this.sortValue = value;
    this.onSort(column)
  }
  
  onSort(column: any) {
    if (this.direction == 'asc') {
      this.direction = 'desc';
    } else {
      this.direction = 'asc';
    }
    const sortedArray = [...this.propertylist]; // Create a new array
    sortedArray.sort((a, b) => {
      const res = this.compare(a[column], b[column]);
      return this.direction === 'asc' ? res : -res;
    });
    this.propertylist = sortedArray;
  }
  compare(v1: string | number, v2: string | number) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }

  
}

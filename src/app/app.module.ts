import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './shared/components/header/header.component';
import { HeaderModule } from './shared/components/header/header.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { VaccinationDailyChartComponent } from './components/vaccination-daily-chart/vaccination-daily-chart.component';
import { VaccinationDailyChartModule } from './components/vaccination-daily-chart/vaccination-daily-chart.module';
import { VaccinationWorldChartComponent } from './components/vaccination-world-chart/vaccination-world-chart.component';
import { VaccinationWorldChartModule } from './components/vaccination-world-chart/vaccination-world-chart.module';
import { VaccinationWorldmapChartComponent } from './components/vaccination-worldmap-chart/vaccination-worldmap-chart.component';
import { VaccinationWorldmapChartModule } from './components/vaccination-worldmap-chart/vaccination-worldmap-chart.module';
import { LoginComponent } from './components/login/login.component';
import { LoginModule } from './components/login/login.module';
import { DatasetManagerComponent } from './components/dataset-manager/dataset-manager.component';
import { DatasetManagerModule } from './components/dataset-manager/dataset-manager.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PageNotFoundModule } from './components/page-not-found/page-not-found.module';
import { ApiModule } from './components/api/api.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    VaccinationDailyChartComponent,
    VaccinationWorldChartComponent,
    VaccinationWorldmapChartComponent,
    LoginComponent,
    DatasetManagerComponent,
    PageNotFoundComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HeaderModule,
    DashboardModule,
    VaccinationDailyChartModule,
    VaccinationWorldChartModule,
    VaccinationWorldmapChartModule,
    LoginModule,
    DatasetManagerModule,
    PageNotFoundModule,
    ApiModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

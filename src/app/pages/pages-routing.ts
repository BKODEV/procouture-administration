import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ComptesComponent } from './comptes/comptes.component';
import { CommerciauxComponent } from './commerciaux/commerciaux.component';

// In the main application:
export const ROUTES: Route[] = [

  { path: "", component : DashboardComponent},
  {path: "procouture-users", component: ComptesComponent},
  {path: "commerciaux", component: CommerciauxComponent},
  // ...
];



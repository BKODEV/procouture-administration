import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ComptesComponent } from './comptes/comptes.component';
import { CommerciauxComponent } from './commerciaux/commerciaux.component';
import { PaiementsComponent } from './paiements/paiements.component';

// In the main application:
export const ROUTES: Route[] = [

  { path: "", component : DashboardComponent},
  {path: "procouture-users", component: ComptesComponent},
  {path: "commerciaux", component: CommerciauxComponent},
  {path: "paiements", component: PaiementsComponent},
  // ...
];



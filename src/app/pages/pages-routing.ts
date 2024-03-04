import { Route } from '@angular/router';

// In the main application:
export const ROUTES: Route[] = [

  { path: "", loadChildren: () => import('./dashboard/dashboard-routing')},
  // ...
];




import { RouterModule, Route } from '@angular/router';
import { IndexComponent } from './index/index.component';



// In admin/routes.ts:
export default [
  {path: '', component: IndexComponent},
  // ...
] satisfies Route[];


import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { createTranslateLoader } from './app/app.module';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { LayoutsModule } from './app/layouts/layouts.module';
import { AppRoutingModule } from './app/app-routing.module';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { CourcesEffects } from './app/store/Learning-cources/cources.effect';
import { studentsEffects } from './app/store/students/student.effcts';
import { CustomerEffects } from './app/store/Customer/customer.effects';
import { InstructorEffects } from './app/store/Learning-instructor/instructor.effects';
import { OrdersEffects } from './app/store/Orders/order.effects';
import { SellerEffects } from './app/store/Seller/seller.effects';
import { AuthenticationEffects } from './app/store/Authentication/authentication.effects';
import { InvoiceEffects } from './app/store/Invoices/invoices.effects';
import { ProductEffects } from './app/store/Product/product.effect';
import { ChatEffects } from './app/store/chat/chat.effects';
import { TicketEffects } from './app/store/Tickets/ticket.effects';
import { AgenciesEffects } from './app/store/Agency/agency.effects';
import { AgentEffects } from './app/store/Agent/agent.effects';
import { AppRealestateEffects } from './app/store/App-realestate/apprealestate.effects';
import { RealEffects } from './app/store/RealEstate/realEstate.effects';
import { LearningEffects } from './app/store/Learning/learning.effects';
import { ECoEffects } from './app/store/Ecommerce/ecommerce.effects';
import { CRMEffects } from './app/store/CRM/crm.effects';
import { AnalyticsEffects } from './app/store/Analytics/analytics.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { rootReducer } from './app/store';
import { StoreModule } from '@ngrx/store';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { HTTP_INTERCEPTORS, HttpClient, withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { httpInterceptorProvider } from './app/interceptors/interceptors-provider';

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(TranslateModule.forRoot({
            defaultLanguage: 'fr',
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }), StoreModule.forRoot(rootReducer), StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production, // Restrict extension to log-only mode
        }), EffectsModule.forRoot([
            AnalyticsEffects,
            CRMEffects,
            ECoEffects,
            LearningEffects,
            RealEffects,
            AppRealestateEffects,
            AgentEffects,
            AgenciesEffects,
            TicketEffects,
            ChatEffects,
            ProductEffects,
            InvoiceEffects,
            AuthenticationEffects,
            SellerEffects,
            OrdersEffects,
            InstructorEffects,
            CustomerEffects,
            studentsEffects,
            CourcesEffects,
            InstructorEffects
        ]), BrowserModule, AppRoutingModule, LayoutsModule, ToastrModule.forRoot(), FormsModule, ReactiveFormsModule, AngularFireAuthModule),
        httpInterceptorProvider,
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations()
    ]
})
  .catch(err => console.error(err));

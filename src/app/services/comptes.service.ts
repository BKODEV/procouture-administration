import { Injectable } from '@angular/core';
import { GlobalComponent } from '../global-component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, finalize, throwError } from 'rxjs';


const url = GlobalComponent.API_URL


@Injectable({
  providedIn: 'root'
})

export class ComptesService {
  private cachedComptes!: any[]; // Cache for comptes data


  constructor(private http : HttpClient, private router : Router) { }





  getComptes () {
    return this.http.get('http://127.0.0.1:8000/api/admin/comptes',)
    
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Gérer l'erreur 401 ici, par exemple, rediriger l'utilisateur vers la page de connexion
          console.error("Erreur 401 : Non autorisé.");
          
          // Rediriger l'utilisateur vers la page de connexion ou afficher un message d'erreur approprié
          // this.router.navigate(['/login']); // Assurez-vous d'importer Router depuis '@angular/router'
        } else {
          console.error("Erreur lors de la récupération des comptes :", error);
        }
        return throwError(error);
      })
    )
  }

  
}

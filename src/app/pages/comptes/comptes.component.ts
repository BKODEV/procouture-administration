import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from 'src/app/shared/breadcrumbs/breadcrumbs.component';
import { ComptesService } from 'src/app/services/comptes.service';

@Component({
  selector: 'app-comptes',
  standalone: true,
  imports: [CommonModule, BreadcrumbsComponent],
  templateUrl: './comptes.component.html',
  styleUrl: './comptes.component.scss'
})
export class ComptesComponent implements OnInit {



  breadCrumbItems!: Array<{}>;  
  sortValue: any = 'Property Name'

  propertylist: any;
  comptes! : any

  constructor (private compteservice : ComptesService) {}

    ngOnInit(): void {

       //RECUPERER LES COMPTES
       this.getAllcompte()


      this.breadCrumbItems = [
        { label: 'Home' },
        { label: 'Comptes', active: true },
      ];

    }


    getAllcompte ()  {
      this.compteservice.getComptes()
       .subscribe(data => {
         this.comptes = data
         console.log(this.comptes);
       },error => {
         return false;
         console.error("Erreur lors de la récupération des comptes :", error);
         // Ajoutez ici le traitement de l'erreur selon vos besoins
       })
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

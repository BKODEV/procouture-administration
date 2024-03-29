import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from 'src/app/shared/breadcrumbs/breadcrumbs.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { PageChangedEvent, PaginationModule } from 'ngx-bootstrap/pagination';
import { PaiementsService } from 'src/app/services/paiements.service';
import { Paiement } from 'src/app/types/paiement.type';

@Component({
  selector: 'app-paiements',
  standalone: true,
  imports: [
    CommonModule, 
    BreadcrumbsComponent, 
    FormsModule,
    NgSelectModule,
    PaginationModule
  ],
  templateUrl: './paiements.component.html',
  styleUrl: './paiements.component.scss'
})
export class PaiementsComponent implements OnInit {


  // bread crumb items
  breadCrumbItems!: Array<{}>;
  public items: string[] = ['Adidas', 'Boat', 'Puma', 'Realme'];
  currentPage = 1
  endItem: any;

  paiements! : Paiement[];
  allpaiements! : Paiement[];



  constructor (private paiementService : PaiementsService) {}

  ngOnInit(): void {
      /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Home' },
      { label: 'Paiements', active: true },
    ];


    this.paiementService.getAllPaiements()
     .subscribe({
      next : data => {
        this.allpaiements = data;
        
        if (this.allpaiements.length < 10) {
          this.paiements = this.allpaiements // Copie tous les paiements
      } else {
          this.paiements = this.allpaiements.slice(0, 10); // Prend les 10 premiers paiements
      }
      console.log(data.length);
      console.log(data.length);
      },
      error : error => {console.log(error); document.getElementById('elmLoader')?.classList.add('d-none')},
       complete : () => {document.getElementById('elmLoader')?.classList.add('d-none');}
     })

  }




  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    this.endItem = event.page * event.itemsPerPage;
    this.paiements = this.allpaiements.slice(startItem, this.endItem);
 
}

  term: any

  // filterdata
  filterdata() {

    if (this.term) {
      this.paiements = this.allpaiements.filter((el: any) =>
        el.nom.toLowerCase().includes(this.term.toLowerCase()) ||
        el.prenom.toLowerCase().includes(this.term.toLowerCase()) ||
        el.ref.toLowerCase().includes(this.term.toLowerCase()) ||
        el.telephone.toLowerCase().includes(this.term.toLowerCase())
      );
    } else {
      this.paiements = this.allpaiements.slice(0,9);
    }


    // noResultElement
    this.updateNoResultDisplay();
  }

  // no result 
  updateNoResultDisplay() {
    const noResultElement = document.querySelector('.noresult') as HTMLElement;
    const paginationElement = document.getElementById('pagination-element') as HTMLElement;
    if (this.term && this.paiements.length === 0) {
      noResultElement.style.display = 'block';
      paginationElement.classList.add('d-none')
    } else {
      noResultElement.style.display = 'none';
      paginationElement.classList.remove('d-none')
      //this.pageChanged({itemsPerPage: 10,page: 1})
    }
  }

    // Sort Data
    direction: any = 'asc';
    onSort(column: any) {
      if (this.direction == 'asc') {
        this.direction = 'desc';
      } else {
        this.direction = 'asc';
      }
      const sortedArray = [...this.paiements]; // Create a new array
      sortedArray.sort((a : any, b : any) => {
        const res = this.compare(a[column], b[column]);
        return this.direction === 'asc' ? res : -res;
      });
      this.paiements = sortedArray;
    }
    compare(v1: string | number, v2: string | number) {
      return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
    }

}

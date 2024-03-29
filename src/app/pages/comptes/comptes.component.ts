import { Component, ElementRef, ViewChild } from '@angular/core';
// import {  DecimalPipe,  } from '@angular/common';

import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalDirective, ModalModule } from 'ngx-bootstrap/modal';
import { Store } from '@ngrx/store';
import { PageChangedEvent, PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsetComponent, TabsModule } from 'ngx-bootstrap/tabs';
import { RouterLink } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { BreadcrumbsComponent } from 'src/app/shared/breadcrumbs/breadcrumbs.component';
import { ComptesService } from 'src/app/services/comptes.service';
import { Compte } from 'src/app/types/compte.type';
import { FormuleAbonnementService } from 'src/app/services/formule-abonnement.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-comptes',
    templateUrl: './comptes.component.html',
    styleUrls: ['./comptes.component.scss'],
    providers: [],
    standalone: true,
    imports: [
      BreadcrumbsComponent, FormsModule, NgSelectModule, RouterLink, BsDropdownModule, PaginationModule, ModalModule, ReactiveFormsModule, CommonModule,
      TabsModule
    ]
})

// Product Component
export class ComptesComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  productForm!: UntypedFormGroup;
  submitted = false;
  comptes!: Compte[];
  masterSelected!: boolean;
  endItem: any;
  selectCompteForDetail : Compte | undefined = undefined

  currentPage = 1


  msgAlert(msg : string, typeMsg : any) {
    Swal.fire({
      position: 'center',
      icon: typeMsg,
      title: msg,
      showConfirmButton: false,
      showCancelButton: true,
      timer: 2500,
    });
  }


  // Table data
  allComptes! : Compte[];

  @ViewChild('staticTabs', { static: false }) staticTabs?: TabsetComponent;
  @ViewChild('CompeDetailModal', { static: false }) CompeDetailModal?: ModalDirective;
  @ViewChild('deleteCompteModal', { static: false }) deleteCompteModal?: ModalDirective;
  @ViewChild('UpdatePlanModal', { static: false }) UpdatePlanModal?: ModalDirective;
  @ViewChild('offre', { static: false }) selectElement ?: ElementRef;


  deleteCompteId: any;
  content: any;

  constructor(private formBuilder: UntypedFormBuilder, public store: Store, private compteservice : ComptesService, private formuleService : FormuleAbonnementService) {
  }


  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Home' },
      { label: 'Comptes', active: true },
    ];

    // Fetch Data
    this.getAllcompte()
    
    

    /**
     * Form Validation
     */
    this.productForm = this.formBuilder.group({
      id: [''],
      title: ['', [Validators.required]],
      category: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      price: ['', [Validators.required]],
      img: ['', [Validators.required]],
      publish: null
    });
  }
    

  getAllcompte ()  {
    this.compteservice.getComptes()
     .subscribe({
      next : data => {
        this.allComptes = data,
        this.comptes = this.allComptes.slice(0, 10);
      },
       complete : () => {document.getElementById('elmLoader')?.classList.add('d-none');}
     })
  }

  //Traitement de renouvellement d'abonnement
  CompteFormGroupSubmited : boolean = false
  formules : any[] = []
  selectedFormule : any
  selectedFormuleOptionIndex: number | null = null;

  CompteFormGroup = this.formBuilder.group({
    formule : ['', [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
    compte : ['', [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
  })


  openUpdatePlanModal(id : any){
    this.formuleService.getSubscriptionFormule().subscribe(
      (body)=>{
        this.formules = body.data.offre_abonnement
        console.log(this.formules);
        this.CompteFormGroup.get('compte')?.setValue(id)
        this.UpdatePlanModal?.show()
      })
      
  }

   //changement de valeur du select des offres
  onUpdateSelectedFormule() {
    this.selectedFormule = this.formules.find((item) => item.id === parseInt(this.selectElement?.nativeElement.value, 10))
    //SUpression des ancienne donnée selectionnée si existante
    this.selectedFormuleOptionIndex = null
    this.CompteFormGroup.get('formule')?.setValue('')
  }

  //Choix de la formule
  initialiseFormAbonnementData(index : number, formule : any){
    this.CompteFormGroupSubmited = false
    this.selectedFormuleOptionIndex = index
    this.CompteFormGroup.get('formule')?.setValue(formule)
  }




  submitSubscriptionForm(){
    console.log('submit');
    
    if (this.CompteFormGroup.valid) {
      document.getElementById('elmLoader')?.classList.remove('d-none')
      this.formuleService.addSubscription(this.CompteFormGroup.value).subscribe(
        (data) => {
          if(data.status == 'success'){
            //fermer le modal
            this.UpdatePlanModal?.hide()
            //Msg d'alert
            this.msgAlert("Réabonnement réussi", 'success')
            document.getElementById('elmLoader')?.classList.remove('d-none')
            //recharger les comptes

            this.getAllcompte()
            this.currentPage = 1
            this.selectedFormule = null
            this.selectedFormuleOptionIndex = null
          }
        }
      )
     }
  }

//Ouverture de modale de confirmation de suppression
 // Delete Product
 removeCompte(id: any) {
  this.deleteCompteId = id
  this.deleteCompteModal?.show()
}

//FOnction de suppression de compte
deleteSelectedCompte(){
  if(this.deleteCompteId === null){
    //MAJ du message d'alerte en cas d'erreur
    this.msgAlert("Une erreur innatendue est survenue, veuillez ressayer !!!",'Warning');
    //affichage du message d'alert
  }else{
    this.compteservice.deleteCompte(this.deleteCompteId)
    .subscribe(
      (response) => {
        if(response.status == 'success'){
          
          //recupérer les information du compte precedent
          var deletedCompte = this.allComptes.find( (compte) => compte.id === this.deleteCompteId)
          
          //rénitialisé la varieble de compte selectionné
          this.deleteCompteId = null;
          //Mettre à jour le message d'alerte
          this.msgAlert(`Le compte ${deletedCompte?.email} à été supprimé`, 'success')
          
          this.deleteCompteModal?.hide()
          
        }else{
          //MAJ du message d'alerte en cas d'erreur
          this.msgAlert("Une erreur innatendue est survenue, veuillez ressayer !!!",'Warning');
          //affichage du message d'alert
          this.deleteCompteModal?.hide()
        }
      }
    )

    document.getElementById('elmLoader')?.classList.remove('d-none')
    //recharger les comptes

    this.getAllcompte()
    this.currentPage = 1
    
  }

}


  public items: string[] = ['Adidas', 'Boat', 'Puma', 'Realme'];
  // Sort Data
  direction: any = 'asc';
  onSort(column: any) {
    if (this.direction == 'asc') {
      this.direction = 'desc';
    } else {
      this.direction = 'asc';
    }
    const sortedArray = [...this.comptes]; // Create a new array
    sortedArray.sort((a : any, b : any) => {
      const res = this.compare(a[column], b[column]);
      return this.direction === 'asc' ? res : -res;
    });
    this.comptes = sortedArray;
  }
  compare(v1: string | number, v2: string | number) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }


  // Edit Data
  viewCompteDetail(id: any) {
    const selected = this.comptes.find( compte =>  compte.id == id)
    this.selectCompteForDetail = selected
    this.CompeDetailModal?.show()
  }

  
 
  pageChanged(event: PageChangedEvent): void {
      const startItem = (event.page - 1) * event.itemsPerPage;
      this.endItem = event.page * event.itemsPerPage;
      this.comptes = this.allComptes.slice(startItem, this.endItem);
   
  }

  term: any

  // filterdata
  filterdata() {

    if (this.term) {
      this.comptes = this.allComptes.filter((el: any) =>
        el.nom.toLowerCase().includes(this.term.toLowerCase()) ||
        el.prenom.toLowerCase().includes(this.term.toLowerCase()) ||
        el.ref.toLowerCase().includes(this.term.toLowerCase()) ||
        el.telephone.toLowerCase().includes(this.term.toLowerCase())
      );
    } else {
      this.comptes = this.allComptes.slice(0,9);
    }


    // noResultElement
    this.updateNoResultDisplay();
  }

  // no result 
  updateNoResultDisplay() {
    const noResultElement = document.querySelector('.noresult') as HTMLElement;
    const paginationElement = document.getElementById('pagination-element') as HTMLElement;
    if (this.term && this.comptes.length === 0) {
      noResultElement.style.display = 'block';
      paginationElement.classList.add('d-none')
    } else {
      noResultElement.style.display = 'none';
      paginationElement.classList.remove('d-none')
      //this.pageChanged({itemsPerPage: 10,page: 1})
    }
  }
}

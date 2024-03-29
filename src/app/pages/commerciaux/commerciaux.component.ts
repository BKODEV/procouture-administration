import { Component, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

import { CommonModule, DecimalPipe, NgClass } from '@angular/common';
import { ModalDirective, ModalModule } from 'ngx-bootstrap/modal';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Store } from '@ngrx/store';
import { addcustomerData, deletecustomerData, fetchcustomerData, updatecustomerData } from 'src/app/store/Customer/customer.action';
import { selectData } from 'src/app/store/Customer/customer.selector';
import { PageChangedEvent, PaginationModule } from 'ngx-bootstrap/pagination';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { SimplebarAngularModule } from 'simplebar-angular';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BreadcrumbsComponent } from 'src/app/shared/breadcrumbs/breadcrumbs.component';
import { CommerciauxService } from '../../services/commerciaux.service';
import { Commercial, CommercialRequest } from 'src/app/types/commerciaux.type';

@Component({
    selector: 'app-commerciaux',
    templateUrl: './commerciaux.component.html',
    styleUrls: ['./commerciaux.component.scss'],
    providers: [DecimalPipe],
    standalone: true,
    imports: [
      BreadcrumbsComponent, 
      FormsModule, NgClass, 
      BsDropdownModule, 
      PaginationModule, 
      // CKEditorModule, 
      SimplebarAngularModule, 
      ModalModule, 
      ReactiveFormsModule, 
      TooltipModule,
      CommonModule
    ]
})

// customer component
export class CommerciauxComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  loading : boolean = false //statut requête asynchrone modal
  endItem: any //pagination
  commerciaux!: Commercial[]; //liste des commerciaux
  commercialForm!: UntypedFormGroup; //formulaire
  onEdition : boolean = false
  submitted: boolean = false;
  // public Editor = ClassicEditor;
  term: any;
  Customerlist: any
  deleteId: any;
  restrictionId: any;

  @ViewChild('addCommercialModal', { static: false }) addCommercialModal?: ModalDirective;
  @ViewChild('deleteCommercialModal', { static: false }) deleteCommercialModal?: ModalDirective;
  @ViewChild('restrictionCommercialModal', { static: false }) restrictionCommercialModal?: ModalDirective;
  @ViewChild('activeCommercialModal', { static: false }) activeCommercialModal?: ModalDirective;
  commercialDetail: any;


  constructor(private formBuilder: UntypedFormBuilder, private commerciauxService : CommerciauxService, public store: Store) {
  }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Home', active: false },
      { label: 'Gestion des commerciaux', active: true }
    ];

    // Recuperation des commerciaux
    this.commerciauxService.getAllCommerciaux().subscribe({
      next : (data)=> {
        this.commerciaux = data
        this.updateNoResultDisplay()
        document.getElementById('elmLoader')?.classList.add('d-none')
      }
    })
    
    
    /**
 * Form Validation
 */
  this.commercialForm = this.formBuilder.group({
      nom: ['', [Validators.required]],
      email: ['', [Validators.email]],
      phone: [''],
      adresse: [''],
  });
  }

  hideHerrorMsg(){
    const errorMsgElement = document.getElementById('error-msg');
    if (errorMsgElement) {
        errorMsgElement.classList.add('d-none');
        errorMsgElement.innerHTML = "";
    }
  }
  
  // Add Customer
  saveCustomer() {
    if (this.commercialForm.valid) {
      const data : CommercialRequest = {
        nom: this.commercialForm.get('nom')?.value,
        email:  this.commercialForm.get('email')?.value,
        phone:  this.commercialForm.get('phone')?.value,
        adresse:  this.commercialForm.get('adresse')?.value
      }

      this.commerciauxService.addCommercial(data)
      .subscribe({
        next : () => {
          this.commerciauxService.getAllCommerciaux().subscribe({
            next : data => {
              this.commerciaux = data
              this.commercialForm.reset()
              this.addCommercialModal?.hide()
              this.hideHerrorMsg()
            }
          })
        },
        error : (error) => {
          const errorMsgElement = document.getElementById('error-msg');
          if (errorMsgElement) {
              errorMsgElement.classList.remove('d-none');
              errorMsgElement.innerHTML = error;
          }
        }
      })
      // setTimeout(() => {
      //   this.commercialForm.reset();
      // }, 1000);
    }
  }

  // Edit Customer
  editCustomer() {
    this.onEdition = true
    this.addCommercialModal?.show()
    this.commercialForm.patchValue(this.commercialDetail)
  }

  UpdataCommercialData (){
    if (this.commercialForm.valid) {
      this.loading = true
      const data : CommercialRequest = {
        nom: this.commercialForm.get('nom')?.value,
        email:  this.commercialForm.get('email')?.value,
        phone:  this.commercialForm.get('phone')?.value,
        adresse:  this.commercialForm.get('adresse')?.value
      }

      this.commerciauxService.updateCommercial(this.commercialDetail.id, data)
      .subscribe({
        next : () => {
          this.commerciauxService.getAllCommerciaux().subscribe({
            next : data => {
              this.commerciaux = data
              this.commercialForm.reset()
              this.commercialDetail = this.commerciaux.find( (value, index, array) => value.id == this.commercialDetail.id)
              this.addCommercialModal?.hide()
              this.hideHerrorMsg()
              this.loading = false
            }
          })
        },
        error : (error) => {
          const errorMsgElement = document.getElementById('error-msg');
          if (errorMsgElement) {
              errorMsgElement.classList.remove('d-none');
              errorMsgElement.innerHTML = error;
          }
        }
      })
      // setTimeout(() => {
      //   this.commercialForm.reset();
      // }, 1000);
    }
  }

  openAddCommercialModal(){
    this.onEdition = false
    this.commercialForm.reset()
    this.addCommercialModal?.show()
  }


  // Delete commercial
  openConfirmDeleteModal(id: any) {
    this.deleteId = id;
    this.deleteCommercialModal?.show()
  }

  deleteCommercial() {
    this.loading = true
    this.commerciauxService.deleteCommercial(this.deleteId).subscribe({
      next : () => {
        this.commerciauxService.getAllCommerciaux().subscribe({
          next : data => {
            this.commerciaux = data
            this.commercialDetail.id = this.commercialDetail.id == this.deleteId ? null : this.commercialDetail.id
            this.deleteCommercialModal?.hide()
            this.loading = false
          }
        })
      }
    })
  }

  //Restriction de commercial
  openConfirmRestrictionModal(id : any){
    this.restrictionId = id
    this.restrictionCommercialModal?.show()
  }

  banCommercial() {
    this.commerciauxService.restreindreCommercial(this.restrictionId).subscribe({
      next : () => {
        this.commerciauxService.getAllCommerciaux().subscribe({
          next : data => {
            this.commerciaux = data
            if(this.commercialDetail && this.commercialDetail.id == this.restrictionId){
              this.commercialDetail = this.commerciaux.find( (value, index, array) => value.id == this.commercialDetail.id)
            }
            this.restrictionCommercialModal?.hide()
            this.restrictionId = null
          }
        })
      }
    })
  }

  openConfirmActiveModal(id : any){
    this.restrictionId = id
    this.activeCommercialModal?.show()
  }

  ActiveCommercial() {
    this.commerciauxService.activeCommercial(this.restrictionId).subscribe({
      next : () => {
        this.commerciauxService.getAllCommerciaux().subscribe({
          next : data => {
            this.commerciaux = data
            if(this.commercialDetail && this.commercialDetail.id == this.restrictionId){
              this.commercialDetail = this.commerciaux.find( (value, index, array) => value.id == this.commercialDetail.id)
            }
            this.activeCommercialModal?.hide()
            this.restrictionId = null
          }
        })
      }
    })
  }

  // follow unfollow button
  followbtn(ev: any) {
    ev.target.closest('button').classList.toggle('active')
  }

  // filterdata
  filterdata() {
    if (this.term) {
      this.commerciaux = this.Customerlist.filter((el: any) => el.email.toLowerCase().includes(this.term.toLowerCase()) || el.name.toLowerCase().includes(this.term.toLowerCase()))
    } else {
      this.commerciaux = this.Customerlist.slice(0, 10);
    }
    // noResultElement
    this.updateNoResultDisplay();
  }
  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    this.endItem = event.page * event.itemsPerPage;
    this.commerciaux = this.Customerlist.slice(startItem, this.endItem);
  }

  // no result 
  updateNoResultDisplay() {
    const noResultElement = document.querySelector('.noresult') as HTMLElement;
    const paginationElement = document.getElementById('pagination-element') as HTMLElement
    if (this.commerciaux.length === 0 || this.term && this.commerciaux.length === 0) {
      noResultElement.style.display = 'block';
      paginationElement.classList.add('d-none')
    } else {
      noResultElement.style.display = 'none';
      paginationElement.classList.remove('d-none')
    }
  }

  selectstatus() {
    const status = (document.getElementById("idStatus") as HTMLInputElement).value
    if (status) {
      this.commerciaux = this.Customerlist.filter((data: any) => {
        return data.status == status
      })
    }
    else {
      this.commerciaux = this.Customerlist.slice(0, 10);
    }
  }

  // view customer detail
  viewCustomer(id: any) {
    this.commercialDetail = this.commerciaux[id]
  }
}

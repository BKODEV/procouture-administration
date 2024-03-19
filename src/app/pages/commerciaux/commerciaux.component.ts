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
      CKEditorModule, 
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
  endItem: any
  commerciaux!: Commercial[];
  commercialForm!: UntypedFormGroup;
  submitted: boolean = false;
  public Editor = ClassicEditor;
  term: any;
  Customerlist: any
  deleteId: any;

  @ViewChild('addCommercialModal', { static: false }) addCommercialModal?: ModalDirective;
  @ViewChild('deleteRecordModal', { static: false }) deleteRecordModal?: ModalDirective;
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

  // Edit Customer
  editCustomer(id: any) {
    this.addCommercialModal?.show()
    var modaltitle = document.querySelector('.modal-title') as HTMLAreaElement
    modaltitle.innerHTML = 'Edit Customer'
    var modalbtn = document.getElementById('add-btn') as HTMLAreaElement
    modalbtn.innerHTML = 'Update'
    // document.querySelectorAll('#customer-img').forEach((element: any) => {
    //   element.src = this.commerciaux[id].img;
    // });
    // this.commercialForm.controls['img'].setValue(this.commerciaux[id].img);
    this.commercialForm.patchValue(this.commerciaux[id]);
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
            next : data => this.commerciaux = data
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

  // File Upload
  // imageURL: string | undefined;
  // fileChange(event: any) {
  //   let fileList: any = event.target as HTMLInputElement;
  //   let file: File = fileList.files[0];
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.imageURL = reader.result as string;
  //     document.querySelectorAll('#customer-img').forEach((element: any) => {
  //       element.src = this.imageURL;
  //     });
  //     this.commercialForm.controls['img'].setValue(this.imageURL);
  //   };
  //   reader.readAsDataURL(file);
  // }

  // Delete Customer
  removeCustomer(id: any) {
    this.deleteId = id;
    this.deleteRecordModal?.show()
  }

  deleteCustomer() {
    this.store.dispatch(deletecustomerData({ id: this.deleteId }));
    this.deleteRecordModal?.hide()
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

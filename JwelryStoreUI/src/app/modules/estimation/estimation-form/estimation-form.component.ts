import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IDiscountResponseModel, IEstimationModel, ILoginResponseModel } from '@models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthRepoService } from '@repos';
import { EstimationService } from '@services';
import { PrintToScreeModalComponent } from '../print-to-scree-modal/print-to-scree-modal.component';

@Component({
  selector: 'app-estimation-form',
  templateUrl: './estimation-form.component.html',
  styleUrls: ['./estimation-form.component.scss']
})
export class EstimationFormComponent implements OnInit {

  estimationForm: FormGroup;
  formSubmited = false;
  currentUser: ILoginResponseModel;
  constructor(
    private formBuilder: FormBuilder,
    private authRepoService: AuthRepoService,
    private modalService: NgbModal,
    private estimationService: EstimationService
  ) { }

  ngOnInit() {
    this.initializeForm();
    this.subscribeFormValueChange();
    this.currentUser = this.authRepoService.getCurrentUser();
    if (!!this.currentUser && this.currentUser.role.toLowerCase() === 'privileged') {
      this.getDiscount();
    }
  }

  initializeForm() {
    this.estimationForm = this.formBuilder.group({
      goldPrice: [null, Validators.required],
      weight: [null, Validators.required],
      totalPrice: [{ value: null, disabled: true }],
      discount: [{ value: null, disabled: true }]
    });
  }

  get goldPrice() { return this.estimationForm.get('goldPrice') as FormControl; }
  get weight() { return this.estimationForm.get('weight') as FormControl; }
  get totalPrice() { return this.estimationForm.get('totalPrice') as FormControl; }
  get discount() { return this.estimationForm.get('discount') as FormControl; }

  subscribeFormValueChange() {
    this.goldPrice.valueChanges.subscribe(o => {
      this.totalPrice.setValue(null);
    });
    this.weight.valueChanges.subscribe(o => {
      this.totalPrice.setValue(null);
    });
  }

  getDiscount() {
    this.estimationService.getDiscount().subscribe((o: IDiscountResponseModel) => {
      if (o.status && o.discount > 0) {
        this.discount.setValue(o.discount);
      }
    }, err => {

    });
  }

  calculate() {
    this.formSubmited = true;
    if (this.estimationForm.invalid) {
      return false;
    }
    const price = this.goldPrice.value * 1;
    const weight = this.weight.value * 1;
    const discountPerc = (this.discount.value || 0) * 1;
    const totalPrice = (price * weight);
    const discountPrice = totalPrice - (discountPerc / 100 * totalPrice);
    this.totalPrice.setValue(discountPrice);
    return true;
  }

  printToScreen() {
    if (!this.calculate()) {
      return;
    }
    // open modal
    const modalRef = this.modalService.open(PrintToScreeModalComponent);
    modalRef.componentInstance.estimation = this.getFormValue();

  }

  getFormValue(): IEstimationModel {
    const formValue: IEstimationModel = {
      goldPrice: this.goldPrice.value * 1,
      weight: this.weight.value * 1,
      discount: (this.discount.value || 0) * 1,
      totalPrice: this.totalPrice.value * 1
    };
    return formValue;
  }

  printToFile() {
    if (!this.calculate()) {
      return;
    }
    this.estimationService.printToFile(this.getFormValue()).subscribe((res: any) => {
      if (res) {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(res);
        link.download = 'Estimation.pdf';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
      }
    }, (err: any) => {
    });
  }

  printToPaper() {
    if (!this.calculate()) {
      return;
    }
    throw new Error('Functionality not implemented.');
  }

  close() {
    this.estimationForm.reset();
    this.formSubmited = false;
    this.authRepoService.logOut();
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IEstimationModel } from 'src/app/models/estimation-model';

@Component({
  selector: 'app-print-to-scree-modal',
  templateUrl: './print-to-scree-modal.component.html',
  styleUrls: ['./print-to-scree-modal.component.scss']
})
export class PrintToScreeModalComponent implements OnInit {

  @Input() estimation: IEstimationModel;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  closeModal() {
    this.activeModal.close();
  }
}

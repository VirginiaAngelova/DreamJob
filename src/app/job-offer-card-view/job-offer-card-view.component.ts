import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { jobService } from '../job.service';
import { jobOffer } from '../jobs.interface';

@Component({
  selector: 'app-job-offer-card-view',
  templateUrl: './job-offer-card-view.component.html',
  styleUrls: ['./job-offer-card-view.component.scss']
})
export class JobOfferCardViewComponent implements OnInit {
  
  @Input() jobOffer: jobOffer[];

  @Output() jobSelected = new EventEmitter<jobOffer>();
  @Output() jobDeleted = new EventEmitter<number>();

  selectedJob: jobOffer
  
  constructor(){}

  ngOnInit(): void {
  }

  onJobSelected(jobOffer: jobOffer):void{
    this.selectedJob = jobOffer;
  }

  onJobEdit(jobOffer: jobOffer) : void {
  this.jobSelected.emit({
    ...jobOffer
  });

  }
  

}

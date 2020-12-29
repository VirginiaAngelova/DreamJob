import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { jobService } from '../job.service';
import { jobOffer } from '../jobs.interface';


@Component({
  selector: 'app-job-offer-card-item',
  templateUrl: './job-offer-card-item.component.html',
  styleUrls: ['./job-offer-card-item.component.scss']
})
export class JobOfferCardItemComponent implements OnInit {
  formGroup: FormGroup;

  public isThisCompany = false;
  public likes=0;
  user: User
  
  buttonDisabled: boolean = false;
  @Input() jobOffer: jobOffer;

  @Output()jobSelected = new EventEmitter<jobOffer>();
  @Output() jobDeleted = new EventEmitter<number>();

  constructor(private authService: AuthService,
              private jobService: jobService,
              private fb: FormBuilder
             ) { 
              this.jobOffer = {
                title: '',
                description: '',
                typeOffer: '',
                category: '',
                like:0
              }
             }

  ngOnInit(): void {
    this.loggedCompany();
  }
  giveALike(){
    this.jobSelected.emit(this.jobOffer);
    this.jobOffer.like++;
    this.buttonDisabled = true;
  }
  loggedCompany():void{
    const user = this.authService.getLoggedUser();
    if(user.category === 'company'){
      this.isThisCompany = true;
    }
}
}

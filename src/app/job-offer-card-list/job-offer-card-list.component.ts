import { Component, OnDestroy, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import { jobService } from '../job.service';
import { jobOffer } from '../jobs.interface';
import {takeUntil} from 'rxjs/operators';
import { User } from '../auth/user.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-job-offer-card-list',
  templateUrl: './job-offer-card-list.component.html',
  styleUrls: ['./job-offer-card-list.component.scss']
})
export class JobOfferCardListComponent implements OnInit, OnDestroy {

  
  jobOffer: jobOffer[];
  selectedJob: jobOffer;

public isThisCompany = false;

user: User
destroy$ = new Subject<boolean>();

constructor( private jobService: jobService,
            private authService: AuthService) { 
  this.selectedJob = {
    title: '',
    description: '',
    typeOffer: '',
    category: '',
    like:0
  };
}

  ngOnInit(): void {
   this.getJobs();
   this.loggedCompany();
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    }

  private getJobs():void{
    this.jobService.getJob().pipe(
      takeUntil(this.destroy$)
    ).subscribe((response: jobOffer[]) =>{
      this.jobOffer = response;
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  }
  onJobSelect(jobOffer: jobOffer): void {
    this.selectedJob= jobOffer;
  }
  onJobDelete(id : number) : void{
    this.jobService.deleteJob(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe( () =>{
      this.getJobs();
    },(error) => {
      console.log(error);
    });
  }

  loggedCompany():void{
    const user = this.authService.getLoggedUser();
    if(user.category === 'company'){
      this.isThisCompany = true;
    }
  }
}

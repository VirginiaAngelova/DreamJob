import { EventEmitter, Input, OnChanges, OnDestroy, Output, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { jobService } from 'src/app/job.service';
import { jobOffer } from '../../jobs.interface';

@Component({
  selector: 'app-job-reactive-form',
  templateUrl: './job-reactive-form.component.html',
  styleUrls: ['./job-reactive-form.component.scss']
})
export class JobReactiveFormComponent implements OnInit, OnDestroy {

  
  @Output() jobSubmitted = new EventEmitter<jobOffer>();


  formGroup: FormGroup;
  jobOffer: jobOffer;

  destroy$ = new Subject<boolean>();

  constructor(private fb: FormBuilder,
              private activatedRoute:ActivatedRoute,
              private jobService: jobService,
              private router: Router) {
                this.jobOffer = {
                  title: '',
                  description: '',
                  typeOffer: '',
                  category: '',
                  like:0
                }
               }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      id: this.jobOffer.id,
      title: this.jobOffer.title,
      description: this.jobOffer.description,
      typeOffer: this.jobOffer.typeOffer,
      category: this.jobOffer.category,
      });
      console.log(this.formGroup.value); 
    this.jobSubmitted.emit(this.formGroup.value);
    this.activatedRoute.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe((params)=>{
      const id = params.id;

      if(id){
        this.getJob(id)
      }
    })
    this.buildForm();
  }

  
  ngOnDestroy():void{
this.destroy$.next(true);
this.destroy$.unsubscribe();
  }
 

  onSubmit(): void {
    const jobOffer : jobOffer = {
      title: this.formGroup.get('title').value,
      description: this.formGroup.get('description').value,
      typeOffer:this.formGroup.get('typeOffer').value,
      category:this.formGroup.get('category').value,
      like:this.formGroup.get('like')?.value
    }
 
    console.log(this.formGroup.value); 
    this.jobSubmitted.emit(this.formGroup.value);
    if(!jobOffer.id){
      this.jobService.createJob({...jobOffer}).pipe(
        take(1)
      ).subscribe(()=>{
        this.router.navigate(['/jobs']);
      }, (error) => {
        console.log(error);
      });
      return;
  }
  this.jobService.updateJob(this.jobOffer).pipe(
    takeUntil(this.destroy$)
  ).subscribe( ()=>{
    this.router.navigate(['/jobs']);
  },(error) => {
    console.log(error);
  });
  }
  buildForm():void{
    this.formGroup = this.fb.group({
      id: this.jobOffer.id,
      title: [this.jobOffer.title],
      description: [this.jobOffer.description],
      typeOffer: [this.jobOffer.typeOffer],
      category:[this.jobOffer.category],
      like:[this.jobOffer.like]
    });
  }
  private getJob(id:number):void{
    this.jobService.getJobId(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe((response)=>{
      this.jobOffer = response;
      this.buildForm();
    });
  }
}

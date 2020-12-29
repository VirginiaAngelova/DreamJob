import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobOfferCardListComponent } from './job-offer-card-list.component';

describe('JobOfferCardListComponent', () => {
  let component: JobOfferCardListComponent;
  let fixture: ComponentFixture<JobOfferCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobOfferCardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobOfferCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

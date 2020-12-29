import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobOfferCardViewComponent } from './job-offer-card-view.component';

describe('JobOfferCardViewComponent', () => {
  let component: JobOfferCardViewComponent;
  let fixture: ComponentFixture<JobOfferCardViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobOfferCardViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobOfferCardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

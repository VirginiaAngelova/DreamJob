import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobOfferCardItemComponent } from './job-offer-card-item.component';

describe('JobOfferCardItemComponent', () => {
  let component: JobOfferCardItemComponent;
  let fixture: ComponentFixture<JobOfferCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobOfferCardItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobOfferCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

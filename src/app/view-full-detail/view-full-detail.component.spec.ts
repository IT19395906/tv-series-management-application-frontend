import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFullDetailComponent } from './view-full-detail.component';

describe('ViewFullDetailComponent', () => {
  let component: ViewFullDetailComponent;
  let fixture: ComponentFixture<ViewFullDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewFullDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewFullDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

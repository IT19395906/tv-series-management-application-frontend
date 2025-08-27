import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSingleItemComponent } from './view-single-item.component';

describe('ViewSingleItemComponent', () => {
  let component: ViewSingleItemComponent;
  let fixture: ComponentFixture<ViewSingleItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewSingleItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSingleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

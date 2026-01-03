import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpcomingItemComponent } from './add-upcoming-item.component';

describe('AddUpcomingItemComponent', () => {
  let component: AddUpcomingItemComponent;
  let fixture: ComponentFixture<AddUpcomingItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUpcomingItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpcomingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

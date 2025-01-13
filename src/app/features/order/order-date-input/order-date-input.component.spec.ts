import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDateInputComponent } from './order-date-input.component';

describe('OrderDateInputComponent', () => {
  let component: OrderDateInputComponent;
  let fixture: ComponentFixture<OrderDateInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderDateInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDateInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

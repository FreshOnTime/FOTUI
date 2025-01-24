import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MybagPageComponent } from './mybag-page.component';

describe('MybagPageComponent', () => {
  let component: MybagPageComponent;
  let fixture: ComponentFixture<MybagPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MybagPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MybagPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

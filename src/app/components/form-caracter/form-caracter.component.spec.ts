import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCaracterComponent } from './form-caracter.component';

describe('FormCaracterComponent', () => {
  let component: FormCaracterComponent;
  let fixture: ComponentFixture<FormCaracterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCaracterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCaracterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

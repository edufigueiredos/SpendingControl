import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquareContainerComponent } from './square-container.component';

describe('SquareContainerComponent', () => {
  let component: SquareContainerComponent;
  let fixture: ComponentFixture<SquareContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SquareContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SquareContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

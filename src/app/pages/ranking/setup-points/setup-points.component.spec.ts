import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupPointsComponent } from './setup-points.component';

describe('SetupPointsComponent', () => {
  let component: SetupPointsComponent;
  let fixture: ComponentFixture<SetupPointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupPointsComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

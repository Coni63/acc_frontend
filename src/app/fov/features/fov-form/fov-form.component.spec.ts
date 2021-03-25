import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FovFormComponent } from './fov-form.component';

describe('FovFormComponent', () => {
  let component: FovFormComponent;
  let fixture: ComponentFixture<FovFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FovFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FovFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

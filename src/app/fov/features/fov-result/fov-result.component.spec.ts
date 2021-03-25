import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FovResultComponent } from './fov-result.component';

describe('FovResultComponent', () => {
  let component: FovResultComponent;
  let fixture: ComponentFixture<FovResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FovResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FovResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

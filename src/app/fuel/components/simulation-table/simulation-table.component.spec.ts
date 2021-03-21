import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulationTableComponent } from './simulation-table.component';

describe('SimulationTableComponent', () => {
  let component: SimulationTableComponent;
  let fixture: ComponentFixture<SimulationTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulationTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

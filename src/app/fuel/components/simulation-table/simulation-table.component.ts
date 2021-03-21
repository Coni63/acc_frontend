import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SharedInfoService } from '../../services/shared-info.service';
import { Result } from '../../interfaces/interface';


@Component({
  selector: 'app-simulation-table',
  templateUrl: './simulation-table.component.html',
  styleUrls: ['./simulation-table.component.scss']
})
export class SimulationTableComponent implements OnInit {

  displayedColumns: string[] = ['lap', 'time_elapsed', 'time_remaining', 'fuel_remaining'];
  dataSource = new MatTableDataSource<Result>();
  visible: boolean = false;

  constructor(private data: SharedInfoService) { }

  ngOnInit(): void { 
    this.data.getFormState().subscribe(valid => {
      if (valid){
        this.visible = true;
        this.dataSource.data = this.data.simulation;
      } else {
        this.visible = false;
        this.dataSource.data = [];
      }
    });
  }

}

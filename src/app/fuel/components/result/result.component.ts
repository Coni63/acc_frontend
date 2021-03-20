import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  @Input() total_laps: number;
  @Input() total_fuel: number;

  constructor() { }

  ngOnInit(): void {
  }

}

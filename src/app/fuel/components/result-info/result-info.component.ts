import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { formatNumber } from '@angular/common';

@Component({
  selector: 'app-result-info',
  templateUrl: './result-info.component.html',
  styleUrls: ['./result-info.component.scss']
})
export class ResultInfoComponent implements OnInit {

  @Input() title: string;
  @Input() value: number;
  @Input() unit: string;
  @Input() formating: string = '1.0-2';

  value_str: string;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.value_str = formatNumber(this.value, "en-US", this.formating);
  }

}

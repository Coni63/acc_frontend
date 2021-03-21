import { Component, OnInit } from '@angular/core';
import { SharedInfoService } from '../../services/shared-info.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  constructor(public data: SharedInfoService) { }

  ngOnInit() {}

}

import { Component, OnInit } from '@angular/core';
import { BgColorService } from 'src/app/services/bg-color.service';
import 'bootstrap/dist/css/bootstrap.min.css';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _bgColorService:BgColorService) { }

  ngOnInit(): void {
    this._bgColorService.updateBodyClass('qz-bg-white')
  }

}

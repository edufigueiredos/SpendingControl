import { Component, OnInit, ViewChild } from '@angular/core';

import { CategoryFormComponent } from '../category-form/category-form.component';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

    constructor() { }

  ngOnInit(): void {
  }

  newCategory() {
  }

}

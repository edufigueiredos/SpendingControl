import { Component, OnInit, ViewChild } from '@angular/core';

import { CategoryFormComponent } from '../category-form/category-form.component';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  @ViewChild('categoryForm', { static: true }) categoryForm: CategoryFormComponent;

    constructor() { }

  ngOnInit(): void {
  }

  newCategory() {
    this.categoryForm.open();
  }

}

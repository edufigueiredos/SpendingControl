import { Component, Input, OnInit } from '@angular/core';
import { ButtonSquareContainerModel } from '../../models/square-container.model';

@Component({
  selector: 'app-square-container',
  templateUrl: './square-container.component.html',
  styleUrls: ['./square-container.component.scss']
})
export class SquareContainerComponent implements OnInit {
  @Input() title: string;
  @Input() leftIcon: ButtonSquareContainerModel;
  @Input() rightIcon: ButtonSquareContainerModel;

  constructor() { }

  ngOnInit(): void {
  }

}

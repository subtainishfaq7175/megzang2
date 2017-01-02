import {Component, OnInit, Input} from '@angular/core';
import {Option} from "../../model/option";

@Component({
  selector: 'custom-option',
  templateUrl: './option.component.html'})
export class OptionComponent implements OnInit {
  @Input() optionsArray:Array<Option>;

  removeOptionAt(index:number)
  {

    this.optionsArray.splice(index, 1);

  }

  constructor() { }

  ngOnInit() {
  }

}

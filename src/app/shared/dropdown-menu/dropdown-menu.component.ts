import { Component, OnInit } from '@angular/core';

/**
 * @example
 * <app-dropdown-menu>
 *    <div class="dropdown-button">Button</div>
 *    <div class="dropdown-items">
 *      <div>First</div>
 *    </div>
 *    <div class="dropdown-notification">something to display above the button</div>
 *  </div>
 * </app-dropdown-menu>
 * @note
 * The classes in this example are required because their
 * elements replace `<ng-content></ng-content>`
 */
@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent implements OnInit {

  display = 'none';
  constructor() { }

  ngOnInit(): void {
  }

  toggleDisplay(): void {
    this.display = this.display === 'none' ? 'block' : 'none';
  }

}

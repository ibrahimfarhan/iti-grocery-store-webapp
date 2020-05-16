import { Component, OnInit } from '@angular/core';

/**
 * @example
 * <app-dropdown-menu>
 *    <div class="dropdown-button">Button</div>
 *    <div class="dropdown-items">
 *    <div class="dropdown-item">First</div>
 *  </div>
 * </app-dropdown-menu>
 * @note
 * The classes ("dropdown-button", "dropdown-items") in this example are required because their
 * elements replace `<ng-content></ng-content>`
 */
@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent implements OnInit {

  isOpen = false;
  constructor() { }

  ngOnInit(): void {
  }

}

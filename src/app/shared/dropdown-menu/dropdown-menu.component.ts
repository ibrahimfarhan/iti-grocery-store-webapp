import { Component, OnInit, HostListener } from '@angular/core';

/**
 * @example
 * <app-dropdown-menu>
 *    <div class="dropdown-button">Button</div>
 *    <div class="dropdown-items">
 *      <div>First</div>
 *    </div>
 *  </div>
 * </app-dropdown-menu>
 * @note
 * The classes in this example are required because their
 * elements replace `<ng-content></ng-content>`
 */
@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
})
export class DropdownMenuComponent implements OnInit {

  display = 'none';
  hasBeenClicked = false;
  constructor() { }

  ngOnInit(): void {
  }

  toggleDisplay(event: MouseEvent): void {
    this.hasBeenClicked = true;
    this.display = this.display === 'none' ? 'block' : 'none';
  }

  @HostListener('window:click') hide(): void {
      if (!this.hasBeenClicked) {
        this.display = 'none';
      }

      this.hasBeenClicked = false;
  }
}

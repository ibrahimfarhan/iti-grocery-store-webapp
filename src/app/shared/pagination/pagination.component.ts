import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

/**
 * @input nrOfItems: the total number of items.
 * @input itemsPerPage: the number of items to be displayed in one page.
 * @output changePage: an event that fires when a page is selected and carries the selected page number.
 * @example
 * <app-pagination
 *   [nrOfItems]="10"
 *   [itemsPerPage]="5"
 *   (changePage)="changePageEventHandler(selectedPageNumber)">
 * </app-pagination>
 */
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  currentPageNumber = 1;
  @Input() nrOfItems: number;
  @Input() itemsPerPage: number;
  @Output() changePage = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  getPageNumbers(): number[] {
    this.itemsPerPage = this.itemsPerPage <= 0 ? 10 : this.itemsPerPage;
    const nrOfPages = Math.ceil(this.nrOfItems / this.itemsPerPage);
    return Array(nrOfPages).fill(0).map((v, i) => i + 1);
  }

  onPageNumberClick(pageNumber: number): void {
    this.currentPageNumber = pageNumber;
    this.changePage.emit(pageNumber);
  }

}

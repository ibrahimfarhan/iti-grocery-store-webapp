import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

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
    const nrOfPages = Math.ceil(this.nrOfItems / this.itemsPerPage);
    return Array(nrOfPages).fill(0).map((v, i) => i + 1);
  }

  onPageNumberClick(pageNumber: number): void {
    this.currentPageNumber = pageNumber;
    this.changePage.emit(pageNumber);
  }

}

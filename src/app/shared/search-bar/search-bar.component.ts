import { Component, OnInit, Input, Output, EventEmitter, HostListener, ViewChild, ElementRef } from '@angular/core';
import { ProductSearch } from 'src/app/models/productSearch';

/**
 * @input categoryNames: the names to be put in the HTML select element options.
 * @output searchSubmit: an event that fires with the following object:
 * ```{
 *  searchTerm: "",
 *  selectedCategoryName: ""
 * }```
 * The default value for selectedCategoryName is ```"all"```
 */
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @ViewChild('miniFormBtn') miniFormBtn: ElementRef;
  @ViewChild('searchForm') searchForm: ElementRef;
  @Input() categoryNames: string[];
  @Output() searchSubmit: EventEmitter<ProductSearch> = new EventEmitter<ProductSearch>();
  searchTerm: string;
  selectedCategoryName = 'all';
  hasBeenClicked = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleSearchForm(e: MouseEvent) {
    this.searchForm.nativeElement.style.display =
      this.searchForm.nativeElement.style.display === 'block' ? null : 'block';
    this.hasBeenClicked = true;
  }

  onSubmit(): void {
    const searchTerm = this.searchTerm;
    const selectedCategoryName = this.selectedCategoryName;
    this.searchSubmit.emit({
      searchTerm,
      selectedCategoryName
    });
  }

  @HostListener('window:click', ['event']) hideSearchForm() {

    const miniFormBtnDisplay = window.getComputedStyle(this.miniFormBtn.nativeElement).display;

    if (miniFormBtnDisplay === 'block' && !this.hasBeenClicked) {
      this.searchForm.nativeElement.style.display = null;
    }

    this.hasBeenClicked = false;
  }
}

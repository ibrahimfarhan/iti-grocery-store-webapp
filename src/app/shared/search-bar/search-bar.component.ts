import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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

  @Input() categoryNames: string[];
  @Output() searchSubmit: EventEmitter<object>;
  searchTerm: string;
  selectedCategoryName = 'all';

  constructor() { }

  ngOnInit(): void {
  }

  toggleSearchForm(target: any) {
    target.style.display = target.style.display === 'block' ? null : 'block';
  }

  onSubmit(): void {
    const searchTerm = this.searchTerm;
    const selectedCategoryName = this.selectedCategoryName;
    this.searchSubmit.emit({
      searchTerm,
      selectedCategoryName
    });
  }
}

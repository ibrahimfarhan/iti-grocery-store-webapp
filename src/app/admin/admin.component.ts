import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  productMenuStatus: boolean = false;
  categoryMenuStatus: boolean = false;
  sideBarExpanded = false;
  constructor() { }

  ngOnInit(): void {
  }

  toggleSubMenu(subMenu: HTMLElement) {
    if(subMenu.classList.contains('collapsed')) {
      subMenu.style.maxHeight = subMenu.scrollHeight + 'px';
      subMenu.classList.remove("collapsed");
    }
    else{
      subMenu.style.maxHeight = '0px';
      subMenu.classList.add("collapsed");
    }
  }

  toggleSideBar(): void {
    const sideBar = (document.getElementsByClassName('side-bar')[0] as HTMLElement);
    if (!this.sideBarExpanded) {
      sideBar.style.transform = 'translateX(0)';
    } else {
      sideBar.style.transform = 'translateX(-75%)';
    }
    this.sideBarExpanded = !this.sideBarExpanded;
  }
}

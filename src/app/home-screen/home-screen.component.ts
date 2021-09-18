import { AfterContentInit, AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { House } from '../house';
import { HouseDataService } from '../house-data.service';
import { HouseDetailsComponent } from '../house-details/house-details.component';
import { Member } from '../members';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {


  ageValue: boolean = false;
  memberdetails: any;
  houses: House[] = [];
  houseDetails: House[] = [];


  constructor(private service: HouseDataService) { }

  ngOnInit(): void {
    this.service.getHouses().subscribe(
      data => {
        this.houses = data;
      }
    )



  }
  riskCondition(id: number) {
    for (let h = 0; h < this.houses.length; h++) {
      if (this.houses[h].id == id) {
        for (let m = 0; m < this.houses[h].members.length; m++) {
          if (this.houses[h].members[m].age > 60) {
            this.ageValue = true;
            break;
          }
        }
      }

    }
    return this.ageValue;
  }





}

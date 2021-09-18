import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HouseDataService } from '../house-data.service';


@Component({
  selector: 'app-house-details',
  templateUrl: './house-details.component.html',
  styleUrls: ['./house-details.component.css']
})
export class HouseDetailsComponent implements OnInit {

  id: any;
  houseDetails: any;
  memberDetails: any;
  ageValue: boolean = false;
  errorMessage!: string;

  constructor(private route: ActivatedRoute, private service: HouseDataService, private router: Router) { }

  ngOnInit() {
    const idFromUrl = this.route.snapshot.paramMap.get('id');
    this.id = idFromUrl;



    this.service.getHouse(this.id).subscribe(
      data => {
        this.houseDetails = data;
        this.memberDetails = this.houseDetails.members;
        for (let m of this.memberDetails) {
          if (m.age > 60) {
            this.ageValue = true;
          }
          else {
            this.ageValue = false;
          }
        }
      }
    )


  }

  deleteHouse(id: number): void {
    this.service.deleteHouse(this.id).subscribe(
      {
        next: () => this.onSaveComplete(),
        error: err => this.errorMessage = err
      }
    )
  }

  back(): void {
    this.router.navigate(['home-screen']);
  }

  onSaveComplete(): void {
    this.router.navigate(['/home-screen']);
  }

}

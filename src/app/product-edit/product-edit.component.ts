import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { House } from '../house';
import { HouseDataService } from '../house-data.service';
import { Member } from '../members';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  updatedHouse: any;
  urlid: any;
  houseEntry!: FormGroup;
  errorMessage!: string;
  house!: House;
  member!: Member


  get members(): FormArray {
    return <FormArray>this.houseEntry.get('members');
  }


  constructor(private route: ActivatedRoute,
    private fb: FormBuilder,
    private service: HouseDataService,
    private router: Router) { }

  ngOnInit(): void {
    const idFromUrl = this.route.snapshot.paramMap.get('id');
    this.urlid = idFromUrl;
    this.getHouse(this.urlid);

    this.houseEntry = this.fb.group({
      id: [''],
      houseNo: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      members: this.fb.array([this.addMembers()])

    });


  }

  getHouse(id: number): void {
    this.service.getHouseForEdit(id).subscribe(
      {
        next: (house: House) => this.displayHouse(house),
        error: err => this.errorMessage = err
      }
    );
  }

  displayHouse(house: House): void {
    if (this.houseEntry) {
      this.houseEntry.reset();
    }
    this.house = house;


    this.houseEntry.patchValue({
      id: house.id,
      houseNo: house.houseNo,
      address: house.address,
    });
    this.houseEntry.setControl('members', this.setMemberDetails(house.members));
  }

  setMemberDetails(memberSet: Member[]): FormArray {
    const formArray = new FormArray([]);
    memberSet.forEach(s => {
      formArray.push(
        this.fb.group({
          memberName: s.memberName,
          age: s.age,
          gender: s.gender
        })
      );
    });
    return formArray;
  }


  addMembers(): FormGroup {
    return this.fb.group({
      memberName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
      gender: ['', Validators.required],
      age: ['', Validators.required]
    })
  }

  addMember(): void {
    this.members.push(this.addMembers());
  }

  removeMember(index: number): void {
    this.members.removeAt(index);
  }

  save(): void {
    if (this.houseEntry.valid) {
      if (this.houseEntry.valid) {

        const p = { ...this.house, ...this.houseEntry.value }
        console.log("value of p is", p);

        this.service.updateHouseDetails(p).subscribe({
          next: () => this.onSaveComplete(),
          error: err => this.errorMessage = err
        });
      }
      else {
        this.onSaveComplete();
      }
    }
    else {
      this.errorMessage = " Please check the errors"
    }
  }

  onSaveComplete(): void {
    this.houseEntry.reset();
    this.router.navigate(['/home-screen'])
  }
}

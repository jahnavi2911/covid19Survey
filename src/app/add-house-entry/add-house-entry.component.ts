import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { House } from '../house';
import { HouseDataService } from '../house-data.service';

@Component({
  selector: 'app-add-house-entry',
  templateUrl: './add-house-entry.component.html',
  styleUrls: ['./add-house-entry.component.css']
})
export class AddHouseEntryComponent implements OnInit {

  houseEntry!: FormGroup;
  house!: House;
  errorMessage!: string;

  get members(): FormArray {
    return <FormArray>this.houseEntry.get('members');
  }



  constructor(private fb: FormBuilder, private service: HouseDataService, private router: Router) { }

  ngOnInit() {
    this.houseEntry = this.fb.group({
      houseNo: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      members: this.fb.array([this.addMembers()])

    });

  }
  save() {
    if (this.houseEntry.valid) {
      if (this.houseEntry.valid) {
        const p = { ...this.house, ...this.houseEntry.value }
        this.service.createNewHouse(p).subscribe(
          {
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          }
        )
      }
      else {
        this.onSaveComplete()
      }

    }
    else {
      this.errorMessage = "Please checck for errors";
    }
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

  onSaveComplete(): void {
    this.houseEntry.reset();
    this.router.navigate(['/home-screen']);
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHouseEntryComponent } from './add-house-entry.component';

describe('AddHouseEntryComponent', () => {
  let component: AddHouseEntryComponent;
  let fixture: ComponentFixture<AddHouseEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHouseEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHouseEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

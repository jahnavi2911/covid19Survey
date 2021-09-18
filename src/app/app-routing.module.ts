import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddHouseEntryComponent } from './add-house-entry/add-house-entry.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { HouseDetailsComponent } from './house-details/house-details.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

const routes: Routes = [

  { path: 'home-screen', component: HomeScreenComponent },

  { path: '', redirectTo: '/home-screen', pathMatch: 'full' },

  { path: 'house', component: AddHouseEntryComponent },

  { path: 'house-detail/:id', component: HouseDetailsComponent },

  { path: 'product-edit/:id', component: ProductEditComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

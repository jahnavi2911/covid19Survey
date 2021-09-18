import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { House } from './house';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class HouseDataService {

  apiUrl = "api/house"
  idFromUrl: any;

  constructor(private http: HttpClient, private router: ActivatedRoute) { }


  getHouses(): Observable<House[]> {
    return this.http.get<House[]>(this.apiUrl).pipe
      (tap(data => console.log(data)), catchError(this.handleError));
  }

  getHouse(id: number): Observable<House[]> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<House[]>(url).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  getHouseForEdit(id: number): Observable<House> {
    if (id === 0) {
      return of(this.initializeHouse());
    }
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<House>(url)
      .pipe(
        tap(data => console.log(data)),
        catchError(this.handleError)
      );

  }


  updateHouseDetails(house: House): Observable<House> {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const url = `${this.apiUrl}/${house.id}`;
    return this.http.put<House>(url, house, { headers }).pipe(
      tap(() => console.log("updated product" + house.id)),
      map(() => house),
      catchError(this.handleError)
    );
  }

  createNewHouse(house: House): Observable<House> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<House>(this.apiUrl, house, { headers }).pipe(
      tap(data =>
        console.log(data)),
      catchError(this.handleError)
    );
  }

  deleteHouse(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<House>(url, { headers: headers });
  }
  private handleError(error: any) {
    console.log(error);
    return throwError(error);

  }

  private initializeHouse(): House {
    return {
      id: 0,
      houseNo: 0,
      address: '',
      members: [
        {
          memberName: '',
          age: 0,
          gender: 'female',
        }
      ]

    }
  }

}

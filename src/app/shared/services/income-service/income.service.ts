import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IncomeModel } from '../../models/income.model';
import { utilFindIndex } from '../../util/spending-control-util';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  private readonly incomeEndpoint: string = `${environment.apiEndpoint}/income`;
  private incomeSubject$: BehaviorSubject<IncomeModel[]> = new BehaviorSubject<IncomeModel[]>(null);
  private loaded = false;

  constructor(private http: HttpClient) { }

  getIncome(): Observable<IncomeModel[]> {
    if (!this.loaded) {
      this.http.get<IncomeModel[]>(this.incomeEndpoint)
        .subscribe((incomes: IncomeModel[]) => {
          if (incomes) {
            this.incomeSubject$.next(incomes);
          } else {
            this.incomeSubject$.next([]);
          }
      });
      this.loaded = true;
    }

    return this.incomeSubject$.asObservable();
  }

  createIncome(income: IncomeModel): Observable<IncomeModel> {
    return this.http.post<IncomeModel>(this.incomeEndpoint, income)
      .pipe(tap((auxIncome: IncomeModel) => this.incomeSubject$.getValue().push(auxIncome)));
  }

  updateIncome(id: number, income: IncomeModel): Observable<IncomeModel> {
    return this.http.put<IncomeModel>(`${this.incomeEndpoint}/${id}`, income)
      .pipe(tap((newIncome: IncomeModel) => {
        const incomes = this.incomeSubject$.getValue();
        const index = utilFindIndex(incomes, newIncome);
        if (index >= 0) {
          incomes[index] = newIncome;
        }
      }));
  }

  deleteIncome(income: IncomeModel): Observable<any> {
    return this.http.delete(`${this.incomeEndpoint}/${income.id}`).pipe(
      tap(() => {
        const incomes = this.incomeSubject$.getValue();
        const index = utilFindIndex(incomes, income);
        if (index >= 0) {
          incomes.splice(index, 1);
        }
      }));
  }
}

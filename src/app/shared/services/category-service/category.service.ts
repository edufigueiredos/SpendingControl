import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { CategoryModel } from '../../models/category.model';
import { utilFindIndex } from '../../util/spending-control-util';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly categoryEndpoint: string = `${environment.apiEndpoint}/category`;
  private categorySubject$: BehaviorSubject<CategoryModel[]> = new BehaviorSubject<CategoryModel[]>(null);
  private loaded = false;

  constructor(private http: HttpClient) { }

  getCategories(): Observable<CategoryModel[]> {
    if (!this.loaded) {
      this.http.get<CategoryModel[]>(this.categoryEndpoint)
        .subscribe((categories: CategoryModel[]) => {
          if (categories) {
            this.categorySubject$.next(categories);
          } else {
            this.categorySubject$.next([]);
          };
        });
      this.loaded = true;
    }

    return this.categorySubject$.asObservable();
  }

  createCategory(category: CategoryModel): Observable<CategoryModel> {
    return this.http.post<CategoryModel>(this.categoryEndpoint, category)
      .pipe(tap((auxCategory: CategoryModel) => this.categorySubject$.getValue().push(auxCategory)));
  }

  updateCategory(id: number, category: CategoryModel): Observable<CategoryModel> {
    return this.http.put<CategoryModel>(`${this.categoryEndpoint}/${id}`, category)
      .pipe(tap((newCategory: CategoryModel) => {
        const categories = this.categorySubject$.getValue();
        const index = utilFindIndex(categories, newCategory);
        if (index >= 0) {
          categories[index] = newCategory;
        }
      }));
  }

  deleteCategory(category: CategoryModel): Observable<any> {
    return this.http.delete(`${this.categoryEndpoint}/${category.id}`).pipe(
      tap(() => {
        const categories = this.categorySubject$.getValue();
        const index = utilFindIndex(categories, category);
        if (index >= 0) {
          categories.splice(index, 1);
        }
      }));
  }
}

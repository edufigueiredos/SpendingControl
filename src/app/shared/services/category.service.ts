import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { CategoryModel } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoryEndpoint = `${environment.apiEndpoint}/category`;
  private categorySubject$ = new BehaviorSubject<CategoryModel[]>(null);
  private loaded = false;

  constructor(private http: HttpClient) { }

  getCategory(): Observable<CategoryModel[]> {
    if (!this.loaded) {
      this.http.get(this.categoryEndpoint).subscribe(this.categorySubject$);
      this.loaded = true
    }

    return this.categorySubject$.asObservable();
  }

  createCategory(category: CategoryModel): Observable<CategoryModel> {
    return this.http.post<CategoryModel>(this.categoryEndpoint, category)
      .pipe(tap((auxCategory: CategoryModel) => this.categorySubject$.getValue().push(auxCategory)));
  }

  updateCategory(id: number, category: CategoryModel): Observable<CategoryModel> {
    return this.http.put<CategoryModel>(`${this.categoryEndpoint}/${id}`, { category })
      .pipe(tap((newCategory: CategoryModel) => {
        const categories = this.categorySubject$.getValue();
        const index = this.findIndex(categories, newCategory);
        if (index >= 0) {
          categories[index] = newCategory;
        }
      }))
  }

  deleteCategory(category: CategoryModel): Observable<any> {
    return this.http.delete(`${this.categoryEndpoint}/${category.id}`)
      
  }

  private findIndex(categories: CategoryModel[], findCategory: CategoryModel): number {
    return categories.findIndex((auxCategory: CategoryModel) => auxCategory.id === findCategory.id);
  }
}

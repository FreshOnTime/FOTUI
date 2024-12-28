import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private baseUrl = 'http://localhost:3000/api/search'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  getSuggestions(query: string): Observable<string[]> {
    if (!query) {
      return new Observable((observer) => observer.next([])); // Return empty array if query is empty
    }
    return this.http.get<string[]>(`${this.baseUrl}?q=${query}`);
  }
}

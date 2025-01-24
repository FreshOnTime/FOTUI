import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { SearchService } from './search.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './search-page.component.html',
  styleUrls: [],
  providers: [SearchService] // Add SearchService to providers
})
export class SearchPageComponent implements OnInit {
  searchControl = new FormControl();
  suggestions: string[] = [];
  showSuggestions: boolean = false; // Add showSuggestions property

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300), // Wait 300ms after each keystroke
        distinctUntilChanged(), // Avoid duplicate calls for the same input
        switchMap((query) => this.searchService.getSuggestions(query)) // Call service to get suggestions
      )
      .subscribe((results) => (this.suggestions = results));
  }

  hideSuggestions(): void { // Add hideSuggestions method
    setTimeout(() => {
      this.showSuggestions = false;
    }, 200); // Delay to allow click event on suggestions
  }
}

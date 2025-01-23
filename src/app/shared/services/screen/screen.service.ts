import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ScreenService {
  // Screen size breakpoints (in pixels)
  private readonly SCREEN_SIZES = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400,
  };

  private screenWidth$ = new BehaviorSubject<number>(window.innerWidth);
  private screenHeight$ = new BehaviorSubject<number>(window.innerHeight);
  private orientation$ = new BehaviorSubject<'portrait' | 'landscape'>(
    this.getOrientation()
  );
  private currentBreakpoint$ = new BehaviorSubject<string>(
    this.getCurrentBreakpoint()
  );
  private isMobile$ = new BehaviorSubject<boolean>(this.checkIfMobile());

  constructor(private ngZone: NgZone) {
    // Run outside Angular zone for better performance
    this.ngZone.runOutsideAngular(() => {
      fromEvent(window, 'resize')
        .pipe(debounceTime(30), distinctUntilChanged())
        .subscribe(() => {
          this.updateScreenInfo();
        });

      // Listen for orientation changes
      fromEvent(window, 'orientationchange').subscribe(() => {
        this.updateScreenInfo();
      });
    });
  }

  private updateScreenInfo(): void {
    this.ngZone.run(() => {
      this.screenWidth$.next(window.innerWidth);
      this.screenHeight$.next(window.innerHeight);
      this.orientation$.next(this.getOrientation());
      this.currentBreakpoint$.next(this.getCurrentBreakpoint());
      this.isMobile$.next(this.checkIfMobile());
    });
  }

  public getCurrentBreakpoint(): string {
    const width = window.innerWidth;
    if (width < this.SCREEN_SIZES.sm) return 'xs';
    if (width < this.SCREEN_SIZES.md) return 'sm';
    if (width < this.SCREEN_SIZES.lg) return 'md';
    if (width < this.SCREEN_SIZES.xl) return 'lg';
    if (width < this.SCREEN_SIZES.xxl) return 'xl';
    return 'xxl';
  }

  private getOrientation(): 'portrait' | 'landscape' {
    return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
  }

  private checkIfMobile(): boolean {
    // Check for mobile user agent
    const userAgent = navigator.userAgent.toLowerCase();
    const mobileKeywords = [
      'mobile',
      'android',
      'iphone',
      'ipod',
      'ipad',
      'windows phone',
    ];
    const isMobileDevice = mobileKeywords.some((keyword) =>
      userAgent.includes(keyword)
    );

    // Also consider screen width
    const isMobileWidth = window.innerWidth < this.SCREEN_SIZES.md;

    return isMobileDevice || isMobileWidth;
  }

  // Public observables
  getScreenWidth(): Observable<number> {
    return this.screenWidth$.asObservable();
  }

  getScreenHeight(): Observable<number> {
    return this.screenHeight$.asObservable();
  }

  getOrientation$(): Observable<'portrait' | 'landscape'> {
    return this.orientation$.asObservable();
  }

  getCurrentBreakpoint$(): Observable<string> {
    return this.currentBreakpoint$.asObservable();
  }

  isMobile(): Observable<boolean> {
    return this.isMobile$.asObservable();
  }

  // Synchronous getters for current values
  getCurrentScreenWidth(): number {
    return this.screenWidth$.value;
  }

  getCurrentScreenHeight(): number {
    return this.screenHeight$.value;
  }

  getCurrentOrientation(): 'portrait' | 'landscape' {
    return this.orientation$.value;
  }

  getBreakpoint(): string {
    return this.currentBreakpoint$.value;
  }

  // Utility methods
  isBreakpoint(breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'): boolean {
    return this.currentBreakpoint$.value === breakpoint;
  }

  isMinWidth(width: number): boolean {
    return window.innerWidth >= width;
  }

  isMaxWidth(width: number): boolean {
    return window.innerWidth <= width;
  }

  isTouchDevice(): boolean {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }
}

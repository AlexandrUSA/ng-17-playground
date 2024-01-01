import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutNotFoundComponent } from './layout-not-found.component';

describe('LayoutNotFoundComponent', () => {
  let component: LayoutNotFoundComponent;
  let fixture: ComponentFixture<LayoutNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutNotFoundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LayoutNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

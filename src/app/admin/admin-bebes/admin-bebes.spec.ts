import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBebes } from './admin-bebes';

describe('AdminBebes', () => {
  let component: AdminBebes;
  let fixture: ComponentFixture<AdminBebes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBebes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBebes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminActivites } from './admin-activites';

describe('AdminActivites', () => {
  let component: AdminActivites;
  let fixture: ComponentFixture<AdminActivites>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminActivites]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminActivites);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

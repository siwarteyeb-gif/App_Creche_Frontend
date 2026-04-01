import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterBebe } from './ajouter-bebe';

describe('AjouterBebe', () => {
  let component: AjouterBebe;
  let fixture: ComponentFixture<AjouterBebe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterBebe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterBebe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

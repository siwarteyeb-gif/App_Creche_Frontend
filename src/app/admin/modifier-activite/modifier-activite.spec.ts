import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierActivite } from './modifier-activite';

describe('ModifierActivite', () => {
  let component: ModifierActivite;
  let fixture: ComponentFixture<ModifierActivite>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierActivite]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierActivite);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

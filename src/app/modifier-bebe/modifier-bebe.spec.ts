import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierBebe } from './modifier-bebe';

describe('ModifierBebe', () => {
  let component: ModifierBebe;
  let fixture: ComponentFixture<ModifierBebe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierBebe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierBebe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

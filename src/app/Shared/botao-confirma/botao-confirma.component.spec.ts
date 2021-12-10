import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoConfirmaComponent } from './botao-confirma.component';

describe('BotaoConfirmaComponent', () => {
  let component: BotaoConfirmaComponent;
  let fixture: ComponentFixture<BotaoConfirmaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BotaoConfirmaComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotaoConfirmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MegzComponent } from './megz.component';

describe('MegzComponent', () => {
  let component: MegzComponent;
  let fixture: ComponentFixture<MegzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MegzComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MegzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

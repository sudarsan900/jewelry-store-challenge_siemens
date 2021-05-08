/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppNumericDirective } from './app-numeric.directive';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'app-my-test-component',
  template: '<input type="text" min="0" appNumeric max="23">'
})
class TestComponent { }

describe('Directive: AppNumeric', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let inputEl: DebugElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        AppNumericDirective
      ]
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    inputEl = fixture.debugElement.query(By.directive(AppNumericDirective));
  });


  it('should create an instance', () => {
    const directive = new AppNumericDirective(inputEl);
    directive.onKeyDown(new KeyboardEvent('backspace'));
    directive.onRightClick(new KeyboardEvent('contextmenu'));
    expect(directive).toBeTruthy();
  });
});

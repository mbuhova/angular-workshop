import { Directive, ElementRef, HostListener, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

enum Direction {
  Up,
  Down,
  Left,
  Right
}

@Directive({
  selector: '[appBubbling]'
})
export class BubblingDirective implements OnInit, OnDestroy, OnChanges {
  el;
  browserWidth;
  browserHeight;
  timer;
  animationSubscription;
  horizontal = Direction.Right;
  vertical = Direction.Down;

  @Input('appBubbling') highlightColor: string;
  @Input() bubbleSize: number;

  constructor(el: ElementRef) {
    this.el = el;
    this.timer = interval(60);
    // const takeFourNumbers = numbers.pipe(take(4));
 }

 ngOnInit() {
  this.browserWidth = window.innerWidth;
  this.browserHeight = window.innerHeight;

    this.el.nativeElement.style.backgroundColor = this.highlightColor;
    this.el.nativeElement.style.width = `${this.bubbleSize}px`;
    this.el.nativeElement.style.height = `${this.bubbleSize}px`;
    this.el.nativeElement.style.borderRadius = `${this.bubbleSize}px`;
    this.animationSubscription = this.timer.subscribe(x => this.startAnimation());
 }

 ngOnDestroy() {
   this.animationSubscription.unsubscribe();
 }

 ngOnChanges(changes: SimpleChanges) {
  if(changes.bubbleSize && !changes.bubbleSize.firstChange) {
    this.bubbleSize = changes.bubbleSize.currentValue;
    this.el.nativeElement.style.width = `${this.bubbleSize}px`;
    this.el.nativeElement.style.height = `${this.bubbleSize}px`;
    this.el.nativeElement.style.borderRadius = `${this.bubbleSize}px`;
  }
}

 @HostListener('window:resize', ['$event'])
 onResize(event) {
  this.browserWidth = window.innerWidth;
  this.browserHeight = window.innerHeight;
 }

 @HostListener('mouseenter') onMouseEnter() {
  this.animationSubscription.unsubscribe();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.animationSubscription = this.timer.subscribe(x => this.startAnimation());
  }

  @HostListener('click') onClick() {
    // if (this.animationSubscription && !this.animationSubscription.isStopped) {
    //   this.animationSubscription.unsubscribe();
    // } else {
    //   this.animationSubscription = this.timer.subscribe(x => this.startAnimation());
    // }
  }

  @HostListener('dblclick') onDoubleClick() {
    
  }

  startAnimation() {
    let top = this.el.nativeElement.offsetTop;
    let left = this.el.nativeElement.offsetLeft;

    if (this.horizontal == Direction.Right) {
      if (left >= this.browserWidth - this.bubbleSize) {
        this.el.nativeElement.style.left = (left - 1) + 'px';
        this.horizontal = Direction.Left;
      } else {
        this.el.nativeElement.style.left = (left + 1) + 'px';
      }
    }

    if (this.horizontal == Direction.Left) {
      if (left == 0) {
        this.el.nativeElement.style.left = (left + 1) + 'px';
        this.horizontal = Direction.Right;
      } else {
        this.el.nativeElement.style.left = (left - 1) + 'px';
      }
    }

    if (this.vertical == Direction.Down) {
      if (top >= this.browserHeight - this.bubbleSize) {
        this.el.nativeElement.style.top = (top - 1) + 'px';
        this.vertical = Direction.Up;
      } else {
        this.el.nativeElement.style.top = (top + 1) + 'px';
      }
    }

    if (this.vertical == Direction.Up) {
      if (top == 60) {
        this.el.nativeElement.style.top = (top + 1) + 'px';
        this.vertical = Direction.Down;
      } else {
        this.el.nativeElement.style.top = (top - 1) + 'px';
      }
    }
  }
}

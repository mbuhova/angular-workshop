import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BubbleComponent } from './bubble/bubble.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'workshopApp';
  bubblesForm;
  bubbles = [];

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.bubblesForm = this.formBuilder.group({
      color: '#c4f4cb',
      size: 50
    });
  }

  onSubmit(bubbleData) {
    this.bubbles.push({color: bubbleData.color, size: bubbleData.size});
    //this.bubblesForm.reset();
  }

  onClick() {
    this.bubbles.pop();
  }

  onChangeSize(event) {
    let newSize = parseInt(event.target.value);
    this.bubbles.forEach(bubble => {
      if (bubble.size + newSize < 10) {
        bubble.size = 10;
      } else if (bubble.size + newSize > 150) {
        bubble.size = 150;
      } else {
        bubble.size += newSize;
      }
    })
  }
}

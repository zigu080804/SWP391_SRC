import { AfterViewInit, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage',
  imports: [RouterModule, CommonModule],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css'
})
export class Homepage implements AfterViewInit {
  ngAfterViewInit() {
    const sliderWrapper = document.querySelector('.slider-wrapper') as HTMLElement;
    const benefitCards = document.querySelectorAll('.benefit-card');

    if (!sliderWrapper || benefitCards.length === 0) {
      console.error('Slider elements not found. Please check your HTML structure.');
      return;
    }

    let isDragging = false;
    let startX: number;
    let scrollLeft: number;
    let autoSlideInterval: any;
    const autoSlideDelay = 5000;

    let scrollAmount = benefitCards[0].clientWidth + (parseFloat(getComputedStyle(benefitCards[0] as HTMLElement).marginRight) || 0);

    const startDrag = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      sliderWrapper.classList.add('active-drag');
      startX = (e instanceof MouseEvent ? e.pageX : e.touches[0].pageX) - sliderWrapper.offsetLeft;
      scrollLeft = sliderWrapper.scrollLeft;
      stopAutoSlide();
    };

    const stopDrag = () => {
      isDragging = false;
      sliderWrapper.classList.remove('active-drag');
      startAutoSlide();
    };

    const drag = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = (e instanceof MouseEvent ? e.pageX : e.touches[0].pageX) - sliderWrapper.offsetLeft;
      const walk = x - startX;
      sliderWrapper.scrollLeft = scrollLeft - walk;
    };

    const autoSlide = () => {
      if (sliderWrapper.scrollLeft + sliderWrapper.clientWidth >= sliderWrapper.scrollWidth) {
        sliderWrapper.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        sliderWrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    };

    const startAutoSlide = () => {
      autoSlideInterval = setInterval(autoSlide, autoSlideDelay);
    };

    const stopAutoSlide = () => {
      clearInterval(autoSlideInterval);
    };

    // Mouse events
    sliderWrapper.addEventListener('mousedown', startDrag);
    sliderWrapper.addEventListener('mouseleave', stopDrag);
    sliderWrapper.addEventListener('mouseup', stopDrag);
    sliderWrapper.addEventListener('mousemove', drag);

    // Touch events
    sliderWrapper.addEventListener('touchstart', startDrag);
    sliderWrapper.addEventListener('touchend', stopDrag);
    sliderWrapper.addEventListener('touchmove', drag);

    startAutoSlide();
  }
}

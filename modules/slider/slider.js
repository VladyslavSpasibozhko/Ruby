window.Slider = class SliderClass {
	constructor() {
		this.slider = '';
	}

	translate =(num)=> {
		this.slider.style.transform = `translate(${num}px, ${0}px)`
	};

	right =()=> {
		if (this.slider.scrollWidth > this.slider.clientWidth) {
			let num = this.slider.clientWidth - this.slider.scrollWidth-30;
			this.translate(num)
		}
	};

	left =()=> {
		this.translate(0)
	};

	init =(elem)=> {
		const prev = document.getElementById('slider__prev');
		const next = document.getElementById('slider__next');
		this.slider = elem;

		prev.addEventListener('click', this.left);
		next.addEventListener('click', this.right);
	};

};

window.slider = new Slider();


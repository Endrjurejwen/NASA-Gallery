import { elements } from './base';
import { strings } from './base';

// Modal-photo
export const renderModalPhoto = function(photo) {
	const markup = `
		<div class="modal-photo">
			<figure class="modal-photo__container">
				<figcaption class="modal-photo__description u-margin-bottom-sm">${photo.data[0].title}</figcaption>
				<button class="btn modal-photo__btn">&times;</button>
				<img src=${photo.links[0].href}>	
			</figure>		
		</div>
	`;

	elements.modalWrapper.insertAdjacentHTML('beforeend', markup);
}

// close modal window with photo
export const clickOutside = function(e) {
	if (e.target === document.querySelector(strings.modalPhoto)) {
		elements.modalWrapper.innerHTML = '';
	}
}
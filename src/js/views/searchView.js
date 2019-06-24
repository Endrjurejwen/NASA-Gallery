import { elements } from './base';

export const getInput = function() {
	return elements.searchInput.value;
};

export const clearInput = function() {
	elements.searchInput.value = '';
};

export const clearResults = function() {
	elements.galleryContainer.innerHTML = '';
	elements.galleryPagination.innerHTML = '';
};

/*const limitResultTitle = function(title, limit = 23) {
	const newTitle = [];
	if (title.length > limit) {
		title.split(' ').reduce((acc, cur) => {
			if (acc + cur.length <= limit) {
				newTitle.push(cur);
			}
			return acc + cur.length;
		}, 0);

		return `${newTitle.join(' ')} ...`;
	}
	return title;
};*/

const limitResultText = function(text, limit) {
	if (typeof(text) === 'string' && text.length > limit) {
		return `${text.substring(0, limit)}...`;
	}
	return text;
};

{/* <button class="btn gallery__btn btn--more-info">More info</button> */}

const renderResult = function(result) {
	const markup = `
		<figure class="gallery__item">
			<img src="${result.links[0].href}" alt="${result.data[0].title}" class="gallery__photo">
			<div class="gallery__caption">
				<h4 class="gallery__title heading-4 u-margin-bottom-xs">${limitResultText(result.data[0].title, 22)}</h4>
				<p class="gallery__description">${limitResultText(result.data[0].description, 90)}</p>
				<div class="gallery__btn-box u-margin-top-md">
					<button class="btn gallery__btn btn--zoom" data-id=${result.data[0].nasa_id}>
						<svg class="search__icon u-margin-right-xxs">
							<use href="#icon-magnifying-glass"></use>
						</svg>
	          <span>Zoom</span>
					</button>
				</div>
			</div>
		</figure>
	`;
	elements.galleryContainer.insertAdjacentHTML('beforeend', markup);
};

const createButtonPrev = function(page) {
	return `
		<button class="btn btn--icon btn--pagination" data-goto=${page - 1}>
			<svg class="u-margin-right-xxs" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <symbol id="icon-triangle-left" viewBox="0 0 20 20">
					<title>triangle-left</title>
					<path d="M14 5v10l-9-5 9-5z"></path>
				</symbol>
          <use href="#icon-triangle-left"></use>
    		</svg>
			<span>Page ${page - 1}</span>
		</button>
	`;
}

const createButtonNext = function(page) {
	return `
		<button class="btn btn--icon btn--pagination u-margin-left-xl" data-goto=${page + 1}>
			<span>Page ${page + 1}</span>
			<svg class="u-margin-left-xxs" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <symbol id="icon-triangle-right" viewBox="0 0 20 20">
					<title>triangle-right</title>
					<path d="M15 10l-9 5v-10l9 5z"></path>
				</symbol>
          <use href="#icon-triangle-right"></use>
    		</svg>
		</button>
	`;
}

const renderButtons = function(page, numResults, resPerPage) {
	const pages = Math.ceil(numResults / resPerPage);

	let button;
	if (page === 1 && pages > 1) {
		button = createButtonNext(page);
	} else if (page < pages) {
		button = `
			${createButtonPrev(page)}
			${createButtonNext(page)}
		`;
	} else if (page === pages && pages > 1) {
		button = createButtonPrev(page);
	}

	elements.galleryPagination.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = function(results, page = 1, resPerPage = 6) {
	// render results of current page
	const start = (page - 1) * resPerPage;
	const end = page * resPerPage;

	results.slice(start, end).forEach(renderResult);

	// render pagination buttons
	renderButtons(page, results.length, resPerPage);
};
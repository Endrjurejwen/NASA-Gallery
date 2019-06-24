import '../scss/style.scss';

import Search from './models/Search';
import * as searchView from './views/searchView';
import * as modalView from './views/modalView';
import { elements } from './views/base';
import { strings } from './views/base';

/*************************************
************ GLOBAL STATE
*************************************/
const state = {};



/*************************************
************ Search Controller
*************************************/
const controlSearch = async function () {

	// 1. Get Query from view
	const query = searchView.getInput();

	if (query) {
		// 2. New search object and add to state
		state.search = new Search(query);

		// 3. Prepare UI for results
		searchView.clearInput();
		searchView.clearResults();

		// 4. Search for photos and video
		await state.search.getResults();

		// 4b. Filter for images / videos
		state.search.getFilterResults();
		// console.log(state.search.filterResult);

		// 5. Render results on UI
		searchView.renderResults(state.search.filterResult);
	}
}

elements.searchForm.addEventListener('submit', e => {
	e.preventDefault(); // stop loading page when click search buton
	controlSearch();
});

elements.galleryPagination.addEventListener('click', e => {
	const btn = e.target.closest(strings.btnPagination);

	if (btn) {
		const goToPage = parseInt(btn.dataset.goto, 10);
		searchView.clearResults();
		searchView.renderResults(state.search.filterResult, goToPage);
	}
});



/*************************************
************ Modal Photo Controller
*************************************/
elements.galleryContainer.addEventListener('click', e => {

	const btn = e.target.closest(strings.btnZoom);

	if (btn) {

		// get id
		const id = btn.dataset.id;

		// get current object based on id
		state.currentPhoto = state.search.filterResult.find(e => {
			return e.data[0].nasa_id === id;
		});

		// render modal photo with current data
		modalView.renderModalPhoto(state.currentPhoto);
	}
});

elements.modalWrapper.addEventListener('click', e => {
	const btn = e.target.closest(strings.modalPhotoBtn);

	if (btn) {
		elements.modalWrapper.innerHTML = '';	
	}
	
});

window.addEventListener('click', modalView.clickOutside);


import axios from 'axios';

export default class Search {
	constructor(query) {
		this.query = query;
	}

	async getResults() {
		try {
			const res = await axios(`https://images-api.nasa.gov/search?q=${this.query}`);
			this.result = res.data.collection.items;
			// console.log(this.result);
		} catch (error) {
			alert(error)
		}
	}

	getFilterResults() {
		this.filterResult = filterResults(this.result, 'image');
	}
}


function filterResults(result, type) {
	return result.filter(el => el.data[0].media_type === type);
}
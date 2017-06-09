Vue.component('demo-grid', {
	template : '#grid-template',
	props : {
		filterKey : String,
		columns : Array,
		data : Array
	},
	data : function(){
		var sortOrders = {};
		this.columns.forEach(function(key){
			sortOrders[key] = 1;
		});
		return {
			sortKey : '',
			sortOrders : sortOrders
		}
	},
	filters : {
		capitalize : function(str){
			return str.charAt(0).toUpperCase() + str.slice(1);
		}
	},
	methods : {
		sortBy : function(key){
			this.sortKey = key;
			this.sortOrders[key] = this.sortOrders[key] * -1;
		}
	},
	computed : {
		filteredData : function(){
			var data = this.data;
			var sortKey = this.sortKey;
			var order = this.sortOrders[sortKey] || 1;
			var filterKey = this.filterKey && this.filterKey.toLowerCase();

			if(filterKey){
				data = data.filter(function(row){
					return Object.keys(row).some(function(key){
						return String(row[key]).toLowerCase().indexOf(filterKey) > -1;
					});
				});
			}

			if(sortKey){
				data = data.slice().sort(function(a, b){
					a = a[sortKey];
					b = b[sortKey];
					return (a === b ? 0 : a < b ? -1 : 1) * order;
				});
			}

			return data
		}
	}

});

var demo = new Vue({
	el : '#demo',
	data : {
		searchQuery : '',
		gridColumns: ['name', 'power'],
	    gridData: [
	      { name: 'Chuck Norris', power: Infinity },
	      { name: 'Bruce Lee', power: 9000 },
	      { name: 'Jackie Chan', power: 7000 },
	      { name: 'Jet Li', power: 8000 }
		]
	}
});
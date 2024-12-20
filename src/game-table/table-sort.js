document.addEventListener( 'DOMContentLoaded', function () {
	function sortTable( table, column, asc = true ) {
		const dirModifier = asc ? 1 : -1;
		const tBody = table.tBodies[ 0 ];
		const rows = Array.from( tBody.querySelectorAll( 'tr' ) );

		// New sorting logic
		const sortedRows = rows.sort( ( a, b ) => {
			const aColTime = a
				.querySelector( `td:nth-child(${ column + 1 })` )
				.getAttribute( 'data-time' );
			const bColTime = b
				.querySelector( `td:nth-child(${ column + 1 })` )
				.getAttribute( 'data-time' );

			if ( aColTime && bColTime ) {
				return (
					( parseInt( aColTime ) - parseInt( bColTime ) ) *
					dirModifier
				);
			}

			const aColText = a
				.querySelector( `td:nth-child(${ column + 1 })` )
				.textContent.trim();
			const bColText = b
				.querySelector( `td:nth-child(${ column + 1 })` )
				.textContent.trim();
			return (
				aColText.localeCompare( bColText, undefined, {
					numeric: true,
					sensitivity: 'base',
				} ) * dirModifier
			);
		} );

		while ( tBody.firstChild ) {
			tBody.removeChild( tBody.firstChild );
		}

		tBody.append( ...sortedRows );

		table
			.querySelectorAll( 'th' )
			.forEach( ( th ) =>
				th.classList.remove( 'th-sort-asc', 'th-sort-desc' )
			);
		table
			.querySelector( `th:nth-child(${ column + 1 })` )
			.classList.toggle( 'th-sort-asc', asc );
		table
			.querySelector( `th:nth-child(${ column + 1 })` )
			.classList.toggle( 'th-sort-desc', ! asc );
	}

	function updateURLParameter( param, value ) {
		const url = new URL( window.location );
		url.searchParams.set( param, value );
		window.history.replaceState( {}, '', url );
	}

	function getSortParams() {
		const urlParams = new URLSearchParams( window.location.search );
		const columnName = urlParams.get( 'column' );
		const order = urlParams.get( 'order' ) === 'asc';

		let column;
		switch ( columnName ) {
			case 'rating':
				column = 0;
				break;
			case 'title':
				column = 1;
				break;
			case 'date':
				column = 2;
				break;
			default:
				column = NaN;
		}

		return { column, order };
	}

	function initTableSort() {
		const table = document.querySelector( '#game-table' );
		const { column, order } = getSortParams();

		if ( ! isNaN( column ) ) {
			sortTable( table, column, order );
		}

		document
			.querySelectorAll( '#game-table th' )
			.forEach( ( headerCell, index ) => {
				headerCell.addEventListener( 'click', () => {
					const tableElement =
						headerCell.parentElement.parentElement.parentElement;
					const headerIndex = index;
					const currentIsAscending =
						headerCell.classList.contains( 'th-sort-asc' );

					const newIsAscending = ! currentIsAscending;

					// Update table sorting
					sortTable( tableElement, headerIndex, newIsAscending );

					// Map column index to name
					let columnName;
					switch ( headerIndex ) {
						case 0:
							columnName = 'rating';
							break;
						case 1:
							columnName = 'title';
							break;
						default:
							columnName = 'date';
					}

					// Update the URL with sort parameters
					updateURLParameter( 'column', columnName );
					updateURLParameter(
						'order',
						newIsAscending ? 'asc' : 'desc'
					);
				} );
			} );
	}

	initTableSort();
} );

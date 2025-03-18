document.addEventListener( 'DOMContentLoaded', function () {
	// Cache the table and headers
	const table = document.querySelector( '#game-table' );
	if ( ! table ) {
		return;
	} // Exit early if no table exists

	const headers = Array.from( table.querySelectorAll( 'th' ) );
	const tBody = table.tBodies[ 0 ];
	const rows = Array.from( tBody.querySelectorAll( 'tr' ) );

	// Avoid recalculating the column map repeatedly
	const columnMap = { rating: 0, title: 1, date: 2 };

	function sortTable( column, asc ) {
		const dirModifier = asc ? 1 : -1;

		// Sort rows in-place for less memory allocation
		rows.sort( ( a, b ) => {
			const aCell = a.cells[ column ];
			const bCell = b.cells[ column ];

			const aColTime = aCell?.getAttribute( 'data-time' );
			const bColTime = bCell?.getAttribute( 'data-time' );

			if ( aColTime && bColTime ) {
				return (
					( parseInt( aColTime ) - parseInt( bColTime ) ) *
					dirModifier
				);
			}

			const aColText = aCell.textContent.trim().toLowerCase();
			const bColText = bCell.textContent.trim().toLowerCase();
			return (
				aColText.localeCompare( bColText, undefined, {
					numeric: true,
				} ) * dirModifier
			);
		} );

		// Re-attach rows with minimal DOM operations
		const fragment = document.createDocumentFragment();
		rows.forEach( ( row ) => fragment.appendChild( row ) );
		tBody.replaceChildren( fragment ); // Fastest way to replace children
	}

	function updateHeaderClasses( index, asc ) {
		headers.forEach( ( header, i ) => {
			header.classList.toggle( 'th-sort-asc', i === index && asc );
			header.classList.toggle( 'th-sort-desc', i === index && (!asc || (index === columnMap.rating && isNaN(getSortParams().column))));
		} );
	}

	function updateURLParameter( param, value ) {
		const url = new URL( window.location );
		url.searchParams.set( param, value );
		window.history.replaceState( {}, '', url );
	}

	function getSortParams() {
		const urlParams = new URLSearchParams( window.location.search );
		const columnName = urlParams.get( 'column' );
		return {
			column: columnMap[ columnName ] ?? NaN,
			order: urlParams.get( 'order' ) === 'asc',
		};
	}

	function initTableSort() {
		let { column, order } = getSortParams();

		// Falls keine URL-Parameter gesetzt sind, standardmäßig erste Spalte (`rating`) mit `desc` sortieren
		if ( isNaN( column ) ) {
			column = columnMap.rating;
			order = false; // Standardmäßig `desc`
			updateURLParameter( 'column', 'rating' );
			updateURLParameter( 'order', 'desc' );
		}

		sortTable( column, order );
		updateHeaderClasses( column, order ); // Korrekte Initialisierung der Header-Klassen

		headers.forEach( ( headerCell, index ) => {
			headerCell.addEventListener( 'click', () => {
				const isAscending =
					headerCell.classList.contains( 'th-sort-asc' );
				const newIsAscending = ! isAscending;

				// Perform sorting and updates
				sortTable( index, newIsAscending );
				updateHeaderClasses( index, newIsAscending );

				// Update URL parameters
				const columnName = Object.keys( columnMap ).find(
					( key ) => columnMap[ key ] === index
				);
				updateURLParameter( 'column', columnName );
				updateURLParameter( 'order', newIsAscending ? 'asc' : 'desc' );
			} );
		} );
	}

	initTableSort();
} );

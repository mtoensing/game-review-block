document.addEventListener( 'DOMContentLoaded', function () {
	const tables = Array.from(
		document.querySelectorAll( '[data-game-review-table]' )
	);

	if ( ! tables.length ) {
		return;
	}

	// Avoid recalculating the column map repeatedly
	const columnMap = { rating: 0, title: 1, date: 2 };

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

	function initTableSort( table ) {
		const headers = Array.from( table.querySelectorAll( 'th' ) );
		const tBody = table.tBodies[ 0 ];

		if ( ! headers.length || ! tBody ) {
			return;
		}

		const rows = Array.from( tBody.querySelectorAll( 'tr' ) );

		function sortTable( column, asc ) {
			const dirModifier = asc ? 1 : -1;

			rows.sort( ( a, b ) => {
				const aCell = a.cells[ column ];
				const bCell = b.cells[ column ];

				const aColTime = aCell?.getAttribute( 'data-time' );
				const bColTime = bCell?.getAttribute( 'data-time' );

				if ( aColTime && bColTime ) {
					return (
						( Number.parseInt( aColTime, 10 ) -
							Number.parseInt( bColTime, 10 ) ) *
						dirModifier
					);
				}

				// Treat ratings like "9/10" and "9.5/10" as numbers.
				if ( column === columnMap.rating ) {
					const aNum = parseFloat( aCell.textContent.trim() );
					const bNum = parseFloat( bCell.textContent.trim() );

					if ( ! isNaN( aNum ) && ! isNaN( bNum ) ) {
						return ( aNum - bNum ) * dirModifier;
					}
				}

				const aColText = aCell.textContent.trim().toLowerCase();
				const bColText = bCell.textContent.trim().toLowerCase();
				return (
					aColText.localeCompare( bColText, undefined, {
						numeric: true,
					} ) * dirModifier
				);
			} );

			const fragment = document.createDocumentFragment();
			rows.forEach( ( row ) => fragment.appendChild( row ) );
			tBody.replaceChildren( fragment );
		}

		function updateHeaderClasses( index, asc ) {
			headers.forEach( ( header, i ) => {
				header.classList.toggle( 'th-sort-asc', i === index && asc );
				header.classList.toggle( 'th-sort-desc', i === index && ! asc );
			} );
		}

		let { column, order } = getSortParams();

		if ( isNaN( column ) ) {
			column = columnMap.rating;
			order = false;
			updateURLParameter( 'column', 'rating' );
			updateURLParameter( 'order', 'desc' );
		}

		sortTable( column, order );
		updateHeaderClasses( column, order );

		headers.forEach( ( headerCell, index ) => {
			headerCell.addEventListener( 'click', () => {
				const isAscending =
					headerCell.classList.contains( 'th-sort-asc' );
				const newIsAscending = ! isAscending;

				sortTable( index, newIsAscending );
				updateHeaderClasses( index, newIsAscending );

				const columnName = Object.keys( columnMap ).find(
					( key ) => columnMap[ key ] === index
				);
				updateURLParameter( 'column', columnName );
				updateURLParameter( 'order', newIsAscending ? 'asc' : 'desc' );
			} );
		} );
	}

	tables.forEach( initTableSort );
} );

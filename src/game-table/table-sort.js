document.addEventListener( 'DOMContentLoaded', function () {
	function sortTable( table, column, asc = true ) {
		const dirModifier = asc ? 1 : -1;
		const tBody = table.tBodies[ 0 ];
		const rows = Array.from( tBody.querySelectorAll( 'tr' ) );

		const sortedRows = rows.sort( ( a, b ) => {
			const aColText = a
				.querySelector( `td:nth-child(${ column + 1 })` )
				.textContent.trim();
			const bColText = b
				.querySelector( `td:nth-child(${ column + 1 })` )
				.textContent.trim();

			// Check if the columns are ratings (with '/10') or dates (formatted as 'YYYY-MM-DD')
			if ( aColText.includes( '/10' ) && bColText.includes( '/10' ) ) {
				// Extract and compare numeric values for ratings
				return (
					( parseFloat( aColText ) - parseFloat( bColText ) ) *
					dirModifier
				);
			} else if (
				! isNaN( Date.parse( aColText ) ) &&
				! isNaN( Date.parse( bColText ) )
			) {
				// Compare dates
				return (
					( new Date( aColText ) - new Date( bColText ) ) *
					dirModifier
				);
			}
			// Default to string comparison
			return (
				aColText.localeCompare( bColText, undefined, {
					numeric: true,
					sensitivity: 'base',
				} ) * dirModifier
			);
		} );

		// Remove all existing TRs from the table
		while ( tBody.firstChild ) {
			tBody.removeChild( tBody.firstChild );
		}

		// Re-add the newly sorted rows
		tBody.append( ...sortedRows );

		// Remember how the column is currently sorted
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

	// Attach a click event to each of the table headers
	document.querySelectorAll( '#gameTable th' ).forEach( ( headerCell ) => {
		headerCell.addEventListener( 'click', () => {
			const tableElement =
				headerCell.parentElement.parentElement.parentElement;
			const headerIndex = Array.prototype.indexOf.call(
				headerCell.parentElement.children,
				headerCell
			);
			const currentIsAscending =
				headerCell.classList.contains( 'th-sort-asc' );

			sortTable( tableElement, headerIndex, ! currentIsAscending );
		} );
	} );
} );

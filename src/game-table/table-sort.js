document.addEventListener( 'DOMContentLoaded', function () {
	function sortTable( table, column, asc = true ) {
		const dirModifier = asc ? 1 : -1;
		const tBody = table.tBodies[ 0 ];
		const rows = Array.from( tBody.querySelectorAll( 'tr' ) );

		// New sorting logic
		const sortedRows = rows.sort( ( a, b ) => {
			// Get the 'data-time' attribute from the cells
			const aColTime = a
				.querySelector( `td:nth-child(${ column + 1 })` )
				.getAttribute( 'data-time' );
			const bColTime = b
				.querySelector( `td:nth-child(${ column + 1 })` )
				.getAttribute( 'data-time' );

			// Check if the columns have valid timestamps
			if ( aColTime && bColTime ) {
				return (
					( parseInt( aColTime ) - parseInt( bColTime ) ) *
					dirModifier
				);
			}

			// Default to string comparison for other columns
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
	document.querySelectorAll( '#game-table th' ).forEach( ( headerCell ) => {
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

/* global IntersectionObserver */
document.addEventListener( 'DOMContentLoaded', function () {
	// Get the elements
	const ratingElem = document.querySelector( '.shortscore' );
	const hreviewElem = document.querySelector( '.shortscore-hreview' );

	// Set the initial class value to 'shortscore-0'
	ratingElem.className = 'shortscore shortscore-0';

	// Function to run the animation
	const animateScore = () => {
		let currentScore = 0;
		const targetScore = parseInt(
			ratingElem.querySelector( '.value' ).innerText
		);

		const intervalID = setInterval( () => {
			if ( currentScore <= targetScore ) {
				ratingElem.className = `shortscore shortscore-${ currentScore }`;
				currentScore++;
			} else {
				clearInterval( intervalID );
			}
		}, 200 );
	};

	// Create an observer
	const observer = new IntersectionObserver(
		( entries ) => {
			entries.forEach( ( entry ) => {
				if ( entry.isIntersecting ) {
					animateScore();
					observer.unobserve( ratingElem );
				}
			} );
		},
		{ threshold: 1 }
	);

	// Observe the element
	observer.observe( ratingElem );

	// Add click event listener
	hreviewElem.addEventListener( 'click', () => {
		animateScore();
	} );
} );

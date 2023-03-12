const container= document.querySelector('.container');
const seats =document.querySelectorAll('.row .seat:not(.occupied)');
const count=document.getElementById('count');
const total=document.getElementById('total');
const movieSelect=document.getElementById('movie');

populateUI();

let ticketPrice= +movieSelect.value;

// Save Movie index Or price........
function setMovieData(movieIndex,moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}
// Updating total and counting it......
function updateSelectedCount(){
    const selectedSeats=document.querySelectorAll('.row .seat.selected');

    const seatIndex =[...selectedSeats].map((seat) => [...seats].indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(seatIndex));
    
    const selectedSeatsCount=selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// Data from local storage ,populate ui......
function populateUI(){
    const selectedSeats =JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats !== null && selectedSeats.length >0){
        seats.forEach((seat,index) =>{
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// Event for movie.......
movieSelect.addEventListener('change', (e) =>{
    ticketPrice = +e.target.value;

    setMovieData(e.target.selectedIndex, e.currentTarget.value);
    updateSelectedCount();
})


// Event for seat.......
container.addEventListener('click', (e) => {
  if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
    e.target.classList.toggle('selected');
    
    updateSelectedCount();
  }
});

// Initial count or set total...
updateSelectedCount();


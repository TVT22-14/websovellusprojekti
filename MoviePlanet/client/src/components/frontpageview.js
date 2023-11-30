// Tuoreimmat uutiset + näytä lisää palikka
// Viimeisimmät arvostelut + näytä lisää palikka
// Suosituimmat elokuvat + näytä lisää palikka
// Suosituimman ryhmät + näytä lisää palikka
// Muokkaa näkymää
import React from 'react';
import '../frontpage.css';

function FrontPageView() {
    return (
        <div>
            <MovieSearchBar />
        </div>
    )
}


function MovieSearchBar() {



    return (

        <div id='searchMovie'>
            <section id='transParency'>

                <section id='haeElokuva'>
                    <h3>Hae elokuvaa tai sarjaa</h3>
                    <input id='search-box' type='text' placeholder='Hae elokuvaa' />
                    <button id='search'>Hae</button>
                </section>

                <div id='suodatus'>
                    <label>Suodata</label> <br />
                    <button className='genreBtn'>Kauhu</button>
                    <button className='genreBtn'>Komedia</button>
                    <button className='genreBtn'>Scifi</button>


                    <select id="dropdown">
                        <option value="">Lisää genrejä</option>
                        <option value="1">kissa</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>
            </section>
        </div>

    )
}

export default FrontPageView;


// Ryhmäkuva + nimi 
// Ryhmänjäsenten näyttäminen
// Käyttäjän ryhmien hakeminen



// Täällä haetaan ryhmän nimi, kuva ja kuvaus
import {GroupDetails} from './groupdetails';
// Täällä haetaan ryhmän jäsenet
import {GroupMembers} from './groupmembers';
// Täällä haetaan ryhmän uutiset
import {Groupnews} from './groupnews';

export const Communitypage = () => {

    return (
      <div>
        <GroupDetails />
        <GroupMembers />
        <Groupnews />
      </div>
    );







};

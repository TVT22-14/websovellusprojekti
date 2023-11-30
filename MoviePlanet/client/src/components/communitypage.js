
// Ryhmäkuva + nimi 
// Ryhmänjäsenten näyttäminen
// Käyttäjän ryhmien hakeminen



// Täällä haetaan ryhmän nimi, kuva ja kuvaus
import {GroupDetails} from './groupdetails';
// Täällä haetaan ryhmän jäsenet
import {GroupMembers} from './groupmembers';

export const Communitypage = () => {

    return (
      <div>
        <GroupDetails />
        <GroupMembers />
      </div>
    );







};


// Ryhmäkuva + nimi 
// Ryhmänjäsenten näyttäminen
// Käyttäjän ryhmien hakeminen

// This component shoes group details like group name, description and group picture
import {GroupDetails} from './groupdetails';
// This component shows group members
import {GroupMembers} from './groupmembers';
// This component shows news shared to group
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

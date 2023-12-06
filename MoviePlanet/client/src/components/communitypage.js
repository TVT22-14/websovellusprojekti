import { GroupDetails } from './groupdetails';
import { GroupMembers } from './groupmembers';
import { Groupnews } from './groupnews';
import { IsGroupMember, LoggedIn } from './auth';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { isMemberSignal} from './signals';

export const Communitypage = () => {

  const groupname = useParams();

    LoggedIn(); // Tarkistetaan onko käyttäjä kirjautunut
    IsGroupMember(groupname); // Tarkistetaan onko käyttäjä ryhmän jäsen

  return (
    <div>
      {/* Voit lisätä tarkistuksen IsGroupMember palauttamasta arvosta ja näyttää sisällön vain jos käyttäjä on ryhmän jäsen */}
      {isMemberSignal.value === true ? (
        <>
          <GroupDetails />
          <GroupMembers />
          <Groupnews />
        </>
      ) : (
        <p>Sinulla ei ole oikeutta nähdä tätä sisältöä.</p>
      )}
    </div>
  );
};

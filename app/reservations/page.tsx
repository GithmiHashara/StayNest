import EmptyState from "../components/EmptyState";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ReservationsClient from "./ReservationsClient ";

const ReservationsPage  = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser)
         return (
    <EmptyState
     title="Unauthorized" 
     subtitle="Please login"
     />

         );
         const reservations = await getReservations({
            authorId: currentUser.id
         });

         if (!reservations.length) {
             return (
                 <EmptyState
                 title="No reservations"
                 subtitle="You don't have any reservations yet"
                 />
             );
         }

         return(
            <ReservationsClient 
            reservations= {reservations}
            
            currentUser={currentUser}
            />
         )
}

export default ReservationsPage;



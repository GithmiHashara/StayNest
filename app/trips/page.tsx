import EmptyState from "../components/EmptyState";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import TripsClient from "./TripsClient";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized"
    subtitle="Login or create an account to view your trips." />;
   
  }

  const reservations = await getReservations({
    userId: currentUser.id,
  });

  if (!reservations.length) {
    return <EmptyState title="No Trips"
    subtitle="You have not booked any trips yet." />;
  }

  return (
    <TripsClient 
        reservations={reservations} 
        currentUser={currentUser}
    />
  )
}
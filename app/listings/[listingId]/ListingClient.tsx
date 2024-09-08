import { SafeListing, SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";

interface ListingClientProps {
    reservations?: Reservation[];
    listing: SafeListing & {
      user: SafeUser
    }
    currentUser?: SafeUser | null;
  }

const ListingClient = ( ) => {
    

    return (
        <div>
           Listing Client
        </div>
    )
};

export default ListingClient;
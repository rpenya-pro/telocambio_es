import { NewsComponent } from "../../components/protected/NewsComponent";
import { UserProfileComponent } from "../../components/protected/UserProfileComponent";
import { EventsComponent } from "../../components/protected/EventsComponent";

/**
 * Página del Sumario de actividad
 * se muestra por default y usa la url y el slug de usuario
 * @returns
 */
export const ActivitySummary = () => {
  return (
    <div className="container activity">
      <div className="row">
        <div className="col-md-3 activity__ccolumn">
          <UserProfileComponent />
        </div>
        <div className="col-md-6">
          <NewsComponent />
        </div>
        <div className="col-md-3 activity__c3olumn">
          <EventsComponent />
        </div>
      </div>
    </div>
  );
};

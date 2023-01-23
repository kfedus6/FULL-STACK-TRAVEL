import * as ActionCreatorsUser from './userAction';
import * as ActionCreatorsFlights from './flightsAction';
import * as ActionCreatorsNovetly from "./novetlyAction";
import * as ActionCreatorsAboutUs from "./aboutUsAction";
import * as ActionCreatorsFAQ from "./FAQAction";
import * as ActionCreatorsLanguage from "./languageAction";
import * as ActionCreatorsInfoCompany from "./infoCompanyAction";
import * as ActionCreatorsBlog from "./blogAction";
import * as ActionCreatorsResponce from './responceAction';
import * as ActionCreatorsflightsSearchWithHome from "./flightsSearchWithHomeAction"
import * as ActionCreatorsFlightOrders from './flightOrdersAction';
import * as ActionCreatorsMessage from "./messageAction";

export default {
    ...ActionCreatorsUser,
    ...ActionCreatorsFlights,
    ...ActionCreatorsNovetly,
    ...ActionCreatorsAboutUs,
    ...ActionCreatorsFAQ,
    ...ActionCreatorsLanguage,
    ...ActionCreatorsInfoCompany,
    ...ActionCreatorsBlog,
    ...ActionCreatorsResponce,
    ...ActionCreatorsflightsSearchWithHome,
    ...ActionCreatorsFlightOrders,
    ...ActionCreatorsMessage
};

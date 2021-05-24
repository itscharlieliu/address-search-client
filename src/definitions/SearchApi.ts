// const BACKEND_IP = "3.101.26.91"; // backend on AWS
const BACKEND_IP = window.location.hostname;

// Currently set to this computer's ip. Change this if the server is hosted somewhere else
export const SEARCH_URL = "http://" + BACKEND_IP + ":8080/search";

// This is the format of the results provided by the backend
export interface SearchResult {
    SaleType: string;
    SoldDate: string;
    PropertyType: string;
    Address: string;
    City: string;
    StateOrProvince: string;
    ZipOrPostalCode: string;
    Price: string;
    Beds: string;
    Baths: string;
    Location: string;
    SquareFeet: string;
    LotSize: string;
    YearBuilt: string;
    DaysOnMarket: string;
    PricePerSquareFeet: string;
    HoaPerMonth: string;
    Status: string;
    NextOpenHouseStartTime: string;
    NextOpenHouseEndTime: string;
    Url: string;
    Source: string;
    MlsNumber: string;
    Favorite: string;
    Interested: string;
    Latitude: string;
    Longitude: string;
}

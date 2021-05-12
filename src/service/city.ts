import { api } from "../util";
import { weatherEndpointUri } from '../config';

export const fetchCities = () => api(`http://127.0.0.1:8080/${weatherEndpointUri}`);
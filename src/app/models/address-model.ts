export interface Address {
  firstName: string;
  lastName: string;
  streetAddress: string;
  streetAddress2?: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
  country: string;
  countryCode: string;
  longitude?: number;
  latitude?: number;
  isDefault: boolean;
}

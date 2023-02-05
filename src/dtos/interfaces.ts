export interface clinicQueryparams {
  city?: string;
  zip?: string;
  state?: string;
  clinicName?: string;
  suburb?: string;
}

export interface clinicContent {
  clinicName: string;
  clinicSlug: string;
  address: string;
  website: string;
  phone: string;
  suburb: string;
  zip: string;
  email: string;
  state: string;
  city: string;
  about: string;
  location?: object;
}

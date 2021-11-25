export interface Users{
  id?: string;
  name?: string;
  password?: string;
  phone?: string;
  gender?: string;
  address?:{
    district?: string;
    number_street?: string;
    province?: string;
    ward?: string;
  }
}

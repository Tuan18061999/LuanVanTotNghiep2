export interface Orders{
  idDoc?: string;
  dmyOrder?: string;
  hmsOrder?: string;
  issuesImg1Link?: string;
  issuesImg2Link?: string;
  listpartner?: string[];
  name?: string;
  ordererAddress?: string;
  ordererIssues?: string;
  ordererName?: string;
  ordererPhone?: string;
  partner?: string;
  status?: string;
  userId?: string;
  priceInfor?: {
    CostsIncurred?: number,
    FinalPrice?: number,
    Price?: number,
    isAccept1?: boolean,
    isCash?: boolean
  }
}

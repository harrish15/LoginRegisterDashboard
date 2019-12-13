export interface Iregistration {
    FirstName: string;
    LastName: string;
    Gender?: boolean;
    DOB?: string;
    MobileNo: string;
    EmailId: string;
    FlatNo?: string;
    WingNo?: string;
    Address?: string;
    MaritalStatus?: boolean;
    FamilyCount?: string;
    Education?: string;
    Occupation?: string;
    AnniversaryDate?: string;
    ProfilePic?: string;
    UserLogin: {
      UserName: string;
      Password: string;
    };
  }
  
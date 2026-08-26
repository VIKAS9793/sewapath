export type Language = "mr" | "hi" | "en";

export interface ServiceTranslation {
  routeTitle: string;
  checklistHeading: string;
  checklist: string[];
  checklistHints: string[];
  citation: string;
}

export interface CitizenService {
  id: string;
  keywords: string[];
  translations: Record<Language, ServiceTranslation>;
}

export const CITIZEN_SERVICES: CitizenService[] = [
  {
    id: "income_certificate",
    keywords: ["income", "utpanna", "utpan", "certificate", "उत्पन्न", "आय", "aay", "pramanpatra"],
    translations: {
      mr: {
        routeTitle: "उत्पन्न प्रमाणपत्रासाठी मार्ग",
        checklistHeading: "ही कागदपत्रे तयार ठेवा:",
        checklist: ["ओळखपत्र (Identity Proof)", "पत्ता पुरावा (Address Proof)", "उत्पन्नाचा पुरावा (Income Proof)", "इतर कागदपत्रे"],
        checklistHints: [
          "आधार कार्ड, पॅन कार्ड, मतदार ओळखपत्र किंवा पासपोर्ट",
          "रेशन कार्ड, वीज/पाणी बिल किंवा भाडे पावती",
          "आयकर रिटर्न (ITR), फॉर्म 16 किंवा तलाठी अहवाल",
          "स्वयं-घोषणापत्र (Affidavit) आणि फोटो",
        ],
        citation: "अधिकृत आपले सरकार पोर्टलवरून प्रमाणित (August 2026)",
      },
      hi: {
        routeTitle: "आय प्रमाण पत्र का मार्ग",
        checklistHeading: "ये दस्तावेज़ तैयार रखें:",
        checklist: ["पहचान पत्र (Identity Proof)", "पता प्रमाण (Address Proof)", "आय प्रमाण (Income Proof)", "अन्य दस्तावेज़"],
        checklistHints: [
          "आधार कार्ड, पैन कार्ड, वोटर आईडी या पासपोर्ट",
          "राशन कार्ड, बिजली/पानी का बिल या किराया रसीद",
          "आयकर रिटर्न (ITR), फॉर्म 16 या तलाठी रिपोर्ट",
          "स्व-घोषणा (Affidavit) और फोटो",
        ],
        citation: "आधिकारिक आपले सरकार पोर्टल से सत्यापित (अगस्त 2026)",
      },
      en: {
        routeTitle: "Income Certificate Route",
        checklistHeading: "Keep these documents ready:",
        checklist: ["Identity Proof", "Address Proof", "Income Proof", "Other Documents"],
        checklistHints: [
          "Aadhaar Card, PAN Card, Voter ID, or Passport",
          "Ration Card, Electricity/Water Bill, or Rent Receipt",
          "Income Tax Return (ITR), Form 16, or Talathi Report",
          "Self-Declaration (Affidavit) and Photo",
        ],
        citation: "Verified against official Aaple Sarkar portal (Aug 2026)",
      },
    },
  },
  {
    id: "domicile_certificate",
    keywords: ["domicile", "nationality", "age", "rahivasi", "अधिवास", "रहिवासी", "niwasi", "resident", "age proof"],
    translations: {
      mr: {
        routeTitle: "वय, राष्ट्रीयत्व आणि अधिवास प्रमाणपत्र",
        checklistHeading: "ही कागदपत्रे तयार ठेवा:",
        checklist: ["ओळखपत्र (Identity Proof)", "पत्ता पुरावा (Address Proof)", "वयाचा पुरावा (अल्पवयीनांसाठी)", "निवासी पुरावा (Residency Proof)", "अनिवार्य कागदपत्रे"],
        checklistHints: [
          "आधार कार्ड, पॅन कार्ड, किंवा मतदार ओळखपत्र",
          "रेशन कार्ड, वीज/पाणी बिल, किंवा भाडे पावती",
          "शाळा सोडल्याचा दाखला किंवा जन्म प्रमाणपत्र",
          "तलाठी/ग्रामसेवक दाखला किंवा 15 वर्षांच्या वास्तव्याचा पुरावा",
          "स्वयं-घोषणापत्र (Self-Declaration Form)",
        ],
        citation: "अधिकृत आपले सरकार पोर्टलवरून प्रमाणित (August 2026)",
      },
      hi: {
        routeTitle: "आयु, राष्ट्रीयता और अधिवास (Domicile) प्रमाण पत्र",
        checklistHeading: "ये दस्तावेज़ तैयार रखें:",
        checklist: ["पहचान पत्र (Identity Proof)", "पता प्रमाण (Address Proof)", "आयु प्रमाण (नाबालिगों के लिए)", "निवास प्रमाण (Residency Proof)", "अनिवार्य दस्तावेज़"],
        checklistHints: [
          "आधार कार्ड, पैन कार्ड, या वोटर आईडी",
          "राशन कार्ड, बिजली/पानी का बिल, या किराया रसीद",
          "स्कूल छोड़ने का प्रमाण पत्र या जन्म प्रमाण पत्र",
          "तलाठी/ग्रामसेवक रिपोर्ट या 15 वर्ष के निवास का प्रमाण",
          "स्व-घोषणा (Self-Declaration Form)",
        ],
        citation: "आधिकारिक आपले सरकार पोर्टल से सत्यापित (अगस्त 2026)",
      },
      en: {
        routeTitle: "Age, Nationality and Domicile Certificate",
        checklistHeading: "Keep these documents ready:",
        checklist: ["Identity Proof", "Address Proof", "Age Proof (For minors)", "Residency Proof", "Mandatory Documents"],
        checklistHints: [
          "Aadhaar Card, PAN Card, or Voter ID",
          "Ration Card, Electricity/Water Bill, or Rent Receipt",
          "School Leaving Certificate or Birth Certificate",
          "Talathi/Gramsevak Certificate or 15-year stay proof",
          "Self-Declaration Form",
        ],
        citation: "Verified against official Aaple Sarkar portal (Aug 2026)",
      },
    },
  },
  {
    id: "caste_certificate",
    keywords: ["caste", "jati", "jaati", "cast", "जात", "जाती", "pramanpatra", "category"],
    translations: {
      mr: {
        routeTitle: "जात प्रमाणपत्र (Caste Certificate)",
        checklistHeading: "ही कागदपत्रे तयार ठेवा:",
        checklist: ["ओळखपत्र (Identity Proof)", "पत्ता पुरावा (Address Proof)", "जातीचा पुरावा (Caste Proof)", "नातेवाईकाचा जातीचा पुरावा", "अनिवार्य कागदपत्रे"],
        checklistHints: [
          "आधार कार्ड, पॅन कार्ड, किंवा मतदार ओळखपत्र",
          "रेशन कार्ड, वीज/पाणी बिल, किंवा भाडे पावती",
          "शाळा सोडल्याचा दाखला किंवा जन्म नोंदणी उतारा",
          "वडील/चुलते/आत्या यांचा शाळा सोडल्याचा दाखला किंवा जात प्रमाणपत्र",
          "स्वयं-घोषणापत्र (Self-Declaration) व वंशावळ",
        ],
        citation: "अधिकृत आपले सरकार पोर्टलवरून प्रमाणित (August 2026)",
      },
      hi: {
        routeTitle: "जाति प्रमाण पत्र (Caste Certificate)",
        checklistHeading: "ये दस्तावेज़ तैयार रखें:",
        checklist: ["पहचान पत्र (Identity Proof)", "पता प्रमाण (Address Proof)", "जाति प्रमाण (Caste Proof)", "रिश्तेदार का जाति प्रमाण", "अनिवार्य दस्तावेज़"],
        checklistHints: [
          "आधार कार्ड, पैन कार्ड, या वोटर आईडी",
          "राशन कार्ड, बिजली/पानी का बिल, या किराया रसीद",
          "स्कूल छोड़ने का प्रमाण पत्र या जन्म रिकॉर्ड",
          "पिता/चाचा/बुआ का स्कूल छोड़ने का प्रमाण पत्र या जाति प्रमाण पत्र",
          "स्व-घोषणा (Self-Declaration) और वंशावली",
        ],
        citation: "आधिकारिक आपले सरकार पोर्टल से सत्यापित (अगस्त 2026)",
      },
      en: {
        routeTitle: "Caste Certificate",
        checklistHeading: "Keep these documents ready:",
        checklist: ["Identity Proof", "Address Proof", "Caste Proof", "Relative's Caste Proof", "Mandatory Documents"],
        checklistHints: [
          "Aadhaar Card, PAN Card, or Voter ID",
          "Ration Card, Electricity/Water Bill, or Rent Receipt",
          "School Leaving Certificate or Birth Extract",
          "Father/Uncle/Aunt's School Leaving Certificate or Caste Certificate",
          "Self-Declaration and Genealogy (Vanshaval)",
        ],
        citation: "Verified against official Aaple Sarkar portal (Aug 2026)",
      },
    },
  },
  {
    id: "ncl_certificate",
    keywords: ["ncl", "non creamy", "creamy layer", "obc", "नॉन क्रिमी", "क्रीमी लेयर"],
    translations: {
      mr: {
        routeTitle: "नॉन-क्रिमी लेअर प्रमाणपत्र (NCL)",
        checklistHeading: "ही कागदपत्रे तयार ठेवा:",
        checklist: ["ओळखपत्र (Identity Proof)", "पत्ता पुरावा (Address Proof)", "जात प्रमाणपत्र", "उत्पन्नाचा पुरावा (सलग 3 वर्षे)", "अनिवार्य कागदपत्रे"],
        checklistHints: [
          "आधार कार्ड, पॅन कार्ड, किंवा मतदार ओळखपत्र",
          "रेशन कार्ड, वीज/पाणी बिल, किंवा भाडे पावती",
          "अर्जदाराचे किंवा वडिलांचे जात प्रमाणपत्र",
          "मागील 3 वर्षांचे आयकर रिटर्न (ITR) किंवा तलाठी उत्पन्नाचा दाखला",
          "स्वयं-घोषणापत्र (Self-Declaration Form)",
        ],
        citation: "अधिकृत आपले सरकार पोर्टलवरून प्रमाणित (August 2026)",
      },
      hi: {
        routeTitle: "नॉन-क्रीमी लेयर प्रमाण पत्र (NCL)",
        checklistHeading: "ये दस्तावेज़ तैयार रखें:",
        checklist: ["पहचान पत्र (Identity Proof)", "पता प्रमाण (Address Proof)", "जाति प्रमाण पत्र", "आय प्रमाण (लगातार 3 वर्ष)", "अनिवार्य दस्तावेज़"],
        checklistHints: [
          "आधार कार्ड, पैन कार्ड, या वोटर आईडी",
          "राशन कार्ड, बिजली/पानी का बिल, या किराया रसीद",
          "आवेदक या पिता का जाति प्रमाण पत्र",
          "पिछले 3 वर्षों का ITR या तलाठी आय प्रमाण पत्र",
          "स्व-घोषणा (Self-Declaration Form)",
        ],
        citation: "आधिकारिक आपले सरकार पोर्टल से सत्यापित (अगस्त 2026)",
      },
      en: {
        routeTitle: "Non-Creamy Layer Certificate",
        checklistHeading: "Keep these documents ready:",
        checklist: ["Identity Proof", "Address Proof", "Caste Certificate", "Income Proof (Last 3 Years)", "Mandatory Documents"],
        checklistHints: [
          "Aadhaar Card, PAN Card, or Voter ID",
          "Ration Card, Electricity/Water Bill, or Rent Receipt",
          "Applicant's or Father's Caste Certificate",
          "Income Tax Returns (ITR) or Talathi Income Certificate for last 3 years",
          "Self-Declaration Form",
        ],
        citation: "Verified against official Aaple Sarkar portal (Aug 2026)",
      },
    },
  },
  {
    id: "senior_citizen_certificate",
    keywords: ["senior", "jyeshtha", "jeshtha", "citizen", "नागरिक", "ज्येष्ठ नागरिक", "vridh", "old age"],
    translations: {
      mr: {
        routeTitle: "ज्येष्ठ नागरिक प्रमाणपत्र",
        checklistHeading: "ही कागदपत्रे तयार ठेवा:",
        checklist: ["ओळखपत्र (Identity Proof)", "पत्ता पुरावा (Address Proof)", "वयाचा पुरावा (60 वर्षांवरील)", "वैद्यकीय प्रमाणपत्र", "अनिवार्य कागदपत्रे"],
        checklistHints: [
          "आधार कार्ड, पॅन कार्ड, किंवा मतदार ओळखपत्र",
          "रेशन कार्ड, वीज/पाणी बिल, किंवा भाडे पावती",
          "जन्म प्रमाणपत्र किंवा शाळा सोडल्याचा दाखला",
          "शासकीय रुग्णालयाचे वयाचे वैद्यकीय प्रमाणपत्र (वयाचा पुरावा नसल्यास)",
          "स्वयं-घोषणापत्र (Self-Declaration) आणि पासपोर्ट फोटो",
        ],
        citation: "अधिकृत आपले सरकार पोर्टलवरून प्रमाणित (August 2026)",
      },
      hi: {
        routeTitle: "वरिष्ठ नागरिक प्रमाण पत्र",
        checklistHeading: "ये दस्तावेज़ तैयार रखें:",
        checklist: ["पहचान पत्र (Identity Proof)", "पता प्रमाण (Address Proof)", "आयु प्रमाण (60 वर्ष से अधिक)", "मेडिकल प्रमाण पत्र", "अनिवार्य दस्तावेज़"],
        checklistHints: [
          "आधार कार्ड, पैन कार्ड, या वोटर आईडी",
          "राशन कार्ड, बिजली/पानी का बिल, या किराया रसीद",
          "जन्म प्रमाण पत्र या स्कूल छोड़ने का प्रमाण पत्र",
          "सरकारी अस्पताल से आयु का प्रमाण पत्र (यदि आयु प्रमाण उपलब्ध नहीं है)",
          "स्व-घोषणा (Self-Declaration) और पासपोर्ट फोटो",
        ],
        citation: "आधिकारिक आपले सरकार पोर्टल से सत्यापित (अगस्त 2026)",
      },
      en: {
        routeTitle: "Senior Citizen Certificate",
        checklistHeading: "Keep these documents ready:",
        checklist: ["Identity Proof", "Address Proof", "Age Proof (Above 60 years)", "Medical Certificate", "Mandatory Documents"],
        checklistHints: [
          "Aadhaar Card, PAN Card, or Voter ID",
          "Ration Card, Electricity/Water Bill, or Rent Receipt",
          "Birth Certificate or School Leaving Certificate",
          "Age Medical Certificate from Govt Hospital (if age proof is unavailable)",
          "Self-Declaration and Passport size photo",
        ],
        citation: "Verified against official Aaple Sarkar portal (Aug 2026)",
      },
    },
  },
  {
    id: "agriculturist_certificate",
    keywords: ["agriculturist", "farmer", "shetkari", "shet", "शेतकरी", "कृषी", "farmer certificate"],
    translations: {
      mr: {
        routeTitle: "शेतकरी (अल्पभूधारक) प्रमाणपत्र",
        checklistHeading: "ही कागदपत्रे तयार ठेवा:",
        checklist: ["ओळखपत्र (Identity Proof)", "पत्ता पुरावा (Address Proof)", "जमिनीचा पुरावा", "उत्पन्नाचा पुरावा", "अनिवार्य कागदपत्रे"],
        checklistHints: [
          "आधार कार्ड, पॅन कार्ड, किंवा मतदार ओळखपत्र",
          "रेशन कार्ड, वीज/पाणी बिल",
          "7/12 उतारा आणि 8-अ उतारा",
          "तलाठी उत्पन्नाचा दाखला",
          "स्वयं-घोषणापत्र (Self-Declaration Form)",
        ],
        citation: "अधिकृत आपले सरकार पोर्टलवरून प्रमाणित (August 2026)",
      },
      hi: {
        routeTitle: "किसान (अल्पभूधारक) प्रमाण पत्र",
        checklistHeading: "ये दस्तावेज़ तैयार रखें:",
        checklist: ["पहचान पत्र (Identity Proof)", "पता प्रमाण (Address Proof)", "भूमि का प्रमाण", "आय प्रमाण", "अनिवार्य दस्तावेज़"],
        checklistHints: [
          "आधार कार्ड, पैन कार्ड, या वोटर आईडी",
          "राशन कार्ड, बिजली/पानी का बिल",
          "7/12 और 8-A एक्सट्रैक्ट (जमीन के कागज़ात)",
          "तलाठी आय प्रमाण पत्र",
          "स्व-घोषणा (Self-Declaration Form)",
        ],
        citation: "आधिकारिक आपले सरकार पोर्टल से सत्यापित (अगस्त 2026)",
      },
      en: {
        routeTitle: "Agriculturist / Small Land Holder Certificate",
        checklistHeading: "Keep these documents ready:",
        checklist: ["Identity Proof", "Address Proof", "Land Proof", "Income Proof", "Mandatory Documents"],
        checklistHints: [
          "Aadhaar Card, PAN Card, or Voter ID",
          "Ration Card, Electricity/Water Bill",
          "7/12 Extract and 8-A Extract",
          "Talathi Income Certificate",
          "Self-Declaration Form",
        ],
        citation: "Verified against official Aaple Sarkar portal (Aug 2026)",
      },
    },
  },
  {
    id: "solvency_certificate",
    keywords: ["solvency", "diwalkhor", "हैसियत", "दिवाळखोर", "सॉल्व्हन्सी", "asset"],
    translations: {
      mr: {
        routeTitle: "सॉल्व्हन्सी प्रमाणपत्र (Solvency Certificate)",
        checklistHeading: "ही कागदपत्रे तयार ठेवा:",
        checklist: ["ओळखपत्र (Identity Proof)", "पत्ता पुरावा (Address Proof)", "मालमत्तेचा पुरावा (Asset Proof)", "बँक प्रमाणपत्र", "अनिवार्य कागदपत्रे"],
        checklistHints: [
          "आधार कार्ड, पॅन कार्ड, किंवा मतदार ओळखपत्र",
          "रेशन कार्ड, वीज/पाणी बिल",
          "मालमत्तेचे दस्तऐवज (प्रॉपर्टी टॅक्स पावती, 7/12 उतारा)",
          "बँक स्टेटमेंट किंवा बँक मूल्यांकन प्रमाणपत्र",
          "स्वयं-घोषणापत्र (Self-Declaration Form)",
        ],
        citation: "अधिकृत आपले सरकार पोर्टलवरून प्रमाणित (August 2026)",
      },
      hi: {
        routeTitle: "सॉल्वेंसी (हैसियत) प्रमाण पत्र",
        checklistHeading: "ये दस्तावेज़ तैयार रखें:",
        checklist: ["पहचान पत्र (Identity Proof)", "पता प्रमाण (Address Proof)", "संपत्ति का प्रमाण (Asset Proof)", "बैंक प्रमाण पत्र", "अनिवार्य दस्तावेज़"],
        checklistHints: [
          "आधार कार्ड, पैन कार्ड, या वोटर आईडी",
          "राशन कार्ड, बिजली/पानी का बिल",
          "संपत्ति के दस्तावेज़ (प्रॉपर्टी टैक्स रसीद, 7/12)",
          "बैंक स्टेटमेंट या बैंक मूल्यांकन प्रमाण पत्र",
          "स्व-घोषणा (Self-Declaration Form)",
        ],
        citation: "आधिकारिक आपले सरकार पोर्टल से सत्यापित (अगस्त 2026)",
      },
      en: {
        routeTitle: "Solvency Certificate",
        checklistHeading: "Keep these documents ready:",
        checklist: ["Identity Proof", "Address Proof", "Asset Proof", "Bank Certificate", "Mandatory Documents"],
        checklistHints: [
          "Aadhaar Card, PAN Card, or Voter ID",
          "Ration Card, Electricity/Water Bill",
          "Property Documents (Property Tax Receipt, 7/12 Extract)",
          "Bank Statement or Bank Valuation Certificate",
          "Self-Declaration Form",
        ],
        citation: "Verified against official Aaple Sarkar portal (Aug 2026)",
      },
    },
  },
  {
    id: "birth_death_certificate",
    keywords: ["birth", "death", "janma", "mrutyu", "mrityu", "जन्म", "मृत्यू", "pramanpatra"],
    translations: {
      mr: {
        routeTitle: "जन्म / मृत्यू प्रमाणपत्र",
        checklistHeading: "ही कागदपत्रे तयार ठेवा:",
        checklist: ["ओळखपत्र (Identity Proof)", "पत्ता पुरावा (Address Proof)", "नोंदणीचा पुरावा", "रुग्णालय अहवाल", "अनिवार्य कागदपत्रे"],
        checklistHints: [
          "अर्जदाराचे आधार कार्ड किंवा मतदार ओळखपत्र",
          "रेशन कार्ड किंवा लाईट बिल",
          "ग्रामपंचायत / नगरपालिका जन्म किंवा मृत्यू नोंदणी पावती",
          "रुग्णालयाचा जन्म/मृत्यू अहवाल किंवा डॉक्टरांचे प्रमाणपत्र",
          "स्वयं-घोषणापत्र (Self-Declaration)",
        ],
        citation: "अधिकृत आपले सरकार पोर्टलवरून प्रमाणित (August 2026)",
      },
      hi: {
        routeTitle: "जन्म / मृत्यु प्रमाण पत्र",
        checklistHeading: "ये दस्तावेज़ तैयार रखें:",
        checklist: ["पहचान पत्र (Identity Proof)", "पता प्रमाण (Address Proof)", "पंजीकरण प्रमाण", "अस्पताल की रिपोर्ट", "अनिवार्य दस्तावेज़"],
        checklistHints: [
          "आवेदक का आधार कार्ड या वोटर आईडी",
          "राशन कार्ड या बिजली बिल",
          "ग्राम पंचायत / नगर पालिका जन्म या मृत्यु पंजीकरण रसीद",
          "अस्पताल की जन्म/मृत्यु रिपोर्ट या डॉक्टर का प्रमाण पत्र",
          "स्व-घोषणा (Self-Declaration)",
        ],
        citation: "आधिकारिक आपले सरकार पोर्टल से सत्यापित (अगस्त 2026)",
      },
      en: {
        routeTitle: "Birth / Death Certificate",
        checklistHeading: "Keep these documents ready:",
        checklist: ["Identity Proof", "Address Proof", "Registration Proof", "Hospital Report", "Mandatory Documents"],
        checklistHints: [
          "Applicant's Aadhaar Card or Voter ID",
          "Ration Card or Electricity Bill",
          "Gram Panchayat / Municipal Birth or Death Registration Receipt",
          "Hospital Birth/Death Report or Doctor's Certificate",
          "Self-Declaration Form",
        ],
        citation: "Verified against official Aaple Sarkar portal (Aug 2026)",
      },
    },
  },
  {
    id: "marriage_registration",
    keywords: ["marriage", "vivah", "lagna", "विवाह", "लग्न", "marriage certificate"],
    translations: {
      mr: {
        routeTitle: "विवाह नोंदणी प्रमाणपत्र",
        checklistHeading: "ही कागदपत्रे तयार ठेवा:",
        checklist: ["ओळख आणि वयाचा पुरावा", "पत्ता पुरावा (Address Proof)", "विवाह पुरावा", "साक्षीदारांचे पुरावे", "अनिवार्य कागदपत्रे"],
        checklistHints: [
          "वधू आणि वर दोघांचे आधार कार्ड व जन्म दाखला",
          "रेशन कार्ड किंवा लाईट बिल (एकाचा)",
          "लग्न पत्रिका, भटजींचे प्रमाणपत्र किंवा लग्न कार्यालयाचा दाखला",
          "3 साक्षीदारांचे आधार कार्ड आणि फोटो",
          "विवाह नोंदणी फॉर्म आणि जोडप्याचे लग्नातील फोटो",
        ],
        citation: "अधिकृत आपले सरकार पोर्टलवरून प्रमाणित (August 2026)",
      },
      hi: {
        routeTitle: "विवाह पंजीकरण प्रमाण पत्र",
        checklistHeading: "ये दस्तावेज़ तैयार रखें:",
        checklist: ["पहचान और आयु प्रमाण", "पता प्रमाण (Address Proof)", "विवाह प्रमाण", "गवाहों के प्रमाण", "अनिवार्य दस्तावेज़"],
        checklistHints: [
          "वर और वधू दोनों का आधार कार्ड और जन्म प्रमाण पत्र",
          "राशन कार्ड या बिजली का बिल (किसी एक का)",
          "शादी का कार्ड, पुजारी का प्रमाण पत्र या विवाह हॉल की रसीद",
          "3 गवाहों के आधार कार्ड और फोटो",
          "विवाह पंजीकरण फॉर्म और जोड़े की शादी की तस्वीर",
        ],
        citation: "आधिकारिक आपले सरकार पोर्टल से सत्यापित (अगस्त 2026)",
      },
      en: {
        routeTitle: "Marriage Registration Certificate",
        checklistHeading: "Keep these documents ready:",
        checklist: ["Identity & Age Proof", "Address Proof", "Marriage Proof", "Witness Proofs", "Mandatory Documents"],
        checklistHints: [
          "Aadhaar Card and Birth Certificate of both Bride and Groom",
          "Ration Card or Electricity Bill (of either party)",
          "Wedding Invitation Card, Priest's Certificate or Marriage Hall Receipt",
          "Aadhaar Cards and photos of 3 witnesses",
          "Marriage Registration Form and Joint Photograph in wedding attire",
        ],
        citation: "Verified against official Aaple Sarkar portal (Aug 2026)",
      },
    },
  },
  {
    id: "police_clearance",
    keywords: ["police", "clearance", "pcc", "charitrya", "चारित्र्य", "पोलीस", "police verification"],
    translations: {
      mr: {
        routeTitle: "चारित्र्य प्रमाणपत्र (Police Clearance)",
        checklistHeading: "ही कागदपत्रे तयार ठेवा:",
        checklist: ["ओळखपत्र (Identity Proof)", "पत्ता पुरावा (Address Proof)", "जन्म किंवा वयाचा पुरावा", "स्थानिक पोलिसांचे शिफारस पत्र", "अनिवार्य कागदपत्रे"],
        checklistHints: [
          "आधार कार्ड, पॅन कार्ड, किंवा पासपोर्ट",
          "रेशन कार्ड, वीज/पाणी बिल, किंवा भाडे पावती",
          "शाळा सोडल्याचा दाखला किंवा जन्म प्रमाणपत्र",
          "स्थानिक पोलीस स्टेशनचा ना-हरकत दाखला (NOC)",
          "स्वयं-घोषणापत्र (Self-Declaration Form) आणि कंपनीचे पत्र (असल्यास)",
        ],
        citation: "अधिकृत आपले सरकार / PCS पोर्टलवरून प्रमाणित (August 2026)",
      },
      hi: {
        routeTitle: "चरित्र प्रमाण पत्र (Police Clearance)",
        checklistHeading: "ये दस्तावेज़ तैयार रखें:",
        checklist: ["पहचान पत्र (Identity Proof)", "पता प्रमाण (Address Proof)", "जन्म या आयु प्रमाण", "स्थानीय पुलिस का पत्र", "अनिवार्य दस्तावेज़"],
        checklistHints: [
          "आधार कार्ड, पैन कार्ड, या पासपोर्ट",
          "राशन कार्ड, बिजली/पानी का बिल, या किराया रसीद",
          "स्कूल छोड़ने का प्रमाण पत्र या जन्म प्रमाण पत्र",
          "स्थानीय पुलिस स्टेशन से अनापत्ति प्रमाण पत्र (NOC)",
          "स्व-घोषणा (Self-Declaration Form) और कंपनी का पत्र (यदि हो)",
        ],
        citation: "आधिकारिक आपले सरकार / PCS पोर्टल से सत्यापित (अगस्त 2026)",
      },
      en: {
        routeTitle: "Police Clearance Certificate (PCC)",
        checklistHeading: "Keep these documents ready:",
        checklist: ["Identity Proof", "Address Proof", "Birth or Age Proof", "Local Police Recommendation", "Mandatory Documents"],
        checklistHints: [
          "Aadhaar Card, PAN Card, or Passport",
          "Ration Card, Electricity/Water Bill, or Rent Receipt",
          "School Leaving Certificate or Birth Certificate",
          "No Objection Certificate (NOC) from local police station",
          "Self-Declaration Form and Company Letter (if applicable)",
        ],
        citation: "Verified against official Aaple Sarkar / PCS portal (Aug 2026)",
      },
    },
  }
];

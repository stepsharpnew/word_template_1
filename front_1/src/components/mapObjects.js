export function mapRowToObject(normalized) {
  const keyIndexMap = {
    smrNo: 0,
    contractNo: 1,
    res: 2,
    contractStatus: 3,
    mainContract: 4,
    customer: 5,
    title: 6,
    applicant: 7,
    address: 8,
    cadastralNumber: 9,
    powerByTU: 10,
    tuReceived: 11,
    receivedToWork: 12,
    projectManager: 13,
    classifier: 14,
    surveyor: 16,
    gipExecutor: 17,
    pirStatus: 17, // уточни индекс
    pirStatusDate: 18,
    geoReceived: 19, // уточни индекс
    geoAgreeStatus: 21,
    gnbPir: 26,
    gnbPirDate: 27,
    smrStart: 64,
    contractDate: 65, // уточни индекс
    contractEnd: 66,
    ishod_number: 69,
  };

  const obj = {};

  for (const [key, idx] of Object.entries(keyIndexMap)) {
    obj[key] = normalized[idx] ?? null;
  }

  return obj;
}

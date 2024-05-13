import { Injectable } from '@angular/core';

import { Country, State, Place, District } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  firstLevelArr = [
    { id: "1", name: "India" },
    { id: "2", name: "Germany" }
  ];

  secondLevelArr = [
    { id: "s1", parentId: "2", name: "Bavaria" },
    { id: "s2", parentId: "2", name: "Berlin" },
    { id: "s3", parentId: "1", name: "Maharashtra" },
    { id: "s4", parentId: "1", name: "Tamilnadu" }
  ];

  thirdLevelArr = [
    { id: "d1", parentId: "s1", name: "Upper Bavaria" },
    { id: "d2", parentId: "s1", name: "Lower Bavaria" },
    { id: "d3", parentId: "s2", name: "Berlin-Mitte" },
    { id: "d4", parentId: "s2", name: "Kreuzberg" },
    { id: "d5", parentId: "s3", name: "Nashik" },
    { id: "d6", parentId: "s3", name: "Jalgoan" },
    { id: "d7", parentId: "s4", name: "Ariyalur" },
    { id: "d8", parentId: "s4", name: "Chennai" }
  ];

  fourthLevelArr = [
    { id: "p1", parentId: "d1", name: "Munich" },
    { id: "p2", parentId: "d1", name: "Erding" },
    { id: "p3", parentId: "d2", name: "Leipzig" },
    { id: "p4", parentId: "d2", name: "Landshut" },
    { id: "p5", parentId: "d3", name: "Passau" },
    { id: "p6", parentId: "d3", name: "Gesundbrunnen" },
    { id: "p7", parentId: "d4", name: "Frieburg" },
    { id: "p8", parentId: "d4", name: "Hamburg" },
    { id: "p9", parentId: "d6", name: "Raver" },
    { id: "p10", parentId: "d6", name: "Savda" },
    { id: "p11", parentId: "d5", name: "Ozar" },
    { id: "p12", parentId: "d5", name: "Manmad" },
    { id: "p13", parentId: "d7", name: "Thirumanur" },
    { id: "p14", parentId: "d7", name: "Sendurai" },
    { id: "p15", parentId: "d8", name: "New Chennai" },
    { id: "p16", parentId: "d8", name: "Old Chennai" }
  ];
  private countryDetail: string | null = null;

  constructor() { }

  private countryDetailCached() {
    if (!this.countryDetail) {
      this.countryDetail = this.countryDetailJsonFormat();
    }
  }

  private countryDetailJsonFormat(): string {
    let result: any = {};
    
    for (let country of this.firstLevelArr) {
      let countryObj: Country = new Country(country.id, country.name, []);
    
      for (let state of this.secondLevelArr.filter(s => s.parentId === country.id)) {
        let stateObj: State = new State(state.id, state.parentId, state.name, []);
    
        for (let district of this.thirdLevelArr.filter(d => d.parentId === state.id)) {
          let places: Place[] = this.fourthLevelArr
            .filter(p => p.parentId === district.id)
            .map(p => new Place(p.id, p.parentId, p.name));
                    
          let districtObj: District = new District(district.id, district.parentId, district.name, places);
          stateObj.districts.push(districtObj);
        }
        countryObj.states.push(stateObj);
      }
      result[country.id] = countryObj;
    }
    
    return JSON.stringify(result, null, 2);
  }

  getDetail() {
    this.countryDetailCached();
    return this.countryDetail!;
  }
}

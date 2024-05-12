import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DataService } from '../../services/data.service';
import { Country, District, Place, State } from '../../models';

@Component({
  selector: 'app-home-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home-form.component.html'
})
export class HomeFormComponent implements OnInit {
  countryData = [
    { id: "1", name: "India" },
    { id: "2", name: "Germany" }
  ];
  
  countryDetail: Array<Country> = [];
  selectedCountryId: string = '';

  stateDetail: Array<State> = [];
  selectedStateId: string = '';

  districtDetail: Array<District> = [];
  selectedDistrictId: string = '';

  placesDetail: Array<Place> = [];

  constructor( private dataServices: DataService) {}

  ngOnInit() {
    // Converted JSON data in Array format to iterate easily
    let placeDetails = this.dataServices.getDetail();
    let placeDetailsObj = JSON.parse(placeDetails);
    let detail = Object.keys(placeDetailsObj).map((key: string) => ({
      id: placeDetailsObj[key].id,
      name: placeDetailsObj[key].name,
      states: placeDetailsObj[key].states.map((state: any) => ({
        id: state.id,
        parentId: state.parentId,
        name: state.name,
        districts: state.districts.map((district: any) => ({
          id: district.id,
          parentId: district.parentId,
          name: district.name,
          places: district.places.map((place: any) => ({
            id: place.id,
            parentId: place.parentId,
            name: place.name
          }))
        }))
      }))
    }));

    this.countryDetail = detail;
  }

  onCountrySelect() {
    let stateData = this.countryDetail.find(country => country.id === this.selectedCountryId);
    if(stateData) {
      this.stateDetail = stateData.states;
      this.districtDetail = [];
      this.placesDetail = [];
    }
  }

  onStateSelect() {
    let districtData = this.stateDetail.find(state => state.id === this.selectedStateId);
    if(districtData) {
      this.districtDetail = districtData.districts;
    }
  }

  onDistrictSelect() {
    let placeData = this.districtDetail.find(place => place.id === this.selectedDistrictId);
    if(placeData) {
      this.placesDetail = placeData.places;
    }
  }
}
